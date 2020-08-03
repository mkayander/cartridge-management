import asyncio
import logging
from typing import Tuple, List

import PIL
from PIL import Image
from aiogram import Bot, Dispatcher, executor, types
from aiogram.types import ContentType, ParseMode, InputFile
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, \
    InlineKeyboardMarkup, InlineKeyboardButton, ReplyKeyboardRemove
from asgiref.sync import sync_to_async
from django.conf import settings
from django.core.management import BaseCommand
from django.db.models import QuerySet
from django.utils.dateformat import format
from pyzbar.pyzbar import decode

from account.models import Account
from main.models import Equipment
from telegram.models import EquipMovement, AdditionalPhoto

bot_help_description = \
'''_Команды можно вызывать через_ *.* _или_ */*

*.d .del .delete* - удаляет фото с комментарием из базы и чата
*.hi .hist .history* _[ИНВ.НОМЕР]_ - выводит историю перемещений
по указанному инв. номеру. Если не указать номер, выведет список
инв. номеров, имеющих перемещения в базе.'''

button_delete = KeyboardButton('.delete')

greet_kb = ReplyKeyboardMarkup()
greet_kb.add(button_delete)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

loop = asyncio.get_event_loop()

bot = Bot(
    token=settings.TELEGRAM_BOT_TOKEN,
    loop=loop
)

dp = Dispatcher(bot=bot)

# -- Data Cache Variables --
bot_answer_delete = {}
bot_answer = {}
old_bot_message = []
user_photos = {}
bot_answer_phone_number = {}
valid_users = []


# -- --

async def sync_iter_to_async(iterator):
    """
    Used to loop through django QuerySet in an async context (function)
    :param iterator:
    """
    while True:
        try:
            val = await sync_to_async(iterator.__next__)()
            yield val
        except (StopIteration, Exception):
            break


def get_inv_number(image: PIL.Image) -> Tuple[bool, str]:
    inv_number = decode(image)
    if not inv_number:
        return False, "Штрихкод не распознан"
    else:
        inv_number = inv_number[0].data.decode("utf-8")
        if inv_number[0:3] == "296":
            inv_number = "ОС" + inv_number.split("296")[1]
            return True, inv_number
        if inv_number[0:3] == "600":
            inv_number = "ДТ" + inv_number.split("600")[1]
            return True, inv_number
        return False, f"{inv_number} не является инвентарным номером!"


async def validate_user_at_database(user_id: int) -> bool:
    """
    Tries to find a user with given Telegram id at Database, checks if he's allowed to use the bot.\n
    Appends the given user id to "valid_users" array on success and returns True, otherwise returns False.
    :param user_id: Telegram user id
    :return: True if user is valid, False otherwise.
    """
    try:
        user = await sync_to_async(Account.objects.get)(telegram_user_id=user_id)
        if user.can_use_bot:
            return True
        else:
            return False

    except Account.DoesNotExist:
        return False


# --- Decorators ---
def private_chat_only(func):
    def wrapper(message, **kwargs):
        if message.chat.id > 0:
            return func(message)
        else:
            return message.reply("Данная функция доступна только в личной переписке с ботом!")

    return wrapper


def group_chat_only(func):
    def wrapper(message, **kwargs):
        if message.chat.id > 0:
            return
        else:
            return func(message)

    return wrapper


def valid_users_only(func):
    """
    Decorator for async aiogram functions. Currently only passes through the "message" argument.
    :param func: Async Aiogram function
    :return: Function wrapper
    """

    async def wrapper(message, **kwargs):
        if await validate_user_at_database(message.from_user.id):
            return await func(message)
        else:
            answer = await message.reply("У вас нет прав на выполнение данного действия! Напишите /start для проверки.")
            await bot.delete_message(message.chat.id, message.message_id)
            old_bot_message.append(answer)

    return wrapper


# ---  ---


