from django.core.management import BaseCommand
from openpyxl import load_workbook

from main.models import Equipment

column_names = {
    "Инвентарный №": "inv_number",
    "Наименование": "name",
    "Тип ОС": "type",
    "Группа ОС": "group",
    "Марка": "model",
    "Серийный номер": "serial_number",
    "Дата постановки на учет": "registration_date",
    # "Подразделение учета": "default",
    # "Отдел учета": "default",
    # "Подразделение местоположения": "default",
    "Отдел местоположения": "location_department",
    "Ответственный": "responsible_employee",
    # "Пользователь ОС": "default",
    "Первоначальная стоимость с НДС": "initial_price",
    # "Первоначальная стоимость без НДС": "default",
    "Остаточная стоимость с НДС": "residual_price",
    # "Остаточная стоимость без НДС": "default",
    "Срок пол. использования": "useful_life",
}

objects_list = []


def get_value(column_name, raw_value):
    if column_name == "Инвентарный №":
        return "ОС" + raw_value
    elif column_names == "Дата постановки на учет":
        return raw_value
    else:
        return raw_value


class Command(BaseCommand):

    def handle(self, *args, **options):
        wb = load_workbook('main/management/commands/os-data.xlsx')
        ws = wb.active

        print(wb.get_sheet_names())

        Equipment.objects.all().delete()

        for column in ws.columns:
            name = column[0].value
            if name in column_names:

                if len(objects_list) == 0:
                    for cell in column[1:]:
                        initial = {column_names[name]: get_value(name, cell.value)}
                        objects_list.append(initial)

                else:
                    for index in range(0, len(objects_list)):
                        value = column[index + 1].value
                        if value:
                            objects_list[index][column_names[name]] = get_value(name, value)

        print('-----')

        Equipment.objects.bulk_create([Equipment(**item) for item in objects_list])

        print("Success")
