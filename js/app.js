// ── Tab switching ──────────────────────────────────────────────────────────
const moreBtn = document.getElementById('moreBtn');
const moreMenu = document.getElementById('moreMenu');
const moreTabs = ['scenarios','deepdive','arch','iopath','setup'];

function switchToTab(tabId) {
  // Deactivate all
  document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.more-item').forEach(x => x.classList.remove('active'));
  moreBtn.classList.remove('has-active');
  // Activate panel
  document.getElementById('panel-' + tabId).classList.add('active');
  // Highlight correct source
  if (moreTabs.includes(tabId)) {
    moreBtn.classList.add('has-active');
    document.querySelector(`.more-item[data-tab="${tabId}"]`).classList.add('active');
  } else {
    document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add('active');
  }
  moreMenu.classList.remove('open');
  // Trigger chart resize after tab switch
  setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
}

// Main tab clicks
document.querySelectorAll('.tab[data-tab]').forEach(tab => {
  tab.addEventListener('click', () => switchToTab(tab.dataset.tab));
});

// More button toggle
moreBtn.addEventListener('click', e => {
  e.stopPropagation();
  moreMenu.classList.toggle('open');
});

// More menu items
document.querySelectorAll('.more-item').forEach(item => {
  item.addEventListener('click', () => switchToTab(item.dataset.tab));
});

// Close dropdown on outside click
document.addEventListener('click', () => moreMenu.classList.remove('open'));

// ── Chart defaults ────────────────────────────────────────────────────────
Chart.defaults.color = '#8b8fa3';
Chart.defaults.borderColor = '#2d3245';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 11;
Chart.defaults.plugins.legend.labels.boxWidth = 14;
Chart.defaults.plugins.legend.labels.padding = 14;

function makeBarChart(canvasId, labels, datasets, yLabel) {
  return new Chart(document.getElementById(canvasId), {
    type: 'bar',
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: yLabel } },
        x: { grid: { display: false } }
      }
    }
  });
}

function makeLineChart(canvasId, labels, datasets, yLabel) {
  return new Chart(document.getElementById(canvasId), {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      interaction: { mode: 'index', intersect: false },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: yLabel } },
        x: { grid: { display: false } }
      }
    }
  });
}

function ds(sysKey, data, opts = {}) {
  const s = SYSTEMS[sysKey];
  return { label: s.label, data, backgroundColor: s.color + '99', borderColor: s.border, borderWidth: 2, tension: .3, pointRadius: 4, fill: false, ...opts };
}

// ── Overview charts ───────────────────────────────────────────────────────
const cLabels = ['c1', 'c4', 'c16', 'c64'];
const cLabels3 = ['c1', 'c4', 'c16'];

makeBarChart('chartOverviewPut', cLabels,
  [ds('rustfs_path', [13.23, 35.22, 37.23, 37.22]),
   ds('rustfs_is',   [11.99, 33.40, 37.32, 37.34]),
   ds('ozone_path',  [11.13, 26.19, 35.67, 37.26]),
   ds('ozone_is',    [11.52, 26.44, 36.24, 37.28])],
  'ops/s');

makeBarChart('chartOverviewGet', cLabels,
  [ds('rustfs_path', [156.48, 685.70, 1206.82, 1196.80]),
   ds('rustfs_is',   [117.92, 518.55, 1205.64, 1271.53]),
   ds('ozone_path',  [92.75, 527.55, 2192.74, 5914.80]),
   ds('ozone_is',    [75.23, 422.95, 1754.63, 5229.65])],
  'ops/s');

makeBarChart('chartOverviewHead', cLabels,
  [ds('rustfs_path', [188.90, 857.63, 1589.90, 1584.78]),
   ds('rustfs_is',   [134.97, 558.97, 1436.42, 1561.03]),
   ds('ozone_path',  [333.20, 1598.94, 6423.79, 10188.08]),
   ds('ozone_is',    [218.68, 1192.62, 4626.49, 9093.30])],
  'ops/s');

makeBarChart('chartOverviewList', cLabels3,
  [ds('rustfs_path', [3.97, 5.11, 4.29]),
   ds('rustfs_is',   [3.75, 7.13, 7.39]),
   ds('ozone_path',  [23.77, 115.63, 245.36]),
   ds('ozone_is',    [7.85, 35.87, 138.98])],
  'ops/s');

