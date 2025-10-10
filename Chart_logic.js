function showTables(data) {
  const container = document.getElementById('tablesContainer');
  if (!container) return console.warn("⛔ Не знайдено контейнер для таблиць");

  container.innerHTML = ""; // очистимо попереднє

  data.forEach((sheet, index) => {
    if (!sheet || !sheet.length) return;

    // Заголовок
    const title = document.createElement('h2');
    title.textContent = `Аркуш #${index + 1}`;
    container.appendChild(title);

    // Створюємо таблицю
    const table = document.createElement('table');
    table.style.borderCollapse = "collapse";
    table.style.marginBottom = "20px";
    table.style.width = "100%";

    sheet.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');

      row.forEach(cell => {
        const td = document.createElement(rowIndex === 0 ? 'th' : 'td');
        td.textContent = cell ?? ""; // якщо null/undefined
        td.style.border = "1px solid #444";
        td.style.padding = "4px 8px";
        tr.appendChild(td);
      });

      table.appendChild(tr);
    });

    container.appendChild(table);
  });
}


//////////////////////////////

function initCharts(df) {
  if (!df || !df.length) {
    console.warn("⚠️ DataFrame порожній!");
    return;
  }

  const labels = df.slice(1).map(row => row[0]);     // перша колонка
  const dataValues = df.slice(1).map(row => row[1]); // друга колонка

  const ctx = document.getElementById('chart1');
  if (!ctx) {
    console.warn("⛔ Не знайдено canvas для графіка!");
    return;
  }

  new Chart(ctx.getContext('2d'), {
    type: 'bar', 
    data: {
      labels: labels,
      datasets: [{
        label: 'Sales Report',
        data: dataValues,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}
