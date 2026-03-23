// ── Data Registry (extensible — add new systems here) ─────────────────────
// To add a new system: add an entry to SYSTEMS and populate DATA with matching keys.
const SYSTEMS = {
  rustfs_path:  { label: 'RustFs (Path)',        color: '#34d399', border: '#34d399' },
  rustfs_is:    { label: 'RustFs (InputStream)',  color: '#6ee7b7', border: '#6ee7b7' },
  ozone_path:   { label: 'Ozone (ofPath)',        color: '#60a5fa', border: '#60a5fa' },
  ozone_is:     { label: 'Ozone (InputStream)',   color: '#93c5fd', border: '#93c5fd' },
  sw_path:      { label: 'SeaweedFS (Path)',      color: '#d4a053', border: '#d4a053' },
  sw_is:        { label: 'SeaweedFS (InputStream)', color: '#c4956a', border: '#c4956a' },
};

// Raw benchmark data keyed by scenario — ALL scenarios from 6 summary.json files
const DATA = {
  // ── LIST tiny ──
  'list-tiny-c1':   { rustfs_path: {ops:3.97, p50:250.7}, rustfs_is: {ops:3.75, p50:267.4}, ozone_path: {ops:23.77, p50:43.2}, ozone_is: {ops:7.85, p50:128.5}, sw_path: {ops:41.54, p50:23.5}, sw_is: {ops:39.40, p50:25.4} },
  'list-tiny-c4':   { rustfs_path: {ops:5.11, p50:785.4}, rustfs_is: {ops:7.13, p50:544.7}, ozone_path: {ops:115.63, p50:33.0}, ozone_is: {ops:35.87, p50:112.8}, sw_path: {ops:158.18, p50:24.6}, sw_is: {ops:155.58, p50:25.0} },
  'list-tiny-c16':  { rustfs_path: {ops:4.29, p50:3722},  rustfs_is: {ops:7.39, p50:2160}, ozone_path: {ops:245.36, p50:64.6}, ozone_is: {ops:138.98, p50:114.8}, sw_path: {ops:261.68, p50:58.9}, sw_is: {ops:299.51, p50:49.6} },
  // ── LIST small ──
  'list-small-c1':  { rustfs_path: {ops:3.91, p50:254.5}, rustfs_is: {ops:3.65, p50:274.2}, ozone_path: {ops:23.55, p50:42.9}, ozone_is: {ops:7.86, p50:128.1}, sw_path: {ops:39.95, p50:24.9}, sw_is: {ops:40.05, p50:24.2} },
  'list-small-c4':  { rustfs_path: {ops:5.12, p50:783.3}, rustfs_is: {ops:6.98, p50:565.2}, ozone_path: {ops:112.35, p50:34.0}, ozone_is: {ops:35.39, p50:113.9}, sw_path: {ops:161.31, p50:24.2}, sw_is: {ops:155.93, p50:24.8} },
  'list-small-c16': { rustfs_path: {ops:4.29, p50:3725},  rustfs_is: {ops:7.37, p50:2229}, ozone_path: {ops:276.63, p50:59.0}, ozone_is: {ops:134.14, p50:119.7}, sw_path: {ops:265.23, p50:58.9}, sw_is: {ops:315.02, p50:48.4} },
  // ── LIST medium ──
  'list-medium-c1': { rustfs_path: {ops:3.90, p50:255.3}, rustfs_is: {ops:3.67, p50:274.5}, ozone_path: {ops:23.64, p50:43.0}, ozone_is: {ops:7.85, p50:128.2}, sw_path: {ops:39.29, p50:25.2}, sw_is: {ops:39.92, p50:24.9} },
  'list-medium-c4': { rustfs_path: {ops:5.14, p50:781.2}, rustfs_is: {ops:7.11, p50:542.6}, ozone_path: {ops:113.05, p50:33.8}, ozone_is: {ops:35.78, p50:113.1}, sw_path: {ops:163.47, p50:24.0}, sw_is: {ops:153.37, p50:25.2} },
  'list-medium-c16':{ rustfs_path: {ops:4.29, p50:3731},  rustfs_is: {ops:7.38, p50:2219}, ozone_path: {ops:245.77, p50:65.2}, ozone_is: {ops:144.95, p50:111.5}, sw_path: {ops:319.88, p50:47.7}, sw_is: {ops:250.59, p50:64.6} },
  // ── LIST large ──
  'list-large-c1':  { rustfs_path: {ops:3.93, p50:253.9}, rustfs_is: {ops:3.65, p50:275.0}, ozone_path: {ops:23.49, p50:42.9}, ozone_is: {ops:7.82, p50:128.5}, sw_path: {ops:40.59, p50:24.0}, sw_is: {ops:40.57, p50:24.1} },
  'list-large-c4':  { rustfs_path: {ops:5.18, p50:774.9}, rustfs_is: {ops:7.03, p50:554.7}, ozone_path: {ops:113.67, p50:33.6}, ozone_is: {ops:35.27, p50:114.2}, sw_path: {ops:161.50, p50:24.2}, sw_is: {ops:157.63, p50:24.8} },
  'list-large-c16': { rustfs_path: {ops:4.30, p50:3727},  rustfs_is: {ops:7.36, p50:2171}, ozone_path: {ops:229.82, p50:70.7}, ozone_is: {ops:120.99, p50:134.2}, sw_path: {ops:327.76, p50:46.6}, sw_is: {ops:263.43, p50:59.3} },
  // ── LIST xlarge ──
  'list-xlarge-c1': { rustfs_path: {ops:3.88, p50:256.5}, rustfs_is: {ops:3.63, p50:275.0}, ozone_path: {ops:23.67, p50:42.9}, ozone_is: {ops:7.83, p50:128.1}, sw_path: {ops:41.41, p50:23.8}, sw_is: {ops:39.48, p50:24.9} },
  'list-xlarge-c4': { rustfs_path: {ops:5.20, p50:772.3}, rustfs_is: {ops:7.02, p50:551.6}, ozone_path: {ops:112.54, p50:33.8}, ozone_is: {ops:35.66, p50:112.9}, sw_path: {ops:158.71, p50:24.8}, sw_is: {ops:159.11, p50:24.5} },
  'list-xlarge-c16':{ rustfs_path: {ops:4.30, p50:3720},  rustfs_is: {ops:7.37, p50:2240}, ozone_path: {ops:263.50, p50:61.3}, ozone_is: {ops:123.13, p50:131.3}, sw_path: {ops:242.14, p50:65.4}, sw_is: {ops:261.16, p50:60.0} },
  // ── PUT small (3MB) ──
  'put-small-c1':   { rustfs_path: {ops:13.23, p99:141.7, sr:1.0}, rustfs_is: {ops:11.99, p99:191.4, sr:1.0}, ozone_path: {ops:11.13, p99:195.4, sr:1.0}, ozone_is: {ops:11.52, p99:234.6, sr:1.0}, sw_path: {ops:10.05, p99:180.6, sr:1.0}, sw_is: {ops:11.32, p99:166.5, sr:1.0} },
  'put-small-c4':   { rustfs_path: {ops:35.22, p99:216.0, sr:1.0}, rustfs_is: {ops:33.40, p99:310.1, sr:1.0}, ozone_path: {ops:26.19, p99:521.7, sr:1.0}, ozone_is: {ops:26.44, p99:537.9, sr:1.0}, sw_path: {ops:27.57, p99:239.7, sr:1.0}, sw_is: {ops:26.86, p99:242.9, sr:1.0} },
  'put-small-c16':  { rustfs_path: {ops:37.23, p99:494.9, sr:1.0}, rustfs_is: {ops:37.32, p99:660.1, sr:1.0}, ozone_path: {ops:35.67, p99:1162.9, sr:1.0}, ozone_is: {ops:36.24, p99:1133.5, sr:1.0}, sw_path: {ops:31.13, p99:684.2, sr:1.0}, sw_is: {ops:31.34, p99:693.6, sr:1.0} },
  'put-small-c64':  { rustfs_path: {ops:37.22, p99:3166.7, sr:1.0}, rustfs_is: {ops:37.34, p99:3164.6, sr:1.0}, ozone_path: {ops:37.26, p99:5976.9, sr:1.0}, ozone_is: {ops:37.28, p99:4852.8, sr:1.0}, sw_path: {ops:37.31, p99:3275.8, sr:1.0}, sw_is: {ops:37.11, p99:3206.6, sr:1.0} },
  // ── PUT medium (10MB) ──
  'put-medium-c1':  { rustfs_path: {ops:4.38, p50:213.0, sr:1.0}, rustfs_is: {ops:4.94, p50:186.4, sr:1.0}, ozone_path: {ops:4.50, p50:176.7, sr:1.0}, ozone_is: {ops:4.44, p50:188.2, sr:1.0}, sw_path: {ops:5.63, p50:155.5, sr:1.0}, sw_is: {ops:5.70, p50:156.2, sr:1.0} },
  'put-medium-c4':  { rustfs_path: {ops:10.67, p50:350.0, sr:1.0}, rustfs_is: {ops:10.62, p50:365.4, sr:1.0}, ozone_path: {ops:9.27, p50:390.9, sr:0.915}, ozone_is: {ops:9.51, p50:384.0, sr:0.923}, sw_path: {ops:10.06, p50:397.7, sr:1.0}, sw_is: {ops:10.12, p50:396.9, sr:1.0} },
  'put-medium-c16': { rustfs_path: {ops:11.17, p50:1419.8, sr:1.0}, rustfs_is: {ops:11.19, p50:1418.7, sr:1.0}, ozone_path: {ops:11.11, p50:1344.3, sr:0.938}, ozone_is: {ops:11.16, p50:1337.0, sr:0.931}, sw_path: {ops:10.90, p50:1461.7, sr:1.0}, sw_is: {ops:11.04, p50:1437.6, sr:1.0} },
  // ── PUT large (64MB) ──
  'put-large-c1':   { rustfs_path: {ops:1.54, sr:1.0}, rustfs_is: {ops:1.52, sr:1.0}, ozone_path: {ops:1.17, sr:1.0}, ozone_is: {ops:1.10, sr:1.0}, sw_path: {ops:1.51, sr:1.0}, sw_is: {ops:1.51, sr:1.0} },
  'put-large-c4':   { rustfs_path: {ops:1.69, sr:1.0}, rustfs_is: {ops:1.75, sr:1.0}, ozone_path: {ops:1.71, sr:0.983}, ozone_is: {ops:1.70, sr:0.981}, sw_path: {ops:1.68, sr:1.0}, sw_is: {ops:1.72, sr:1.0} },
  'put-large-c16':  { rustfs_path: {ops:1.75, sr:1.0}, rustfs_is: {ops:1.75, sr:1.0}, ozone_path: {ops:1.74, sr:0.712}, ozone_is: {ops:1.71, sr:0.665}, sw_path: {ops:1.75, sr:1.0}, sw_is: {ops:1.73, sr:1.0} },
  // ── GET small (3MB) ──
  'get-small-c1':   { rustfs_path: {ops:156.48, p50:6.07}, rustfs_is: {ops:117.92, p50:7.59}, ozone_path: {ops:92.75, p50:10.23}, ozone_is: {ops:75.23, p50:12.26}, sw_path: {ops:216.63, p50:4.35}, sw_is: {ops:1.26, p50:4.79} },
  'get-small-c4':   { rustfs_path: {ops:685.70, p50:5.53}, rustfs_is: {ops:518.55, p50:7.09}, ozone_path: {ops:527.55, p50:7.53}, ozone_is: {ops:422.95, p50:9.29}, sw_path: {ops:1319.88, p50:3.01}, sw_is: {ops:5.07, p50:3.85} },
  'get-small-c16':  { rustfs_path: {ops:1206.82, p50:12.80}, rustfs_is: {ops:1205.64, p50:12.02}, ozone_path: {ops:2192.74, p50:7.13}, ozone_is: {ops:1754.63, p50:8.81}, sw_path: {ops:5745.50, p50:2.75}, sw_is: {ops:20.14, p50:3.20} },
  'get-small-c64':  { rustfs_path: {ops:1196.80, p50:52.92}, rustfs_is: {ops:1271.53, p50:14.94}, ozone_path: {ops:5914.80, p50:10.14}, ozone_is: {ops:5229.65, p50:11.22}, sw_path: {ops:20203.07, p50:3.02}, sw_is: {ops:80.42, p50:2.78} },
  // ── GET medium (10MB) ──
  'get-medium-c1':  { rustfs_path: {ops:203.53, p50:4.78}, rustfs_is: {ops:124.67, p50:7.01}, ozone_path: {ops:91.67, p50:10.37}, ozone_is: {ops:75.95, p50:12.21}, sw_path: {ops:252.84, p50:3.75}, sw_is: {ops:1.26, p50:4.57} },
  'get-medium-c4':  { rustfs_path: {ops:688.73, p50:5.39}, rustfs_is: {ops:503.81, p50:6.99}, ozone_path: {ops:512.48, p50:7.65}, ozone_is: {ops:426.45, p50:9.27}, sw_path: {ops:1451.76, p50:2.74}, sw_is: {ops:5.07, p50:3.63} },
  'get-medium-c16': { rustfs_path: {ops:1178.91, p50:13.00}, rustfs_is: {ops:1190.88, p50:11.62}, ozone_path: {ops:2124.46, p50:7.25}, ozone_is: {ops:1772.86, p50:8.81}, sw_path: {ops:5940.66, p50:2.69}, sw_is: {ops:20.14, p50:3.22} },
  // ── GET large (64MB) ──
  'get-large-c1':   { rustfs_path: {ops:171.74, p50:5.49}, rustfs_is: {ops:122.60, p50:7.56}, ozone_path: {ops:91.12, p50:10.35}, ozone_is: {ops:71.59, p50:12.80}, sw_path: {ops:244.63, p50:3.92}, sw_is: {ops:1.26, p50:4.26} },
  'get-large-c4':   { rustfs_path: {ops:681.00, p50:5.62}, rustfs_is: {ops:505.11, p50:7.03}, ozone_path: {ops:511.24, p50:7.61}, ozone_is: {ops:461.60, p50:8.39}, sw_path: {ops:1457.47, p50:2.75}, sw_is: {ops:5.07, p50:3.62} },
  'get-large-c16':  { rustfs_path: {ops:1181.34, p50:13.03}, rustfs_is: {ops:1227.56, p50:11.83}, ozone_path: {ops:2107.06, p50:7.22}, ozone_is: {ops:1952.06, p50:7.87}, sw_path: {ops:5803.60, p50:2.72}, sw_is: {ops:20.15, p50:3.22} },
  // ── HEAD small ──
  'head-small-c1':  { rustfs_path: {ops:188.90, p50:4.91}, rustfs_is: {ops:134.97, p50:6.43}, ozone_path: {ops:333.20, p50:2.94}, ozone_is: {ops:218.68, p50:4.53}, sw_path: {ops:328.26, p50:2.83}, sw_is: {ops:404.75, p50:2.44} },
  'head-small-c4':  { rustfs_path: {ops:857.63, p50:4.40}, rustfs_is: {ops:558.97, p50:5.87}, ozone_path: {ops:1598.94, p50:2.46}, ozone_is: {ops:1192.62, p50:3.30}, sw_path: {ops:1722.83, p50:2.38}, sw_is: {ops:1978.65, p50:1.88} },
  'head-small-c16': { rustfs_path: {ops:1589.90, p50:9.73}, rustfs_is: {ops:1436.42, p50:9.48}, ozone_path: {ops:6423.79, p50:2.35}, ozone_is: {ops:4626.49, p50:3.24}, sw_path: {ops:7294.25, p50:2.30}, sw_is: {ops:7208.59, p50:2.24} },
  'head-small-c64': { rustfs_path: {ops:1584.78, p50:39.29}, rustfs_is: {ops:1561.03, p50:11.15}, ozone_path: {ops:10188.08, p50:5.88}, ozone_is: {ops:9093.30, p50:6.44}, sw_path: {ops:24353.41, p50:2.55}, sw_is: {ops:24002.93, p50:2.51} },
  // ── DELETE small ──
  'delete-small-c1':  { rustfs_path: {ops:45.17, p50:10.27}, rustfs_is: {ops:36.38, p50:12.88}, ozone_path: {ops:29.26, p50:8.93}, ozone_is: {ops:22.59, p50:11.90}, sw_path: {ops:30.55, p50:5.38}, sw_is: {ops:33.23, p50:4.83} },
  'delete-small-c4':  { rustfs_path: {ops:160.84, p50:12.32}, rustfs_is: {ops:142.45, p50:13.80}, ozone_path: {ops:173.99, p50:4.82}, ozone_is: {ops:129.91, p50:6.87}, sw_path: {ops:139.48, p50:4.16}, sw_is: {ops:153.32, p50:3.50} },
  'delete-small-c16': { rustfs_path: {ops:182.88, p50:63.34}, rustfs_is: {ops:278.82, p50:35.85}, ozone_path: {ops:555.89, p50:4.70}, ozone_is: {ops:464.66, p50:6.56}, sw_path: {ops:619.82, p50:2.83}, sw_is: {ops:643.05, p50:2.62} },
  // ── Cold Read ──
  'cold-read-small-c1':  { rustfs_path: {ops:0.20, sr:0.441}, rustfs_is: {ops:0.19, sr:1.0},  ozone_path: {ops:0.14, sr:1.0},  ozone_is: {ops:0.01, sr:0.0}, sw_path: {ops:0.19, sr:1.0}, sw_is: {ops:0.19, sr:1.0} },
  'cold-read-small-c4':  { rustfs_path: {ops:0.77, sr:0.936}, rustfs_is: {ops:0.78, sr:1.0},  ozone_path: {ops:0.35, sr:0.991}, ozone_is: {ops:0.04, sr:0.083}, sw_path: {ops:0.76, sr:1.0}, sw_is: {ops:0.76, sr:1.0} },
  'cold-read-medium-c1': { rustfs_path: {ops:0.19, sr:0.414}, rustfs_is: {ops:0.19, sr:1.0},  ozone_path: {ops:0.01, sr:0.5},   ozone_is: {ops:0.01, sr:0.0}, sw_path: {ops:0.19, sr:1.0}, sw_is: {ops:0.19, sr:1.0} },
  'cold-read-medium-c4': { rustfs_path: {ops:0.72, sr:0.982}, rustfs_is: {ops:0.74, sr:1.0},  ozone_path: {ops:0.12, sr:0.632}, ozone_is: {ops:0.02, sr:0.0}, sw_path: {ops:0.75, sr:1.0}, sw_is: {ops:0.75, sr:1.0} },
  // ── Consistency ──
  'raw-c1':  { rustfs_path: {sr:1.0, ops:8.90},  rustfs_is: {sr:1.0, ops:6.50},  ozone_path: {sr:0.0, ops:0.02},  ozone_is: {sr:0.0, ops:0.01}, sw_path: {sr:0.0, ops:8.39}, sw_is: {sr:0.0, ops:7.84} },
  'raw-c4':  { rustfs_path: {sr:1.0, ops:19.77}, rustfs_is: {sr:1.0, ops:19.90}, ozone_path: {sr:0.0, ops:0.04},  ozone_is: {sr:0.0, ops:0.04}, sw_path: {sr:0.0, ops:20.18}, sw_is: {sr:0.0, ops:18.91} },
  'raw-c16': { rustfs_path: {sr:1.0, ops:27.89}, rustfs_is: {sr:1.0, ops:33.29}, ozone_path: {sr:0.0, ops:0.11},  ozone_is: {sr:0.0, ops:0.12}, sw_path: {sr:0.0, ops:28.70}, sw_is: {sr:0.0, ops:28.42} },
  'ow-c16':  { rustfs_path: {sr:0.929}, rustfs_is: {sr:0.900}, ozone_path: {sr:0.0}, ozone_is: {sr:0.0}, sw_path: {sr:1.0}, sw_is: {sr:1.0} },
  'ow-c64':  { rustfs_path: {sr:0.697}, rustfs_is: {sr:0.838}, ozone_path: {sr:0.011}, ozone_is: {sr:0.0}, sw_path: {sr:1.0}, sw_is: {sr:1.0} },
  // ── Mixed ──
  'mixed-rh-c16': { rustfs_path: {ops:185.30}, rustfs_is: {ops:186.14}, ozone_path: {ops:183.08}, ozone_is: {ops:183.84}, sw_path: {ops:170.26}, sw_is: {ops:27.38} },
  'mixed-rh-c64': { rustfs_path: {ops:187.64}, rustfs_is: {ops:188.86}, ozone_path: {ops:183.31}, ozone_is: {ops:184.85}, sw_path: {ops:183.36}, sw_is: {ops:106.55} },
  'mixed-wh-c16': { rustfs_path: {ops:52.84}, rustfs_is: {ops:53.06}, ozone_path: {ops:52.13}, ozone_is: {ops:52.58}, sw_path: {ops:46.39}, sw_is: {ops:46.49} },
  'mixed-wh-c64': { rustfs_path: {ops:53.21}, rustfs_is: {ops:53.46}, ozone_path: {ops:53.04}, ozone_is: {ops:42.35}, sw_path: {ops:53.74}, sw_is: {ops:51.15} },
  // ── Burst ──
  'burst-c64': { rustfs_path: {ops:36.98}, rustfs_is: {ops:37.23}, ozone_path: {ops:7.06}, ozone_is: {ops:0.0}, sw_path: {ops:36.15}, sw_is: {ops:37.03} },
  // ── Soak ──
  'soak-c16': { rustfs_path: {ops:186.39, sr:1.0, total:671037}, rustfs_is: {ops:184.92, sr:1.0, total:665745}, ozone_path: {ops:1225.99, sr:0.800, total:4413600}, ozone_is: {ops:990.99, sr:0.800, total:3959019}, sw_path: {ops:160.26, sr:1.0, total:576986}, sw_is: {ops:27.66, sr:0.958, total:99927} },
};