// ── LIST charts ───────────────────────────────────────────────────────────
makeLineChart('chartListTiny', cLabels3,
  [ds('rustfs_path', [3.97, 5.11, 4.29]),
   ds('rustfs_is',   [3.75, 7.13, 7.39]),
   ds('ozone_path',  [23.77, 115.63, 245.36]),
   ds('ozone_is',    [7.85, 35.87, 138.98])],
  'ops/s');

makeLineChart('chartListLatency', cLabels3,
  [ds('rustfs_path', [250.7, 785.4, 3722]),
   ds('rustfs_is',   [267.4, 544.7, 2160]),
   ds('ozone_path',  [43.2, 33.0, 64.6]),
   ds('ozone_is',    [128.5, 112.8, 114.8])],
  'p50 (ms)');

// ── PUT charts ────────────────────────────────────────────────────────────
makeBarChart('chartPutSmall', cLabels,
  [ds('rustfs_path', [13.23, 35.22, 37.23, 37.22]),
   ds('rustfs_is',   [11.99, 33.40, 37.32, 37.34]),
   ds('ozone_path',  [11.13, 26.19, 35.67, 37.26]),
   ds('ozone_is',    [11.52, 26.44, 36.24, 37.28])],
  'ops/s');

makeLineChart('chartPutLatency', cLabels,
  [ds('rustfs_path', [141.7, 216.0, 494.9, 3166.7]),
   ds('rustfs_is',   [191.4, 310.1, 660.1, 3164.6]),
   ds('ozone_path',  [195.4, 521.7, 1162.9, 5976.9]),
   ds('ozone_is',    [234.6, 537.9, 1133.5, 4852.8])],
  'p99 latency (ms)');

makeBarChart('chartPutSuccess', cLabels3,
  [ds('rustfs_path', [100, 100, 100]),
   ds('ozone_path',  [100, 91.5, 93.8]),
   ds('ozone_is',    [100, 92.3, 93.1])],
  'Success %');

makeBarChart('chartPutMedium', cLabels3,
  [ds('rustfs_path', [4.38, 10.67, 11.17]),
   ds('rustfs_is',   [4.94, 10.62, 11.19]),
   ds('ozone_path',  [4.50, 9.27, 11.11]),
   ds('ozone_is',    [4.44, 9.51, 11.16])],
  'ops/s');

makeBarChart('chartPutLarge', cLabels3,
  [ds('rustfs_path', [1.54, 1.69, 1.75]),
   ds('rustfs_is',   [1.52, 1.75, 1.75]),
   ds('ozone_path',  [1.17, 1.71, 1.74]),
   ds('ozone_is',    [1.10, 1.70, 1.71])],
  'ops/s');

makeBarChart('chartPutLargeSuccess', cLabels3,
  [ds('rustfs_path', [100, 100, 100]),
   ds('rustfs_is',   [100, 100, 100]),
   ds('ozone_path',  [100, 98.3, 71.2]),
   ds('ozone_is',    [100, 98.1, 66.5])],
  'Success %');

// ── GET charts ────────────────────────────────────────────────────────────
makeLineChart('chartGetSmall', cLabels,
  [ds('rustfs_path', [156.48, 685.70, 1206.82, 1196.80]),
   ds('rustfs_is',   [117.92, 518.55, 1205.64, 1271.53]),
   ds('ozone_path',  [92.75, 527.55, 2192.74, 5914.80]),
   ds('ozone_is',    [75.23, 422.95, 1754.63, 5229.65])],
  'ops/s');

makeLineChart('chartGetLatency', cLabels,
  [ds('rustfs_path', [6.07, 5.53, 12.80, 52.92]),
   ds('rustfs_is',   [7.59, 7.09, 12.02, 14.94]),
   ds('ozone_path',  [10.23, 7.53, 7.13, 10.14]),
   ds('ozone_is',    [12.26, 9.29, 8.81, 11.22])],
  'p50 (ms)');

makeBarChart('chartGetMedium', cLabels3,
  [ds('rustfs_path', [203.53, 688.73, 1178.91]),
   ds('rustfs_is',   [124.67, 503.81, 1190.88]),
   ds('ozone_path',  [91.67, 512.48, 2124.46]),
   ds('ozone_is',    [75.95, 426.45, 1772.86])],
  'ops/s');

