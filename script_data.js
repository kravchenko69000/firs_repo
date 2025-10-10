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
    const response = await fetch("PO.xlsx");
    if (!response.ok) throw new Error(`Файл не знайдено: ${response.status}`);

    const buffer = await response.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });

    if (!workbook.SheetNames.length) {
      console.warn("⚠️ Excel не містить жодного аркуша!");
      return;
    }

    // 📘 Зчитуємо кожен аркуш і вставляємо його назву як мітку
    globalData = workbook.SheetNames.flatMap((name) => {
      const rows = XLSX.utils
        .sheet_to_json(workbook.Sheets[name], { header: 1, defval: "" })
        .filter(
          (row) =>
            Array.isArray(row) &&
            row.some(
              (cell) =>
                cell !== null &&
                cell !== undefined &&
                String(cell).trim() !== ""
            )
        );

      // Вставляємо мітку (назву аркуша) перед його даними
      return [[name.toUpperCase()], ...rows];
    });

    console.log("✅ Дані зчитані:", globalData);

    // 🔹 Розділяємо на таблиці
    splitGlobalData(globalData);

    // 🔹 Виводимо результат (перші 5 рядків кожної таблиці)
    if (typeof showTables === "function") {
      showTables([
        SalesData_0,
        BS_0,
        CF_0,
        PL_0,
        STOCK_0,
        AP_0,
        BU_0,
        AR_0,
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
    const firstCell = String((row && row[0]) || "").trim();

    // Якщо це назва таблиці (рядок лише з текстом без пробілів у першій клітинці)
    if (firstCell && /^[A-Z0-9 _-]+$/.test(firstCell)) {
      if (currentName && currentTable.length > 0) {
        saveTable(currentName, currentTable);
      }

      currentName = firstCell.toUpperCase().replace(/\s+/g, "");
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
  const key = name.toUpperCase().trim().replace(/\s+/g, "");

  switch (key) {
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