// ── Summary table data ─────────────────────────────────────────────────────
// [tab_id, name, rustfs_path, rustfs_is, ozone_path, ozone_is, sw_path, sw_is, winner, speedup]
const summaryRows = [
  // LIST
  ['l', 'LIST tiny c1', 3.97, 3.75, 23.77, 7.85, 41.54, 39.40, 'SeaweedFS', '10x'],
  ['l', 'LIST tiny c4', 5.11, 7.13, 115.63, 35.87, 158.18, 155.58, 'SeaweedFS', '31x'],
  ['l', 'LIST tiny c16', 4.29, 7.39, 245.36, 138.98, 261.68, 299.51, 'SeaweedFS IS', '70x'],
  ['l', 'LIST small c16', 4.29, 7.37, 276.63, 134.14, 265.23, 315.02, 'SeaweedFS IS', '73x'],
  ['l', 'LIST medium c16', 4.29, 7.38, 245.77, 144.95, 319.88, 250.59, 'SW Path', '75x'],
  ['l', 'LIST large c16', 4.30, 7.36, 229.82, 120.99, 327.76, 263.43, 'SW Path', '76x'],
  ['l', 'LIST xlarge c16', 4.30, 7.37, 263.50, 123.13, 242.14, 261.16, 'Ozone', '61x'],
  // PUT
  ['p', 'PUT small c1', 13.23, 11.99, 11.13, 11.52, 10.05, 11.32, 'RustFs', '1.32x'],
  ['p', 'PUT small c4', 35.22, 33.40, 26.19, 26.44, 27.57, 26.86, 'RustFs', '1.35x'],
  ['p', 'PUT small c16', 37.23, 37.32, 35.67, 36.24, 31.13, 31.34, 'RustFs', '1.20x'],
  ['p', 'PUT small c64', 37.22, 37.34, 37.26, 37.28, 37.31, 37.11, 'Tie', '~1x'],
  ['p', 'PUT medium c1', 4.38, 4.94, 4.50, 4.44, 5.63, 5.70, 'SW IS', '1.30x'],
  ['p', 'PUT medium c4 ⚠', '10.67 (100%)', '10.62 (100%)', '9.27 (92%)', '9.51 (92%)', '10.06 (100%)', '10.12 (100%)', 'RustFs', '1.15x'],
  ['p', 'PUT medium c16 ⚠', '11.17 (100%)', '11.19 (100%)', '11.11 (94%)', '11.16 (93%)', '10.90 (100%)', '11.04 (100%)', 'Tie', '~1x'],
  ['p', 'PUT large c1', 1.54, 1.52, 1.17, 1.10, 1.51, 1.51, 'RustFs', '1.32x'],
  ['p', 'PUT large c4 ⚠', '1.69 (100%)', '1.75 (100%)', '1.71 (98%)', '1.70 (98%)', '1.68 (100%)', '1.72 (100%)', 'Tie', '~1x'],
  ['p', 'PUT large c16 ⚠', '1.75 (100%)', '1.75 (100%)', '1.74 (71%)', '1.71 (67%)', '1.75 (100%)', '1.73 (100%)', 'RustFs/SW', 'SR: ∞'],
  // GET
  ['g', 'GET small c1', 156.48, 117.92, 92.75, 75.23, 216.63, 1.26, 'SW Path', '1.38x'],
  ['g', 'GET small c4', 685.70, 518.55, 527.55, 422.95, 1319.88, 5.07, 'SW Path', '1.93x'],
  ['g', 'GET small c16', 1206.82, 1205.64, 2192.74, 1754.63, 5745.50, 20.14, 'SW Path', '2.62x'],
  ['g', 'GET small c64', 1196.80, 1271.53, 5914.80, 5229.65, 20203.07, 80.42, 'SW Path', '3.42x'],
  ['g', 'GET medium c1', 203.53, 124.67, 91.67, 75.95, 252.84, 1.26, 'SW Path', '1.24x'],
  ['g', 'GET medium c4', 688.73, 503.81, 512.48, 426.45, 1451.76, 5.07, 'SW Path', '2.11x'],
  ['g', 'GET medium c16', 1178.91, 1190.88, 2124.46, 1772.86, 5940.66, 20.14, 'SW Path', '2.80x'],
  ['g', 'GET large c1', 171.74, 122.60, 91.12, 71.59, 244.63, 1.26, 'SW Path', '1.42x'],
  ['g', 'GET large c4', 681.00, 505.11, 511.24, 461.60, 1457.47, 5.07, 'SW Path', '2.14x'],
  ['g', 'GET large c16', 1181.34, 1227.56, 2107.06, 1952.06, 5803.60, 20.15, 'SW Path', '2.75x'],
  // HEAD
  ['h', 'HEAD small c1', 188.90, 134.97, 333.20, 218.68, 328.26, 404.75, 'SW IS', '2.14x'],
  ['h', 'HEAD small c4', 857.63, 558.97, 1598.94, 1192.62, 1722.83, 1978.65, 'SW IS', '2.31x'],
  ['h', 'HEAD small c16', 1589.90, 1436.42, 6423.79, 4626.49, 7294.25, 7208.59, 'SW Path', '4.59x'],
  ['h', 'HEAD small c64', 1584.78, 1561.03, 10188.08, 9093.30, 24353.41, 24002.93, 'SW Path', '2.39x'],
  // DELETE
  ['d', 'DELETE small c1', 45.17, 36.38, 29.26, 22.59, 30.55, 33.23, 'RustFs', '1.54x'],
  ['d', 'DELETE small c4', 160.84, 142.45, 173.99, 129.91, 139.48, 153.32, 'Ozone', '1.08x'],
  ['d', 'DELETE small c16', 182.88, 278.82, 555.89, 464.66, 619.82, 643.05, 'SW IS', '1.16x'],
  // Consistency
  ['c', 'Read-After-Write c1', 8.90, 6.50, 0.02, 0.01, '0% (8.39)', '0% (7.84)', 'RustFs', '∞'],
  ['c', 'Read-After-Write c4', 19.77, 19.90, 0.04, 0.04, '0% (20.18)', '0% (18.91)', 'RustFs', '∞'],
  ['c', 'Read-After-Write c16', 27.89, 33.29, 0.11, 0.12, '0% (28.70)', '0% (28.42)', 'RustFs', '∞'],
  ['c', 'Overwrite Storm c16', '93%', '90%', '0%', '0%', '100%', '100%', 'SeaweedFS', '∞'],
  ['c', 'Overwrite Storm c64', '70%', '84%', '1%', '0%', '100%', '100%', 'SeaweedFS', '∞'],
  // Mixed / Soak / Burst
  ['m', 'Mixed Read-Heavy c16', 185.30, 186.14, 183.08, 183.84, 170.26, '27.38 ⚠', 'RustFs', '1.02x'],
  ['m', 'Mixed Read-Heavy c64', 187.64, 188.86, 183.31, 184.85, 183.36, '106.55 ⚠', 'RustFs', '1.02x'],
  ['m', 'Mixed Write-Heavy c16', 52.84, 53.06, 52.13, 52.58, 46.39, 46.49, 'RustFs', '1.14x'],
  ['m', 'Mixed Write-Heavy c64', 53.21, 53.46, 53.04, 42.35, 53.74, 51.15, 'SW Path', '1.01x'],
  ['m', 'Burst c64 (30s)', 36.98, 37.23, 7.06, 0.00, 36.15, 37.03, 'RustFs', '5.2x'],
  ['m', 'Soak Test (1hr)', '186 (100%)', '185 (100%)', '1226 (80%)', '991 (80%)', '160 (100%)', '28 (96%)', 'Mixed', '—'],
];