makeBarChart('chartGetLarge', cLabels3,
  [ds('rustfs_path', [171.74, 681.00, 1181.34]),
   ds('rustfs_is',   [122.60, 505.11, 1227.56]),
   ds('ozone_path',  [91.12, 511.24, 2107.06]),
   ds('ozone_is',    [71.59, 461.60, 1952.06])],
  'ops/s');

// ── HEAD charts ───────────────────────────────────────────────────────────
makeLineChart('chartHeadOps', cLabels,
  [ds('rustfs_path', [188.90, 857.63, 1589.90, 1584.78]),
   ds('rustfs_is',   [134.97, 558.97, 1436.42, 1561.03]),
   ds('ozone_path',  [333.20, 1598.94, 6423.79, 10188.08]),
   ds('ozone_is',    [218.68, 1192.62, 4626.49, 9093.30])],
  'ops/s');

makeLineChart('chartHeadLatency', cLabels,
  [ds('rustfs_path', [4.91, 4.40, 9.73, 39.29]),
   ds('rustfs_is',   [6.43, 5.87, 9.48, 11.15]),
   ds('ozone_path',  [2.94, 2.46, 2.35, 5.88]),
   ds('ozone_is',    [4.53, 3.30, 3.24, 6.44])],
  'p50 (ms)');

// ── DELETE charts ─────────────────────────────────────────────────────────
makeBarChart('chartDeleteOps', cLabels3,
  [ds('rustfs_path', [45.17, 160.84, 182.88]),
   ds('rustfs_is',   [36.38, 142.45, 278.82]),
   ds('ozone_path',  [29.26, 173.99, 555.89]),
   ds('ozone_is',    [22.59, 129.91, 464.66])],
  'ops/s');

makeLineChart('chartDeleteLatency', cLabels3,
  [ds('rustfs_path', [10.27, 12.32, 63.34]),
   ds('rustfs_is',   [12.88, 13.80, 35.85]),
   ds('ozone_path',  [8.93, 4.82, 4.70]),
   ds('ozone_is',    [11.90, 6.87, 6.56])],
  'p50 (ms)');

// ── Consistency charts ────────────────────────────────────────────────────
makeBarChart('chartRAW', cLabels3,
  [ds('rustfs_path', [100, 100, 100]),
   ds('rustfs_is',   [100, 100, 100]),
   ds('ozone_path',  [0, 0, 0]),
   ds('ozone_is',    [0, 0, 0])],
  'Success %');

makeBarChart('chartOverwrite', ['c16', 'c64'],
  [ds('rustfs_path', [92.9, 69.7]),
   ds('rustfs_is',   [90.0, 83.8]),
   ds('ozone_path',  [0, 1.1]),
   ds('ozone_is',    [0, 0])],
  'Success %');

// ── Mixed / Soak charts ──────────────────────────────────────────────────
makeBarChart('chartMixed', ['Read-Heavy c16', 'Read-Heavy c64', 'Write-Heavy c16', 'Write-Heavy c64'],
  [ds('rustfs_path', [185.30, 187.64, 52.84, 53.21]),
   ds('rustfs_is',   [186.14, 188.86, 53.06, 53.46]),
   ds('ozone_path',  [183.08, 183.31, 52.13, 53.04]),
   ds('ozone_is',    [183.84, 184.85, 52.58, 42.35])],
  'ops/s');

new Chart(document.getElementById('chartSoak'), {
  type: 'bar',
  data: {
    labels: ['RustFs Path', 'RustFs IS', 'Ozone Path', 'Ozone IS'],
    datasets: [
      { label: 'Success', data: [671037, 665745, 3532011, 3167162], backgroundColor: '#34d399' },
      { label: 'Failures', data: [0, 0, 881589, 791857], backgroundColor: '#f87171' }
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: { stacked: true, title: { display: true, text: 'Total Operations (1hr)' } }
    }
  }
});

