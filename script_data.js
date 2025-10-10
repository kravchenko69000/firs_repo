let globalData = [];
let SalesData_0 = [];
let BS_0 = [];
let CF_0 = [];
let PL_0 = [];
let STOCK_0 = [];
let AP_0 = [];
let BU_0 = [];
let AR_0 = [];

// ⏳ Коли сторінка завантажилась
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('PO.xlsx');
    if (!response.ok) throw new Error(`Файл не знайдено: ${response.status}`);

    const buffer = await response.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });

    if (!workbook.SheetNames.length) {
      console.warn("⚠️ Excel не містить жодного аркуша!");
      return;
    }

    // Масив аркушів (двовимірних масивів)
    globalData = workbook.SheetNames.flatMap(name =>
      XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1 })
    );

    console.log("✅ Дані зчитані:", globalData);

    // 🔹 Нарізаємо таблиці за назвами
    splitGlobalData(globalData);

    // 🔹 Виводимо результат (показати лише перші 5 рядків кожної таблиці)
    if (typeof showTables === "function") {
      showTables([
        SalesData_0,
        BS_0,
        CF_0,
        PL_0,
        STOCK_0,
        AP_0,
        BU_0,
        AR_0
      ]);
    }

  } catch (error) {
    console.error("❌ Помилка при зчитуванні Excel:", error);
  }
});


// ================================
// 🧩 ФУНКЦІЯ НАРІЗКИ ГЛОБАЛЬНИХ ДАНИХ
// ================================
function splitGlobalData(globalData) {
  if (!Array.isArray(globalData)) {
    console.error("❌ globalData має бути масивом");
    return;
  }

  let currentName = null;
  let currentTable = [];

  for (let i = 0; i < globalData.length; i++) {
    const row = globalData[i];

    // Якщо це назва таблиці (перша клітинка — текст у верхньому регістрі без цифр)
    if (row && typeof row[0] === "string" && /^[A-Z_]+$/.test(row[0].trim())) {
      if (currentName && currentTable.length > 0) {
        saveTable(currentName, currentTable);
      }

      currentName = row[0].trim();
      currentTable = [];
      continue;
    }

    if (currentName) {
      currentTable.push(row);
    }
  }

  // Зберегти останню таблицю
  if (currentName && currentTable.length > 0) {
    saveTable(currentName, currentTable);
  }

  console.log("✅ Таблиці розділено:");
  console.log({ SalesData_0, BS_0, CF_0, PL_0, STOCK_0, AP_0, BU_0, AR_0 });
}

// ================================
// 💾 ЗБЕРЕЖЕННЯ ТАБЛИЦІ
// ================================
function saveTable(name, data) {
  switch (name.toUpperCase()) {
    case "SALESDATA":
      SalesData_0 = data;
      break;
    case "BS":
      BS_0 = data;
      break;
    case "CF":
      CF_0 = data;
      break;
    case "PL":
      PL_0 = data;
      break;
    case "STOCK":
      STOCK_0 = data;
      break;
    case "AP":
      AP_0 = data;
      break;
    case "BU":
      BU_0 = data;
      break;
    case "AR":
      AR_0 = data;
      break;
    default:
      console.warn("⚠️ Невідома таблиця:", name);
  }
}