// ── LIST detail table data ─────────────────────────────────────────────────
// [scenario, rustfs_path, rustfs_is, ozone_path, ozone_is, sw_path, sw_is, latency_rustfs, latency_ozone, latency_sw]
const listRows = [
  ['list-tiny-c1', 3.97, 3.75, 23.77, 7.85, 41.54, 39.40, '250.7 / 267.4', '43.2 / 128.5', '23.5 / 25.4'],
  ['list-tiny-c4', 5.11, 7.13, 115.63, 35.87, 158.18, 155.58, '785.4 / 544.7', '33.0 / 112.8', '24.6 / 25.0'],
  ['list-tiny-c16', 4.29, 7.39, 245.36, 138.98, 261.68, 299.51, '3722 / 2160', '64.6 / 114.8', '58.9 / 49.6'],
  ['list-small-c1', 3.91, 3.65, 23.55, 7.86, 39.95, 40.05, '254.5 / 274.2', '42.9 / 128.1', '24.9 / 24.2'],
  ['list-small-c4', 5.12, 6.98, 112.35, 35.39, 161.31, 155.93, '783.3 / 565.2', '34.0 / 113.9', '24.2 / 24.8'],
  ['list-small-c16', 4.29, 7.37, 276.63, 134.14, 265.23, 315.02, '3725 / 2229', '59.0 / 119.7', '58.9 / 48.4'],
  ['list-medium-c1', 3.90, 3.67, 23.64, 7.85, 39.29, 39.92, '255.3 / 274.5', '43.0 / 128.2', '25.2 / 24.9'],
  ['list-medium-c4', 5.14, 7.11, 113.05, 35.78, 163.47, 153.37, '781.2 / 542.6', '33.8 / 113.1', '24.0 / 25.2'],
  ['list-medium-c16', 4.29, 7.38, 245.77, 144.95, 319.88, 250.59, '3731 / 2219', '65.2 / 111.5', '47.7 / 64.6'],
  ['list-large-c1', 3.93, 3.65, 23.49, 7.82, 40.59, 40.57, '253.9 / 275.0', '42.9 / 128.5', '24.0 / 24.1'],
  ['list-large-c4', 5.18, 7.03, 113.67, 35.27, 161.50, 157.63, '774.9 / 554.7', '33.6 / 114.2', '24.2 / 24.8'],
  ['list-large-c16', 4.30, 7.36, 229.82, 120.99, 327.76, 263.43, '3727 / 2171', '70.7 / 134.2', '46.6 / 59.3'],
  ['list-xlarge-c1', 3.88, 3.63, 23.67, 7.83, 41.41, 39.48, '256.5 / 275.0', '42.9 / 128.1', '23.8 / 24.9'],
  ['list-xlarge-c4', 5.20, 7.02, 112.54, 35.66, 158.71, 159.11, '772.3 / 551.6', '33.8 / 112.9', '24.8 / 24.5'],
  ['list-xlarge-c16', 4.30, 7.37, 263.50, 123.13, 242.14, 261.16, '3720 / 2240', '61.3 / 131.3', '65.4 / 60.0'],
];