// ── Summary table ─────────────────────────────────────────────────────────
const tbody = document.querySelector('#summaryTable tbody');
summaryRows.forEach(r => {
  const winner = r[6];
  const cls = winner === 'RustFs' ? 'winner-rustfs' : winner === 'Ozone' ? 'winner-ozone' : 'winner-tie';
  tbody.innerHTML += `<tr>
    <td>${r[1]}</td>
    <td class="num">${r[2]}</td><td class="num">${r[3]}</td>
    <td class="num">${r[4]}</td><td class="num">${r[5]}</td>
    <td><span class="winner ${cls}">${winner}</span></td>
    <td class="num">${r[7]}</td>
  </tr>`;
});

// ── LIST detail table ─────────────────────────────────────────────────────

// ── Deep Dive charts ─────────────────────────────────────────────────────

// Latency percentile charts (grouped bar: p50, p75, p90, p95, p99)

function makePctChart(id, rp, ri, op, oi) {
  makeBarChart(id, pctLabels,
    [ds('rustfs_path', rp), ds('rustfs_is', ri), ds('ozone_path', op), ds('ozone_is', oi)], 'ms');
}

makePctChart('chartPctPutC16',
  [428.6, 437.0, 445.6, 453.2, 494.9],
  [425.5, 429.9, 436.5, 446.7, 660.1],
  [399.5, 557.8, 738.2, 875.0, 1162.9],
  [398.2, 542.6, 703.6, 822.1, 1133.5]);

makePctChart('chartPctPutC64',
  [1686.1, 1696.6, 1719.7, 1749.0, 3166.7],
  [1620.1, 1654.7, 1827.7, 2602.6, 3164.6],
  [1384.1, 2300.6, 3410.0, 4284.5, 5976.9],
  [1490.0, 2332.0, 3120.6, 3716.2, 4852.8]);

makePctChart('chartPctGetC16',
  [12.8, 14.3, 15.8, 16.9, 19.7],
  [12.0, 13.9, 16.3, 18.1, 22.5],
  [7.1, 7.8, 8.3, 8.8, 11.4],
  [8.8, 9.2, 9.7, 10.7, 17.4]);

makePctChart('chartPctGetC64',
  [52.9, 57.6, 62.4, 65.9, 74.2],
  [14.9, 18.4, 24.6, 34.1, 274.7],
  [10.1, 12.2, 14.6, 16.0, 19.0],
  [11.2, 13.3, 17.0, 18.3, 21.1]);

makePctChart('chartPctHeadC64',
  [39.3, 44.1, 49.1, 52.5, 59.7],
  [11.1, 14.7, 23.0, 29.6, 264.4],
  [5.9, 7.2, 8.8, 10.0, 12.5],
  [6.4, 7.7, 10.1, 11.7, 15.1]);

makePctChart('chartPctPutLgC16',
  [9596.6, 10762.6, 11869.9, 13077.8, 16735.3],
  [9068.1, 10754.2, 12289.3, 13086.2, 15980.3],
  [9311.4, 11215.6, 12826.2, 13891.5, 16114.5],
  [9940.5, 11626.6, 12549.4, 13371.4, 14394.9]);

// Variance table
const varBody = document.getElementById('varianceBody');
function vCell(mean, sd) {
  const ratio = ((sd / mean) * 100).toFixed(0);
  const cls = ratio > 100 ? 'fail' : ratio > 50 ? 'worse' : ratio > 20 ? '' : 'better';
  return `<td class="num ${cls}">${mean.toFixed(1)} / ${sd.toFixed(1)} / <strong>${ratio}%</strong></td>`;
}
varData.forEach(r => {
  varBody.innerHTML += `<tr>
    <td><strong>${r[0]}</strong></td>
    ${vCell(r[1],r[2])}${vCell(r[3],r[4])}${vCell(r[5],r[6])}${vCell(r[7],r[8])}
  </tr>`;
});

// CPU Load chart
makeBarChart('chartCpuLoad',
  ['GET sm c64', 'HEAD sm c64', 'Soak 1hr', 'PUT sm c64'],
  [ds('rustfs_path', [5.06, 5.49, 2.41, 2.69]),
   ds('rustfs_is',   [4.67, 4.94, 3.41, 2.84]),
   ds('ozone_path',  [23.57, 32.61, 25.94, 1.80]),
   ds('ozone_is',    [21.57, 29.24, 25.51, 2.27])],
  'CPU Load (%)');

