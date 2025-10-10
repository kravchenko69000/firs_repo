let globalData = {};
let SalesData_0 = [];
let BS_0 = [];
let CF_0 = [];
let PL_0 = [];
let STOCK_0 = [];
let AP_0 = [];
let BU_0 = [];
let AR_0 = [];

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("PO.xlsx");
    if (!response.ok) throw new Error(`Файл не знайдено: ${response.status}`);

    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    // ✅ Зчитуємо всі листи в об'єкт globalData
    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      globalData[sheetName] = data;
    });

    console.log("✅ Дані з усіх листів:", globalData);

    // ✅ Масив посилань на таблиці
    const tables = [SalesData_0, BS_0, CF_0, PL_0, STOCK_0, AP_0, BU_0, AR_0];
    const sheetNames = workbook.SheetNames;

    // ✅ Розподіляємо по індексу
    sheetNames.forEach((name, i) => {
      if (i < tables.length) {
        tables[i] = globalData[name];
      }
    });

    // ✅ Повертаємо оновлені змінні
    [SalesData_0, BS_0, CF_0, PL_0, STOCK_0, AP_0, BU_0, AR_0] = tables;

    console.log("📊 Окремі таблиці:");
    console.log({ SalesData_0, BS_0, CF_0, PL_0, STOCK_0, AP_0, BU_0, AR_0 });
    console.log(SalesData_0);

  } catch (error) {
    console.error("❌ Помилка при зчитуванні Excel:", error);
  }
});
