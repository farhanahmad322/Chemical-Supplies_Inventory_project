const chemicalData = [
  { id: 1, name: 'Ammonium Persulfate', vendor: 'LG Chem', density: 3525.92, viscosity: 60.63, packaging: 'Bag', packSize: 100, unit: 'kg', quantity: 6495.18 },
  { id: 2, name: 'Caustic Potash', vendor: 'Formosa', density: 3172.15, viscosity: 48.22, packaging: 'Bag', packSize: 100, unit: 'kg', quantity: 8751.90 },
  { id: 3, name: 'Dimethylaminopropylamino', vendor: 'LG Chem', density: 8435.37, viscosity: 12.62, packaging: 'Barrel', packSize: 75, unit: 'L', quantity: 5964.61 },
  { id: 4, name: 'Mono Ammonium Phosphate', vendor: 'Sinopec', density: 1597.65, viscosity: 76.51, packaging: 'Bag', packSize: 105, unit: 'kg', quantity: 8183.73 },
  { id: 5, name: 'Ferric Nitrate', vendor: 'DowDuPont', density: 364.04, viscosity: 14.90, packaging: 'Bag', packSize: 105, unit: 'kg', quantity: 4154.33 },
  { id: 6, name: 'n-Pentane', vendor: 'Sinopec', density: 4535.26, viscosity: 66.76, packaging: 'N/A', packSize: 'N/A', unit: 't', quantity: 6272.34 },
  { id: 7, name: 'Glycol Ether PM', vendor: 'LG Chem', density: 6495.18, viscosity: 72.12, packaging: 'Bag', packSize: 250, unit: 'kg', quantity: 8749.54 },
];

const tableBodyElement = document.getElementById('tableBody');

function renderTable() {
  tableBodyElement.innerHTML = '';
  chemicalData.forEach(item => {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td><input type="checkbox" class="row-select"></td>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.vendor}</td>
      <td>${item.density}</td>
      <td>${item.viscosity}</td>
      <td>${item.packaging}</td>
      <td>${item.packSize}</td>
      <td>${item.unit}</td>
      <td>${item.quantity}</td>
    `;
    tableBodyElement.appendChild(tableRow);
  });
}

function sortData(columnIndex) {
  const ascending = chemicalData._sorted && chemicalData._sorted.column === columnIndex && !chemicalData._sorted.ascending;
  
  chemicalData.sort((a, b) => {
    const valueA = Object.values(a)[columnIndex + 1];
    const valueB = Object.values(b)[columnIndex + 1];
    return ascending ? (valueA < valueB ? -1 : 1) : (valueA > valueB ? -1 : 1);
  });
  
  chemicalData._sorted = { column: columnIndex, ascending: !ascending };
  renderTable();
}

function getSelectedRowIndex() {
  const checkboxes = document.querySelectorAll('.row-select');
  return Array.from(checkboxes).findIndex(checkbox => checkbox.checked);
}

document.getElementById('addRow').addEventListener('click', () => {
  const newId = chemicalData.length + 1;
  chemicalData.push({ id: newId, name: 'New Chemical', vendor: 'Unknown', density: 0, viscosity: 0, packaging: 'N/A', packSize: 0, unit: 'N/A', quantity: 0 });
  renderTable();
});

document.getElementById('moveUp').addEventListener('click', () => {
  const index = getSelectedRowIndex();
  if (index > 0) {
    [chemicalData[index], chemicalData[index - 1]] = [chemicalData[index - 1], chemicalData[index]];
    renderTable();
  }
});

document.getElementById('moveDown').addEventListener('click', () => {
  const index = getSelectedRowIndex();
  if (index < chemicalData.length - 1 && index > -1) {
    [chemicalData[index], chemicalData[index + 1]] = [chemicalData[index + 1], chemicalData[index]];
    renderTable();
  }
});

document.getElementById('deleteRow').addEventListener('click', () => {
  const index = getSelectedRowIndex();
  if (index > -1) {
    chemicalData.splice(index, 1);
    renderTable();
  }
});

document.getElementById('refreshTable').addEventListener('click', () => {
  renderTable();
});

document.getElementById('saveData').addEventListener('click', () => {
  alert('Data has been saved!');
});

renderTable();