// Disk I/O chart
makeBarChart('chartDiskIO',
  ['GET sm c64', 'HEAD sm c64', 'Soak 1hr', 'PUT lg c16'],
  [ds('rustfs_path', [265.1, 8.0, 378.6, 13.5]),
   ds('rustfs_is',   [39.8, 47.5, 354.3, 1.0]),
   ds('ozone_path',  [362.1, 355.6, 66.8, 264.4]),
   ds('ozone_is',    [113.8, 183.5, 18.2, 551.8])],
  'Peak Disk MB/s');

// Network I/O chart
makeBarChart('chartNetIO',
  ['PUT sm c16', 'PUT sm c64', 'PUT med c4', 'PUT lg c16'],
  [ds('rustfs_path', [113.9, 116.1, 113.2, 119.9]),
   ds('rustfs_is',   [114.8, 116.6, 113.5, 118.5]),
   ds('ozone_path',  [114.1, 114.4, 112.8, 121.4]),
   ds('ozone_is',    [114.0, 114.7, 112.8, 118.7])],
  'Network MB/s');

// MB/s throughput
makeBarChart('chartMbps',
  ['PUT small c16', 'PUT medium c4', 'PUT large c16', 'Soak 1hr'],
  [ds('rustfs_path', [111.7, 106.7, 111.7, 111.8]),
   ds('rustfs_is',   [112.0, 106.2, 111.9, 111.7]),
   ds('ozone_path',  [107.0, 84.8, 79.5, 0.9]),
   ds('ozone_is',    [108.7, 87.7, 72.6, 0.7])],
  'MB/s');

// IS wins charts
makeBarChart('chartISListWin',
  ['tiny', 'small', 'medium', 'large', 'xlarge'],
  [{label:'RustFs Path', data:[4.29, 4.29, 4.29, 4.30, 4.30], backgroundColor:'#34d39999', borderColor:'#34d399', borderWidth:2},
   {label:'RustFs InputStream', data:[7.39, 7.37, 7.38, 7.36, 7.37], backgroundColor:'#6ee7b799', borderColor:'#6ee7b7', borderWidth:2}],
  'ops/s');

makeBarChart('chartISDeleteWin',
  ['c1', 'c4', 'c16'],
  [{label:'RustFs Path', data:[45.17, 160.84, 182.88], backgroundColor:'#34d39999', borderColor:'#34d399', borderWidth:2},
   {label:'RustFs InputStream', data:[36.38, 142.45, 278.82], backgroundColor:'#6ee7b799', borderColor:'#6ee7b7', borderWidth:2}],
  'ops/s');

// ── Time-series charts ───────────────────────────────────────────────────

// PUT Small c16 — ops/s first 60s
makeLineChart('chartTsPutOps', ts60,
  [{label:'RustFs Path', data:[33.9,33.5,33.6,34.5,35.8,36.3,35.8,35.6,36.7,36.5,36.5,36.8,36.5,36.7,36.6,36.9,36.9,36.6,37.1,37.0,36.9,36.8,37.1,37.0,36.9,37.0,37.1,37.0,37.0,37.0,37.2,37.1,37.0,37.1,37.1,37.1,37.0,37.2,37.1,37.1,37.0,37.2,37.2,37.1,37.0,37.2,37.1,37.1,37.1,37.2,37.2,37.2,37.2,37.2,37.1,37.2,37.2,37.1,37.2,37.2],
    borderColor:'#34d399', backgroundColor:'transparent', borderWidth:1.5, pointRadius:0, tension:.3},
   {label:'Ozone Path', data:[29.9,32.5,31.7,32.7,33.2,34.3,34.7,34.9,35.2,35.4,35.3,35.8,35.5,35.4,35.8,35.9,35.8,36.1,36.0,35.9,36.0,36.0,36.1,36.2,36.2,36.2,36.3,36.3,36.3,36.1,36.1,36.2,36.1,36.2,35.9,36.0,35.9,36.0,36.0,36.1,36.1,36.1,36.2,36.2,36.2,36.2,36.2,36.2,36.2,36.1,36.2,36.0,36.1,36.1,36.0,36.0,36.1,36.0,36.1,36.1],
    borderColor:'#60a5fa', backgroundColor:'transparent', borderWidth:1.5, pointRadius:0, tension:.3}],
  'ops/s');

