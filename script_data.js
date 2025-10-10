let globalData = [];
let combinedData = [];


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
    
    console.log("📊 DataFrame:",combinedData);
    // 🔹 Побудова графіка
    if (typeof initCharts === "function") initCharts(combinedData);



    // 🔹 Виклик функції для показу таблиць
    if (typeof showTables === "function") {
      showTables(globalData);
    }



  
    

  } catch (error) {
    console.error("❌ Помилка при зчитуванні Excel:", error);
  }
});
