MANUFACTURER_CHOICES = (
    ("HP", "HP"),
    ("Kyocera", "Kyocera"),
    ("Samsung", "Samsung")
)

ORDER_STATUS = (
    ("creating", "Ожидает Отправки"),
    ("pending", "Обработка менеджером"),
    ("work", "В работе"),
    ("finished", "Завершён")
)

SUPPLY_TYPE_BOOLEAN = (
    (True, "Выдача"),
    (False, "Поступление")
)