// PUT Small c16 — p99 first 60s
makeLineChart('chartTsPutP99', ts60,
  [{label:'RustFs Path p99', data:[471.3,461.9,448.5,632.3,463.2,446.2,439.9,446.2,454.3,448.0,444.9,657.5,436.5,449.6,448.5,439.4,441.2,437.8,679.5,639.6,453.5,466.4,454.8,448.8,442.5,443.3,451.7,442.5,443.0,444.6,444.9,438.0,460.1,437.8,449.6,441.5,460.8,634.4,462.4,449.6,447.7,449.3,449.1,442.2,642.8,446.2,454.8,455.9,641.7,453.2,466.9,443.3,451.2,482.6,631.8,443.8,441.5,434.1,454.6,439.1],
    borderColor:'#34d399', backgroundColor:'transparent', borderWidth:1.5, pointRadius:0, tension:.2},
   {label:'Ozone Path p99', data:[937.9,928.5,1119.9,632.8,950.0,841.0,807.4,766.5,741.9,821.0,883.4,728.8,1076.9,1095.8,931.7,805.8,692.1,700.4,1050.1,903.9,1052.8,1157.6,800.1,723.0,741.3,717.2,817.4,782.2,753.4,939.5,771.8,737.7,763.9,775.9,1030.8,1072.2,794.3,712.5,680.5,846.7,1195.4,769.7,716.2,808.5,760.7,1136.7,997.2,844.1,963.1,910.7,859.8,1047.0,1188.0,820.5,1086.3,1258.3,926.4,757.1,787.5,1223.7],
    borderColor:'#60a5fa', backgroundColor:'transparent', borderWidth:1.5, pointRadius:0, tension:.2}],
  'p99 (ms)');

// Soak ops/s over 1 hour
new Chart(document.getElementById('chartTsSoakOps'), {
  type: 'line',
  data: { labels: soakLabels, datasets: [
    {label:'RustFs Path', data:soakRustOps, borderColor:'#34d399', backgroundColor:'transparent', borderWidth:2, pointRadius:3, tension:.3, yAxisID:'y'},
    {label:'Ozone Path', data:soakOzoneOps, borderColor:'#60a5fa', backgroundColor:'transparent', borderWidth:2, pointRadius:3, tension:.3, yAxisID:'y1'}
  ]},
  options: { responsive:true, maintainAspectRatio:false,
    interaction:{mode:'index',intersect:false},
    scales: {
      y: {type:'linear',position:'left',title:{display:true,text:'RustFs ops/s'},min:170,max:195,grid:{display:false}},
      y1:{type:'linear',position:'right',title:{display:true,text:'Ozone ops/s'},min:1100,max:1300,grid:{drawOnChartArea:false}},
      x:{grid:{display:false}}
    }
  }
});

// Soak p99 over 1 hour
new Chart(document.getElementById('chartTsSoakP99'), {
  type: 'line',
  data: { labels: soakLabels, datasets: [
    {label:'RustFs Path p99', data:soakRustP99, borderColor:'#34d399', backgroundColor:'transparent', borderWidth:2, pointRadius:3, tension:.3, yAxisID:'y'},
    {label:'Ozone Path p99', data:soakOzoneP99, borderColor:'#60a5fa', backgroundColor:'transparent', borderWidth:2, pointRadius:3, tension:.3, yAxisID:'y1'}
  ]},
  options: { responsive:true, maintainAspectRatio:false,
    interaction:{mode:'index',intersect:false},
    scales: {
      y: {type:'linear',position:'left',title:{display:true,text:'RustFs p99 (ms)'},min:350,max:600,grid:{display:false}},
      y1:{type:'linear',position:'right',title:{display:true,text:'Ozone p99 (ms)'},min:20,max:60,grid:{drawOnChartArea:false}},
      x:{grid:{display:false}}
    }
  }
});

// TTFB chart
makeBarChart('chartTtfb',
  ['RustFs c1', 'Ozone c1', 'RustFs c64', 'Ozone c64'],
  [{label:'p50', data:[6.2, 10.3, 53.3, 10.6], backgroundColor:'#34d39999', borderColor:'#34d399', borderWidth:2},
   {label:'p95', data:[7.6, 14.3, 66.2, 17.4], backgroundColor:'#60a5fa99', borderColor:'#60a5fa', borderWidth:2},
   {label:'p99', data:[9.2, 15.6, 73.0, 23.8], backgroundColor:'#a78bfa99', borderColor:'#a78bfa', borderWidth:2}],
  'TTFB (ms)');