async def add_more_photo():
    while True:
        if len(old_bot_message) > 1:
            message = old_bot_message.pop(0)
            await bot.delete_message(message.chat.id, message.message_id)

        for chat_id in user_photos.keys():
            for message_id, messages in user_photos[chat_id].items():
                movement = await sync_to_async(EquipMovement.objects.get)(message_id=message_id)
                for message in messages:
                    image_id, image_path = await get_image(message)
                    await sync_to_async(AdditionalPhoto.objects.create)(movement=movement, image=image_path,
                                                                        message_id=message.message_id,
                                                                        chat_id=message.chat.id)
                answer = await bot.send_message(chat_id, "Фотографии добавлены в базу")
                if chat_id in bot_answer:
                    if message_id in bot_answer[chat_id]:
                        bot_answer[chat_id][message_id].append(answer.message_id)
                    else:
                        bot_answer[chat_id][message_id] = [answer.message_id]
                else:
                    bot_answer[chat_id] = {message_id: [answer.message_id]}
        user_photos.clear()

        await asyncio.sleep(5)


@dp.message_handler(commands='start')
async def start_bot(message):
    if message.chat.id > 0:
        markup_request = ReplyKeyboardMarkup(resize_keyboard=True).add(
            KeyboardButton('Отправить свой контакт ☎️', request_contact=True))
        answer = await message.reply("Для пользования ботом необходим номер телефона",
                                     reply_markup=markup_request)
        bot_answer_phone_number[message.from_user.id] = answer.message_id

    else:
        old_bot_message.append(await message.reply("/start можно писать только в личные сообщения боту!"))
        await bot.delete_message(message.chat.id, message.message_id)


@dp.message_handler(content_types=ContentType.CONTACT)
async def register_user_contact(message):
    if message.contact.user_id in bot_answer_phone_number:
        try:
            user = await sync_to_async(Account.objects.get)(phone_number="+" + str(message.contact.phone_number))
            user.telegram_user_id = message.contact.user_id
            await sync_to_async(user.save)()
            if user.can_use_bot:
                await message.reply("Вы успешно прошли валидацию!",
                                    reply_markup=ReplyKeyboardRemove())
            else:
                await message.reply("Пользователь записан в базе, но у Вас нет прав на использование бота!",
                                    reply_markup=ReplyKeyboardRemove())
        except Account.DoesNotExist:
            await message.reply("Пользователь с данным номером телефона не зарегестрирован в базе!",
                                reply_markup=ReplyKeyboardRemove())
        bot_answer_phone_number.clear()


@dp.message_handler(commands=["delete", "del", "d"], commands_prefix=[".", "/"])
@valid_users_only
async def confirm_delete(message):
    if message.reply_to_message:
        inline_kb_full = InlineKeyboardMarkup(row_width=2)
        inline_btn_del = InlineKeyboardButton('Удалить',
                                              callback_data=f'delete*{message.message_id}*{message.reply_to_message.message_id}')
        inline_btn_cancel = InlineKeyboardButton('Отмена', callback_data=f'cancel*{message.message_id}')
        inline_kb_full.add(inline_btn_del, inline_btn_cancel)
        answer = await message.reply(text="Удалить запись из базы?", reply_markup=inline_kb_full)
        bot_answer_delete[message.message_id] = answer.message_id
    else:
        answer = await message.reply(
            text="Вызывать .del можно только в ответ на сообщение с фотографией!")
        await bot.delete_message(message.chat.id, message.message_id)
        old_bot_message.append(answer)


