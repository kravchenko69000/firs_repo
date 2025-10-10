let globalData = {}; // глобальна змінна, доступна в інших скриптах

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('Test.xlsx');
    const buffer = await response.arrayBuffer();

    const workbook = XLSX.read(buffer, { type: 'array' });
    const sheets = {};

    workbook.SheetNames.forEach(name => {
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1 });
      sheets[name] = sheet;
    });

    console.log("✅ Дані зчитані:", sheets);

    globalData = transformData(sheets);
    console.log("🔁 Після обробки:", globalData);

    if (typeof initCharts === "function") {
      initCharts(globalData);
    } else {
      console.warn("⚠️ Функція initCharts ще не визначена!");
    }

  } catch (error) {
    console.error("❌ Помилка при зчитуванні файлу Excel:", error);
  }
});

// 🔧 проста функція обробки даних
function transformData(sheets) {
  if (sheets.Sheet1) {
    return sheets;
  }
  return {};
}
