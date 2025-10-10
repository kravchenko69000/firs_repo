function initCharts(data) {
  console.log("📈 Дані у Chart_logic.js:", data);

  const ctx = document.getElementById('chart1');
  if (!ctx) return console.warn("⛔ Не знайдено canvas для графіка!");

  // Перевіряємо, що хоча б один аркуш є
  if (!Array.isArray(data) || !data[0]) {
    return console.warn("⚠️ Перший аркуш Excel відсутній або порожній!");
  }

  const sheet = data[0]; // перший аркуш
  const labels = sheet.map(row => row[0] || ""); // перший стовпець
  const values = sheet.map(row => row[1] || 0); // другий стовпець

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Приклад по індексу',
        data: values,
        backgroundColor: 'rgba(37, 99, 235, 0.5)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true } }
    }
  });
}
