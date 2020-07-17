import logging

from aiogram import Bot, Dispatcher, executor, types
from aiogram.types import ContentType
from asgiref.sync import sync_to_async
from django.core.management import BaseCommand
from aiogram.types import ReplyKeyboardRemove, ReplyKeyboardMarkup, KeyboardButton, \
    InlineKeyboardMarkup, InlineKeyboardButton

from pyzbar.pyzbar import decode
from PIL import Image
from telegram.models import EquipMovement

from django.conf import settings


def detect_barcode(img):
    d = decode(img)
    if not d:
        return False, "Штрих код не распознан"
    else:
        d = d[0].data.decode("utf-8")
        if d[0:3] == "296":
            d = "ОС" + d.split("296")[1]
        if d[0:3] == "600":
            d = "ДТ" + d.split("600")[1]
        return True, d


button_delete = KeyboardButton('.delete')

greet_kb = ReplyKeyboardMarkup()
greet_kb.add(button_delete)


inline_kb_full = InlineKeyboardMarkup(row_width=2)
inline_btn_del = InlineKeyboardButton('Удалить', callback_data='delete')
inline_btn_cancel = InlineKeyboardButton('Отмена', callback_data='cancel')
inline_kb_full.add(inline_btn_del, inline_btn_cancel)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

bot = Bot(
    token=settings.TELEGRAM_BOT_TOKEN
)
dp = Dispatcher(bot=bot)
state_delete = []


@dp.message_handler(lambda message: message.reply_to_message.message_id, commands=["del"], commands_prefix=[".", "/"])
async def confirm_delete(message):
    state_delete.append(message.message_id)
    state_delete.append(message.reply_to_message.message_id)
    await message.reply(text="Удаляем к хуям?", reply_markup=inline_kb_full)


@dp.callback_query_handler()
async def callback_inline_button(callback_query: types.CallbackQuery):
    code = callback_query.data
    if code == 'delete':
        try:
            em = await sync_to_async(EquipMovement.objects.get)(message_id=state_delete[1])
            await sync_to_async(em.delete)()
            await bot.delete_message(callback_query.message.chat.id, state_delete[1])
            await bot.answer_callback_query(callback_query.id, text="Сделано, не благадари =)")
        except EquipMovement.DoesNotExist:
            await bot.answer_callback_query(callback_query.id, text="Не нашел в базе!")
    else:
        await bot.answer_callback_query(callback_query.id, text="Ну как хочешь =(")
    await bot.delete_message(callback_query.message.chat.id, state_delete[0])
    await bot.delete_message(callback_query.message.chat.id, state_delete[0]+1)
    state_delete.clear()
    #     await bot.answer_callback_query(
    #         callback_query.id,
    #         text=f'Нажата кнопка с номером {code}.\nА этот текст может быть длиной до 200 символов :wink:', show_alert=True)


@dp.message_handler(commands=["Help", "?", "h"], commands_prefix=[".", "/"])
async def send_menu(message: types.Message):
    await message.reply(text='''
        Вот что есть на данный момент
        ''', reply_markup=greet_kb)


@dp.message_handler(lambda message: message.text.lower() == "help")
async def command_answer(message):
    await bot.send_message(message.chat.id, "my commands")


@dp.message_handler(content_types=ContentType.PHOTO)
async def collect_photo(message):
    if not message.caption and not message.reply_to_message:
        await bot.delete_message(message.chat.id, message.message_id)
        print("Photo is delete")
    elif message.reply_to_message:
        await bot.send_message(message.chat.id, "Фото добавлено")
    else:
        get_image_id = await bot.get_file(message.photo[-1].file_id)
        img_path = f"telegram/media/{get_image_id.file_unique_id}.jpg"
        await bot.download_file(get_image_id['file_path'], img_path)
        img = Image.open(img_path)
        bool_bar, barcode = detect_barcode(img)
        if bool_bar:
            await sync_to_async(EquipMovement.objects.update_or_create)(telegram_user_id=message.from_user.id,
                                                                        inv_number=barcode, comment=message.caption,
                                                                        inv_image=img_path, message_id=message.message_id)
            await bot.send_message(message.chat.id,
                                   f"Ваш ID {message.from_user.id}\nХуйня со штрихкодом {barcode} сохранена как {message.message_id}.")
        else:
            await bot.send_message(message.chat.id, barcode)


@dp.message_handler()
async def collect_message(message):
    print(message.as_json)
    # await bot.send_message(message.chat.id, message.as_json)


class Command(BaseCommand):

    def handle(self, *args, **options):
        print("bot start")

        executor.start_polling(dispatcher=dp)
