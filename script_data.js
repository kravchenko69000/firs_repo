let globalData = []; // тепер масив, а не об'єкт

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('Test.xlsx');
    const buffer = await response.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });

    // Масив усіх аркушів по порядку
    globalData = workbook.SheetNames.map(name =>
      XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1 })
    );

    console.log("✅ Дані зчитані (масив аркушів):", globalData);

    // Виклик графіків
    if (typeof initCharts === "function") {
      initCharts(globalData);
    }

  } catch (error) {
    console.error("❌ Помилка при зчитуванні Excel:", error);
  }
});