// ── Latency percentile labels ──────────────────────────────────────────────
const pctLabels = ['p50', 'p75', 'p90', 'p95', 'p99'];

// ── Variance / consistency data ────────────────────────────────────────────
// [scenario, rustfs_path_mean, rustfs_path_sd, rustfs_is_mean, rustfs_is_sd, ozone_path_mean, ozone_path_sd, ozone_is_mean, ozone_is_sd, sw_path_mean, sw_path_sd, sw_is_mean, sw_is_sd]
const varData = [
  ['PUT small c16', 429.6, 23.0, 428.6, 54.6, 444.9, 225.3, 441.3, 207.4, 513.9, 56.2, 510.5, 58.3],
  ['PUT small c64', 1717.6, 241.6, 1712.5, 345.2, 1713.8, 1245.8, 1712.4, 1040.8, 1714.9, 336.7, 1723.5, 320.1],
  ['PUT medium c4', 374.6, 95.9, 376.6, 85.4, 431.2, 215.9, 420.5, 197.8, 397.6, 88.7, 395.2, 73.2],
  ['PUT large c16', 9150.2, 2535.0, 9138.5, 2446.7, 9129.8, 2982.7, 9263.3, 2974.4, 9111.6, 2661.1, 9206.7, 64.3],
  ['GET small c16', 13.3, 7.8, 13.3, 25.3, 7.3, 1.9, 9.1, 2.2, 2.8, 0.3, 793.2, 3966.2],
  ['GET small c64', 53.5, 10.1, 49.3, 549.6, 10.8, 3.5, 12.2, 3.7, 3.2, 0.8, 794.2, 3965.8],
  ['HEAD small c64', 40.4, 76.9, 39.8, 478.3, 6.3, 2.0, 7.0, 2.3, 2.6, 0.5, 2.7, 0.8],
  ['DELETE small c16', 67.3, 30.7, 36.5, 28.4, 5.8, 4.3, 7.7, 4.3, 2.9, 0.4, 2.8, 0.4],
  ['Soak 1hr', 85.8, 153.9, 86.5, 146.7, 12.8, 6.4, 15.8, 711.1, 99.8, 161.3, 577.4, 3886.4],
  ['Mixed RH c64', 340.6, 691.1, 338.4, 665.6, 348.3, 885.1, 345.5, 910.7, 348.8, 683.4, 587.0, 3834.9],
];

