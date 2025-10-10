let globalData = [];
let df = [];


document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('Test.xlsx');
    if (!response.ok) throw new Error(`Файл не знайдено: ${response.status}`);

    const buffer = await response.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });

    if (!workbook.SheetNames.length) {
      console.warn("⚠️ Excel не містить жодного аркуша!");
    }

    // Масив аркушів
    globalData = workbook.SheetNames.map(name =>
      XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1 })
    );

    console.log("✅ Дані зчитані:", globalData);

    // 🔁 Об’єднуємо всі аркуші в один масив
    let combinedData = globalData.flat();
    console.log("🔁 Об’єднані дані:", combinedData);

    // 2️⃣ Створюємо DataFrame
    function createDataFrame(data) {
      if (!data.length) return [];
      const headers = data[0];
      const rows = data.slice(1);
      return rows.map(row => {
        const obj = {};
        headers.forEach((h, i) => obj[h] = row[i] ?? null);
        return obj;
      });
    }

    let df = createDataFrame(combinedData);
    console.log("📊 DataFrame:", df);
    // 🔹 Побудова графіка
    if (typeof initCharts === "function") initCharts(df);



    // 🔹 Виклик функції для показу таблиць
    if (typeof showTables === "function") {
      showTables(globalData);
    }



  
    

  } catch (error) {
    console.error("❌ Помилка при зчитуванні Excel:", error);
  }
});