@dp.callback_query_handler()
async def remove_photo(callback_query: types.CallbackQuery, **kwargs):
    code = callback_query.data.split('*')
    if code[0] == 'delete':
        try:
            movement = await sync_to_async(EquipMovement.objects.get)(message_id=int(code[2]))
            await bot.delete_message(callback_query.message.chat.id, movement.bot_answer_message_id)
            await bot.delete_message(callback_query.message.chat.id, movement.message_id)

            photo: AdditionalPhoto
            for photo in await sync_to_async(list)(movement.photos.all()):
                await bot.delete_message(photo.chat_id, photo.message_id)

            answers = bot_answer[movement.chat_id].pop(movement.message_id)
            for answer in answers:
                await bot.delete_message(movement.chat_id, answer)

            await sync_to_async(movement.delete)()
            await bot.answer_callback_query(callback_query.id, text="Удаление выполнено успешно.")
        except EquipMovement.DoesNotExist:
            await bot.answer_callback_query(callback_query.id, text="Не нашел в базе!")
    else:
        await bot.answer_callback_query(callback_query.id, text="Удаление отменено.")

    await bot.delete_message(callback_query.message.chat.id, code[1])
    await bot.delete_message(callback_query.message.chat.id, bot_answer_delete[int(code[1])])
    bot_answer_delete.pop(int(code[1]))


@dp.message_handler(lambda message: message.text.lower() == "help")
@dp.message_handler(commands=["Help", "?", "h"], commands_prefix=[".", "/"])
@valid_users_only
async def send_help_message(message: types.Message):
    await message.reply(text=bot_help_description, parse_mode=ParseMode.MARKDOWN)


@dp.message_handler(commands=['history', 'hist', 'hi'])
@private_chat_only
@valid_users_only
async def movement_history_command(message: types.Message):
    args: List[str] = message.get_args().split(" ")

    if not args[0]:
        await types.ChatActions.typing()
        equip_list = ""
        movement_choices: List[EquipMovement] = await sync_to_async(list)(EquipMovement.objects.distinct("inv_number"))
        for choice in movement_choices:
            equip_list += f"`{choice.inv_number}`\n"
        await message.reply(f"_Доступные ОС:_ \n{equip_list}", parse_mode=ParseMode.MARKDOWN)
        return

    qs: QuerySet = EquipMovement.objects.filter(inv_number=args[0])

    movement: EquipMovement
    for movement in await sync_to_async(list)(qs):
        await types.ChatActions.upload_photo()
        media = types.MediaGroup()
        media.attach_photo(InputFile(movement.inv_image.path), get_movement_detail_message(movement))

        photos: List[AdditionalPhoto] = await sync_to_async(list)(movement.photos.all())
        if photos:

            for photo in photos:
                media.attach_photo(InputFile(photo.image.path))

        await message.reply_media_group(media)


@dp.message_handler(content_types=ContentType.PHOTO)
@valid_users_only
async def handle_photo(message):
    if message.caption and not message.reply_to_message:
        image_id, image_path = await get_image(message)
        img = Image.open(image_path)
        bool_bar, barcode = get_inv_number(img)
        if bool_bar:
            await sync_to_async(EquipMovement.objects.create)(telegram_user_id=message.from_user.id,
                                                              inv_number=barcode, comment=message.caption,
                                                              inv_image=image_path,
                                                              message_id=message.message_id,
                                                              bot_answer_message_id=answer.message_id,
                                                              chat_id=message.chat.id)

            answer = await bot.send_message(message.chat.id,
                                            f"Перемещение оборудования {barcode} успешно сохранено в базе.")


        else:
            await bot.send_message(message.chat.id, barcode)

    elif message.reply_to_message and message.reply_to_message.caption:
        if message.chat.id in user_photos:
            if message.reply_to_message.message_id in user_photos[message.chat.id]:
                user_photos[message.chat.id][message.reply_to_message.message_id].append(message)
            else:
                user_photos[message.chat.id][message.reply_to_message.message_id] = [message]
        else:
            user_photos[message.chat.id] = {message.reply_to_message.message_id: [message]}

    elif message.chat.id < 0:
        answer = await message.reply("Данная функция доступна только в личной переписке с ботом!")
        await bot.delete_message(message.chat.id, message.message_id)
        old_bot_message.append(answer)

    else:
        image_id, image_path = await get_image(message)
        img = Image.open(image_path)
        bool_bar, barcode = get_inv_number(img)
        if bool_bar:
            try:
                data = await sync_to_async(Equipment.objects.get)(inv_number=barcode)
                await bot.send_message(message.chat.id, get_equip_detail_message(data), parse_mode=ParseMode.MARKDOWN)
            except Equipment.DoesNotExist:
                await message.reply(f"Оборудование с инв. номером {barcode} не найдено!")
        else:
            await message.reply(barcode)