// ── Soak test time-series data ─────────────────────────────────────────────
const soakLabels = ['0m','5m','10m','15m','20m','25m','30m','35m','40m','45m','50m','55m','60m'];
const soakRustOps = [177.2,187.0,186.8,187.0,187.3,187.2,187.3,187.1,187.2,187.4,187.0,186.7,186.4];
const soakOzoneOps = [1150.9,1259.0,1257.2,1254.3,1256.7,1257.2,1256.5,1254.7,1251.5,1246.7,1241.7,1238.5,1226.0];
const soakSwOps = [148.0,160.0,161.0,160.5,160.0,159.8,160.0,160.3,160.2,160.0,159.5,160.0,160.3];
const soakRustP99 = [471.6,430.2,559.4,402.1,433.6,418.4,429.4,405.0,433.1,438.6,407.1,409.5,417.1];
const soakOzoneP99 = [38.4,32.0,37.6,26.9,28.9,32.9,32.7,31.0,37.6,44.4,41.9,46.0,36.2];
const soakSwP99 = [590.0,584.0,582.0,585.0,583.0,584.0,584.0,583.0,584.0,585.0,584.0,583.0,584.1];

// ── Time-series x-axis (60 seconds) ───────────────────────────────────────
const ts60 = Array.from({length:60}, (_,i) => i+1);

