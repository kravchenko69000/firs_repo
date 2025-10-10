let globalData = {}; // глобальна змінна, доступна в інших скриптах

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 1️⃣ Завантажуємо файл Excel
    const response = await fetch('Test.xlsx');
    const buffer = await response.arrayBuffer();

    // 2️⃣ Читаємо книгу Excel
    const workbook = XLSX.read(buffer, { type: 'array' });
    const sheets = {};

    // 3️⃣ Перетворюємо кожен аркуш у масив об’єктів
    workbook.SheetNames.forEach(name => {
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1 });
      sheets[name] = sheet;
    });

    console.log("✅ Дані зчитані:", sheets);

    // 4️⃣ Преобразування (наприклад join, фільтрація)
    globalData = transformData(sheets);
    console.log("🔁 Після обробки:", globalData);

    // 5️⃣ Виклик побудови графіків (функція з Chart_logic.js)
    if (typeof initCharts === "function") {
      initCharts(globalData);
    } else {
      console.warn("⚠️ Функція initCharts ще не визначена!");
    }

  } catch (error) {
    console.error("❌ Помилка при зчитуванні файлу Excel:", error);
  }
});

// 6️⃣ Приклад простої функції обробки
function transformData(sheets) {
  // Наприклад, об’єднуємо два аркуші по першому стовпцю
  if (sheets.Sheet1 && sheets.Sheet2) {
    const merged = sheets.Sheet1.map((row, i) => [...row, ...(sheets.Sheet2[i] || [])]);
    return { merged };
  }
  return sheets; // якщо один лист, просто повертаємо його
}
