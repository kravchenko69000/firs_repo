function initCharts(data) {
  console.log("📈 Отримав дані у Chart_logic.js:", data);

  const ctx = document.getElementById('chart1');
  if (!ctx) {
    console.warn("⛔ Не знайдено canvas для графіка!");
    return;
  }

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.Sheet1.map(row => row[0]), // приклад
      datasets: [{
        label: 'Приклад',
        data: data.Sheet1.map(row => row[1]),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
