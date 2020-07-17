import asyncio
import logging
from typing import Tuple

import PIL
from PIL import Image
from aiogram import Bot, Dispatcher, executor, types
from aiogram.types import ContentType
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, \
    InlineKeyboardMarkup, InlineKeyboardButton
from asgiref.sync import sync_to_async
from django.conf import settings
from django.core.management import BaseCommand
from pyzbar.pyzbar import decode

from telegram.models import EquipMovement


def get_inv_number(image: PIL.Image) -> Tuple[bool, str]:
    inv_number = decode(image)
    if not inv_number:
        return False, "Штрих код не распознан"
    else:
        inv_number = inv_number[0].data.decode("utf-8")
        if inv_number[0:3] == "296":
            inv_number = "ОС" + inv_number.split("296")[1]
            return True, inv_number
        if inv_number[0:3] == "600":
            inv_number = "ДТ" + inv_number.split("600")[1]
            return True, inv_number

        return False, f"{inv_number} не является инвентарным номером"


bot_help_description = "Привет, че забыл команды?\n\nНапоминаю вызвать их \nможно через . или /" + \
                       "\n\n.d .del .delete - удаляет фото с комментарием из базы и чата"

button_delete = KeyboardButton('.delete')

greet_kb = ReplyKeyboardMarkup()
greet_kb.add(button_delete)

inline_kb_full = InlineKeyboardMarkup(row_width=2)
inline_btn_del = InlineKeyboardButton('Удалить', callback_data='delete')
inline_btn_cancel = InlineKeyboardButton('Отмена', callback_data='cancel')
inline_kb_full.add(inline_btn_del, inline_btn_cancel)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

loop = asyncio.get_event_loop()

bot = Bot(
    token=settings.TELEGRAM_BOT_TOKEN,
    loop=loop
)

dp = Dispatcher(bot=bot)
state_delete = []

user_photos = []


async def print_time():
    while True:
        await asyncio.sleep(5)
        if len(user_photos) > 0:
            for message in user_photos:
                movement = await sync_to_async(EquipMovement.objects.get)(message_id=message.reply_to_message)
                movement.inv_image = message


@dp.message_handler(commands=["delete", "del", "d"], commands_prefix=[".", "/"])
async def confirm_delete(message):
    if message.reply_to_message:
        state_delete.append(message.message_id)
        state_delete.append(message.reply_to_message.message_id)
        await message.reply(text="Удаляем к хуям?", reply_markup=inline_kb_full)
    else:
        await message.reply(text="Вызывать .del можно только в ответ на сообщение с фотографией, тупой что ли?")
        await bot.delete_message(message.chat.id, message.message_id)


@dp.callback_query_handler()
async def callback_inline_button(callback_query: types.CallbackQuery):
    code = callback_query.data
    if code == 'delete':
        try:
            em = await sync_to_async(EquipMovement.objects.get)(message_id=state_delete[1])
            await bot.delete_message(callback_query.message.chat.id, em.message_id + 1)
            await sync_to_async(em.delete)()
            await bot.delete_message(callback_query.message.chat.id, state_delete[1])
            await bot.answer_callback_query(callback_query.id, text="Сделано, не благодари =)")
        except EquipMovement.DoesNotExist:
            await bot.answer_callback_query(callback_query.id, text="Не нашел в базе! Поэтому не удалю!")
    else:
        await bot.answer_callback_query(callback_query.id, text="Ну как хочешь =(")
    await bot.delete_message(callback_query.message.chat.id, state_delete[0])
    await bot.delete_message(callback_query.message.chat.id, state_delete[0] + 1)
    state_delete.clear()


@dp.message_handler(lambda message: message.text.lower() == "help")
@dp.message_handler(commands=["Help", "?", "h"], commands_prefix=[".", "/"])
async def send_menu(message: types.Message):
    await message.reply(text=bot_help_description, reply_markup=greet_kb)


@dp.message_handler(content_types=ContentType.PHOTO)
async def handle_photo(message):
    if not message.caption and not message.reply_to_message:
        await bot.delete_message(message.chat.id, message.message_id)
        print("Photo is deleted")

    elif message.reply_to_message:
        user_photos.append(message)

    else:
        image_id, image_path = await get_image(message)
        await download_image(image_id, image_path)
        img = Image.open(image_path)
        bool_bar, barcode = get_inv_number(img)
        if bool_bar:
            await sync_to_async(EquipMovement.objects.create)(telegram_user_id=message.from_user.id,
                                                              inv_number=barcode, comment=message.caption,
                                                              inv_image=image_path,
                                                              message_id=message.message_id)
            await bot.send_message(message.chat.id,
                                   f"Ваш ID {message.from_user.id}\nХуйня со штрихкодом {barcode} сохранена как {message.message_id}.")
        else:
            await bot.send_message(message.chat.id, barcode)


async def get_image(message):
    image_id = await bot.get_file(message.photo[-1].file_id)
    image_path = f"telegram/media/{image_id.file_unique_id}.jpg"
    return image_id, image_path


async def download_image(image_id, path):
    await bot.download_file(image_id['file_path'], path)


@dp.message_handler()
async def collect_message(message):
    print(message.as_json)
    # await bot.send_message(message.chat.id, message.as_json)


class Command(BaseCommand):

    def handle(self, *args, **options):
        asyncio.ensure_future(print_time(), loop=loop)
        executor.start_polling(dispatcher=dp)