def check_is_inv_number(message: types.Message):
    print(message.text.upper())
    if message.text.isnumeric() and 3 < len(message.text) < 7:
        return True
    elif message.text[0:2].upper() == "КЦ":
        return True
    else:
        return False


@dp.message_handler(lambda message: check_is_inv_number(message), content_types=ContentType.TEXT)
@dp.message_handler(commands=['os', 'ос'], commands_prefix=[".", "/"])
async def get_equip_detail_from_text_message(message: types.Message):
    if len(message.text) == 4:
        inv_number = 'ОС000000' + message.text
    elif len(message.text) == 5:
        inv_number = 'ОС00000' + message.text
    elif len(message.text) == 6:
        inv_number = 'ОС0000' + message.text
    elif message.text[0:2].upper() == 'КЦ':
        inv_number = message.text.upper()
    else:
        return
    try:
        data = await sync_to_async(Equipment.objects.get)(inv_number=inv_number)
        await bot.send_message(message.chat.id, get_equip_detail_message(data), parse_mode=ParseMode.MARKDOWN)
    except Equipment.DoesNotExist:
        await message.reply(f"Оборудование с номером {inv_number} не найдено!")


def get_equip_detail_message(obj: Equipment) -> str:
    """
    Converts Equipment instance to a multi-line representation (detail) string.
    :param obj: Equipment instance to get values from
    :return: Multi-line string with Markdown formatting
    """
    return f"""_Информация от {format(obj.created_at, "d E Y")}:_
*{Equipment._meta.get_field("inv_number").verbose_name} :* `{obj.inv_number}`
*{Equipment._meta.get_field("type").verbose_name} :* `{obj.type}`
*{Equipment._meta.get_field("group").verbose_name} :* `{obj.group}`
*{Equipment._meta.get_field("model").verbose_name} :* `{obj.model}`
*{Equipment._meta.get_field("serial_number").verbose_name} :* `{obj.serial_number}`
*{Equipment._meta.get_field("registration_date").verbose_name} :* `{obj.registration_date}`
*{Equipment._meta.get_field("location_department").verbose_name} :* `{obj.location_department}`
*{Equipment._meta.get_field("responsible_employee").verbose_name} :* `{obj.responsible_employee}`
*{Equipment._meta.get_field("initial_price").verbose_name} :* `{obj.initial_price}`
*{Equipment._meta.get_field("residual_price").verbose_name} :* `{obj.residual_price}`
*{Equipment._meta.get_field("useful_life").verbose_name} :* `{obj.useful_life}`
"""


def get_movement_detail_message(obj: EquipMovement) -> str:
    return f"""{format(obj.created_at, "d E Y в H:m")} :
{obj.comment}
"""


async def get_image(message):
    image_id = await bot.get_file(message.photo[-1].file_id)
    image_path = f"telegram/media/{image_id.file_unique_id}.jpg"
    print(f"get_image: {image_id['file_path']=} {image_path=}")
    await bot.download_file(image_id['file_path'], image_path)
    return image_id, image_path


@dp.message_handler()
@group_chat_only
@valid_users_only
async def collect_message(message):
    text = 'Команда не распознана, лишние сообщения не допускаются.'
    answer = await message.reply(text=text, parse_mode=ParseMode.MARKDOWN)
    old_bot_message.append(answer)

    await bot.delete_message(message.chat.id, message.message_id)


class Command(BaseCommand):

    def handle(self, *args, **options):
        asyncio.ensure_future(add_more_photo(), loop=loop)
        executor.start_polling(dispatcher=dp)