// ── I/O Path charts ──────────────────────────────────────────────────────

// GC Overhead PUT scenarios
makeBarChart('chartGcPut',
  ['PUT sm c16', 'PUT sm c64', 'PUT med c4', 'PUT lg c16'],
  [ds('rustfs_path', [0.07, 0.09, 0.06, 0.18]),
   ds('rustfs_is',   [0.21, 0.36, 0.66, 0.28]),
   ds('ozone_path',  [0.03, 0.03, 0.24, 0.16]),
   ds('ozone_is',    [0.11, 0.10, 0.44, 0.37])],
  'GC Overhead %');

// GC Overhead GET/HEAD c64
makeBarChart('chartGcGet',
  ['GET sm c64', 'HEAD sm c64', 'Soak 1hr'],
  [ds('rustfs_path', [0.06, 0.06, 0.14]),
   ds('rustfs_is',   [0.15, 0.13, 0.40]),
   ds('ozone_path',  [0.18, 0.21, 0.44]),
   ds('ozone_is',    [0.13, 0.18, 0.66])],
  'GC Overhead %');

// GC Count
makeBarChart('chartGcCount',
  ['RustFs Path', 'RustFs IS', 'Ozone Path', 'Ozone IS'],
  [{label:'GC Count (PUT small c64, 5min)', data:[117, 702, 55, 182],
    backgroundColor:['#34d39999','#6ee7b799','#60a5fa99','#93c5fd99'],
    borderColor:['#34d399','#6ee7b7','#60a5fa','#93c5fd'], borderWidth:2}],
  'GC events');

// Peak Heap PUT large c16
makeBarChart('chartHeapPut',
  ['RustFs Path', 'RustFs IS', 'Ozone Path', 'Ozone IS'],
  [{label:'Peak Heap MB (PUT large c16)', data:[593, 1776, 488, 2045],
    backgroundColor:['#34d39999','#6ee7b799','#60a5fa99','#93c5fd99'],
    borderColor:['#34d399','#6ee7b7','#60a5fa','#93c5fd'], borderWidth:2}],
  'Peak Heap (MB)');

// Soak GC
makeBarChart('chartSoakGc',
  ['RustFs Path', 'RustFs IS', 'Ozone Path', 'Ozone IS'],
  [{label:'GC Time (ms) over 1 hour', data:[4916, 14280, 15995, 26192],
    backgroundColor:['#34d39999','#6ee7b799','#60a5fa99','#93c5fd99'],
    borderColor:['#34d399','#6ee7b7','#60a5fa','#93c5fd'], borderWidth:2}],
  'GC Time (ms)');

// Soak Heap
makeBarChart('chartSoakHeap',
  ['RustFs Path', 'RustFs IS', 'Ozone Path', 'Ozone IS'],
  [{label:'Peak Heap MB (1hr soak)', data:[390, 1916, 540, 830],
    backgroundColor:['#34d39999','#6ee7b799','#60a5fa99','#93c5fd99'],
    borderColor:['#34d399','#6ee7b7','#60a5fa','#93c5fd'], borderWidth:2}],
  'Peak Heap (MB)');

// I/O Path detail table
const ioBody = document.getElementById('ioPathBody');
let lastScenario = '';
ioRows.forEach(r => {
  const scenClass = r[0] !== lastScenario ? 'style="border-top:2px solid var(--border)"' : '';
  lastScenario = r[0];
  ioBody.innerHTML += `<tr ${scenClass}>
    <td><strong>${r[0]}</strong></td><td>${r[1]}</td>
    <td class="num">${r[2]}</td><td class="num">${r[3]}</td>
    <td class="num">${r[4]}</td><td class="num">${r[5]}</td>
    <td style="font-size:11px">${r[6]}</td>
  </tr>`;
});

const ltbody = document.querySelector('#listTable tbody');
listRows.forEach(r => {
  ltbody.innerHTML += `<tr>
    <td>${r[0]}</td>
    <td class="num worse">${r[1]}</td><td class="num worse">${r[2]}</td>
    <td class="num better">${r[3]}</td><td class="num better">${r[4]}</td>
    <td class="num">${r[5]}</td><td class="num">${r[6]}</td>
  </tr>`;
});