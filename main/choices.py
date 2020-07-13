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

PRINTERS = (
    ("HP_M227fdn", "HP LaserJet Pro MFP M227fdn"),
    ("HP_M426fdn", "HP LaserJet Pro MFP M426fdn"),
    ("Kyocera_FS1030MFP", "Kyocera FS-1030MFP"),
    ("Kyocera_FS1035MFP", "Kyocera FS-1035MFP")
)

SUPPLY_TYPE_BOOLEAN = (
    (True, "Выдача"),
    (False, "Поступление")
)
