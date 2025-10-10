function initCharts(data) {
  const container = document.getElementById('chartsContainer');
  if (!container) return console.warn("⛔ Не знайдено контейнер для графіків!");

  // Очищаємо попередні графіки, якщо були
  container.innerHTML = "";

  data.forEach((sheet, index) => {
    if (!sheet || !sheet.length) return; // пропускаємо порожні аркуші

    // Динамічно створюємо заголовок і canvas
    const title = document.createElement('h2');
    title.textContent = `Аркуш #${index + 1}`;
    container.appendChild(title);

    const canvas = document.createElement('canvas');
    canvas.id = `chart${index}`;
    canvas.width = 400;
    canvas.height = 200;
    container.appendChild(canvas);

    const labels = sheet.map(row => row[0] || "");
    const values = sheet.map(row => row[1] || 0);

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: `Аркуш #${index + 1}`,
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
  });
}
