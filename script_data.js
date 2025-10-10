<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>

fetch('Test.xlsx')
  .then(res => res.arrayBuffer())
  .then(buffer => {
    const workbook = XLSX.read(buffer, { type: 'array' });
    const sheets = {};
    workbook.SheetNames.forEach(name => {
      sheets[name] = XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1 });
    });
    console.log(sheets);
  });
