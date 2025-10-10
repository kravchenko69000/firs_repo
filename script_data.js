let globalData = [];
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

    // ✅ Кожен лист як окремий об’єкт
    const globalData = {};
    workbook.SheetNames.forEach((name) => {
      const sheet = workbook.Sheets[name];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      globalData[name] = data;
    });

    console.log("✅ Дані зчитані з усіх листів:", globalData);

  } catch (error) {
    console.error("❌ Помилка при зчитуванні Excel:", error);
  }
});
