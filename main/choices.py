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
    ("HP LaserJet Pro MFP M227fdn", "HP LaserJet Pro MFP M227fdn"),
    ("HP LaserJet Pro MFP M426fdn", "HP LaserJet Pro MFP M426fdn"),
    ("Kyocera FS-1030MFP", "Kyocera FS-1030MFP"),
    ("Kyocera FS-1035MFP", "Kyocera FS-1035MFP")
)

SUPPLY_TYPE_BOOLEAN = (
    (True, "Выдача"),
    (False, "Поступление")
)