// ── I/O Path detail table data ─────────────────────────────────────────────
// [scenario, metric, rustfs_path, rustfs_is, ozone_path, ozone_is, sw_path, sw_is, winner_note]
const ioRows = [
  ['PUT small c16', 'ops/s', 37.23, 37.32, 35.67, 36.24, 31.13, 31.34, 'RustFs best'],
  ['PUT small c16', 'GC overhead %', '0.07', '0.21', '0.03', '0.11', '0.03', '0.11', 'Ozone/SW Path lowest'],
  ['PUT small c16', 'GC count', 116, 435, 52, 214, 42, 175, 'SW Path fewest'],
  ['PUT small c16', 'p99 (ms)', 494.9, 660.1, 1162.9, 1133.5, 684.2, 693.6, 'RustFs Path tightest'],
  ['PUT small c64', 'ops/s', 37.22, 37.34, 37.26, 37.28, 37.31, 37.11, 'Tie (network bound)'],
  ['PUT small c64', 'GC overhead %', '0.09', '0.36', '0.03', '0.10', '0.04', '0.08', 'Ozone/SW Path lowest'],
  ['PUT small c64', 'Peak heap MB', 575, 1025, 1188, 1214, 1070, 1583, 'RustFs Path lowest'],
  ['PUT small c64', 'stdDev (ms)', 241.6, 345.2, 1245.8, 1040.8, 336.7, 320.1, 'RustFs Path least jitter'],
  ['PUT medium c4', 'GC overhead %', '0.06', '0.66', '0.24', '0.44', '0.03', '0.22', 'SW Path 2x less'],
  ['PUT medium c4', 'GC time (ms)', 170, 1969, 708, 1309, 84, 650, 'SW Path fewest'],
  ['PUT large c16', 'Peak heap MB', 593, 1776, 488, 2045, 708, 2747, 'Ozone Path lowest'],
  ['PUT large c16', 'GC overhead %', '0.18', '0.28', '0.16', '0.37', '0.08', '0.27', 'SW Path lowest'],
  ['GET small c64', 'ops/s', 1197, 1272, 5915, 5230, 20203, 80, 'SW Path 3.4x best'],
  ['GET small c64', 'GC overhead %', '0.06', '0.15', '0.18', '0.13', '0.29', '0.01', 'SW IS lowest'],
  ['GET small c64', 'p50 (ms)', 52.9, 14.9, 10.1, 11.2, 3.0, 2.8, 'SW lowest latency'],
  ['HEAD small c64', 'ops/s', 1585, 1561, 10188, 9093, 24353, 24003, 'SW Path 2.4x best'],
  ['HEAD small c64', 'GC count', 101, 377, 314, 166, 430, 446, 'RustFs Path fewest'],
  ['Soak 1hr', 'ops/s', 186, 185, 1226, 991, 160, 28, 'Ozone Path highest*'],
  ['Soak 1hr', 'GC overhead %', '0.14', '0.40', '0.44', '0.66', '0.03', '0.03', 'SW lowest'],
  ['Soak 1hr', 'GC time (ms)', '4,916', '14,280', '15,995', '26,192', '81,733', '90,931', 'RustFs Path best'],
  ['Soak 1hr', 'Peak heap MB', 390, 1916, 540, 830, 2815, 3204, 'RustFs Path best'],
];
