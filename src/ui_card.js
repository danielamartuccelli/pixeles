/* ===========================================================
   ui_card.js — TARJETA DE JUGADOR (estilo Club Penguin): el avatar de pie sobre un fondo elegido.
   Se abre tocando el nombre en la esquina de arriba a la izquierda (tuyo o de tu pareja). El fondo se elige en el
   clóset > Tarjeta y viaja dentro del look (look.cardBg), así tu pareja lo ve en tu tarjeta.
   Los fondos se dibujan por código (80x96 px, sin imágenes) y se amplían sin suavizar.
   =========================================================== */
(function () {
  const G = window.G, CW = 80, CH = 96;
  G.CARD_BGS = [['none', 'Sin fondo'], ['montana', '⛰ Montaña verde'], ['shimaya', '🏮 Shimaya (restaurante oriental)'], ['aire', '💨 Aire'], ['fuego', '🔥 Fuego'], ['agua', '💧 Agua'], ['tierra', '🪨 Tierra'],
    ['malecon', '🇨🇺 Cuba: el Malecón'], ['cubaplaya', '🏝 Cuba: la playa'], ['tambo', '🥭 Tambogrande: bosque seco'], ['chimbote', '👷 Chimbote y obreros'], ['estrellas', '⭐ Rojo con estrellas'], ['duo', '💜 Los dos, uno al lado del otro']];

  const R = (c, col, x, y, w, h) => { c.fillStyle = col; c.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); };
  const bands = (c, cols, y0, y1) => { const h = (y1 - y0) / cols.length; cols.forEach((col, i) => R(c, col, 0, y0 + i * h, CW, h + 1)); };
  const poly = (c, col, pts) => { c.fillStyle = col; c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill(); };
  const ell = (c, col, x, y, rx, ry) => { c.fillStyle = col; c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, 7); c.fill(); };
  const star = (c, col, x, y, r) => { poly(c, col, Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.42 : r; return [x + Math.cos(a) * rr, y + Math.sin(a) * rr]; })); };
  const cloud = (c, x, y, col) => { ell(c, col || '#fff', x, y, 8, 3); ell(c, col || '#fff', x + 5, y - 2, 5, 3); ell(c, col || '#fff', x - 5, y - 1, 4, 2.5); };
  const pine = (c, x, y, h, col) => { for (let i = 0; i < 3; i++) poly(c, col, [[x, y - h + i * h / 4], [x - 4 + i * -0.6, y - h * 0.35 + i * h / 4], [x + 4 + i * 0.6, y - h * 0.35 + i * h / 4]]); R(c, '#5a3b24', x - 1, y - 3, 2, 4); };
  const palm = (c, x, y, lean) => { for (let i = 0; i < 14; i++) R(c, i % 4 < 2 ? '#7a5230' : '#5a3b24', x + lean * i / 14 * 6, y - i * 2, 2, 2); const tx = x + lean * 6, ty = y - 28; [[-9, 3], [-6, -2], [0, -4], [6, -2], [9, 3], [-4, 4], [4, 4]].forEach(([dx, dy]) => { poly(c, '#2f9a4a', [[tx, ty], [tx + dx * 0.6, ty + dy - 3], [tx + dx, ty + dy + 1]]); }); R(c, '#6b4a2a', tx - 1, ty, 3, 3); };
  const worker = (c, x, y, helm, vest, skin) => { R(c, '#2b1b30', x - 1, y - 4, 2, 4); R(c, '#2b1b30', x + 2, y - 4, 2, 4); R(c, '#3d4a63', x - 1, y - 11, 5, 8); R(c, vest, x - 2, y - 19, 7, 9); R(c, '#e6e9f2', x - 2, y - 15, 7, 1); R(c, '#e6e9f2', x - 2, y - 12, 7, 1); R(c, skin, x - 4, y - 18, 2, 6); R(c, skin, x + 5, y - 18, 2, 6); R(c, skin, x - 0.5, y - 24, 4, 5); R(c, helm, x - 1.5, y - 27, 6, 3); R(c, helm, x - 2.5, y - 25, 8, 1); };
  const car = (c, x, y, body) => { R(c, body, x, y - 6, 22, 5); R(c, body, x + 5, y - 10, 11, 4); R(c, '#cfe9ff', x + 6, y - 9, 4, 3); R(c, '#cfe9ff', x + 11, y - 9, 4, 3); R(c, '#fff', x, y - 4, 22, 1); R(c, '#2b1b30', x + 3, y - 2, 4, 3); R(c, '#2b1b30', x + 15, y - 2, 4, 3); R(c, '#e6e9f2', x + 4, y - 1, 2, 1); R(c, '#e6e9f2', x + 16, y - 1, 2, 1); };

  const BG = {
    none(c) { bands(c, ['#ffe3f0', '#ffd6ea', '#f6c9e6', '#e9c0ee'], 0, CH); for (let i = 0; i < 10; i++) R(c, '#ffffff', (i * 37) % CW, (i * 23) % 60, 1, 1); R(c, '#e9b8d8', 0, 78, CW, 18); },
    montana(c) {
      bands(c, ['#8fd3ff', '#b7e6ff', '#dff4ff'], 0, 56); ell(c, '#fff3b0', 62, 14, 6, 6); cloud(c, 18, 14); cloud(c, 46, 24, '#f4fbff');
      poly(c, '#3f7a4f', [[0, 52], [14, 24], [26, 40], [40, 14], [56, 42], [68, 28], [80, 46], [80, 60], [0, 60]]); poly(c, '#f4fbff', [[40, 14], [35, 22], [38, 21], [41, 24], [44, 20], [46, 22]]); poly(c, '#f4fbff', [[14, 24], [10, 31], [13, 30], [16, 32]]);
      ell(c, '#5aa84a', 20, 66, 40, 14); ell(c, '#6dbe5a', 64, 70, 36, 14); bands(c, ['#6dbe5a', '#5fb04e', '#52a244'], 66, CH);
      pine(c, 8, 74, 24, '#2f6a3f'); pine(c, 70, 76, 28, '#2f6a3f'); pine(c, 62, 72, 18, '#3a7a4a'); for (let i = 0; i < 18; i++) R(c, ['#ff7aa8', '#ffd24a', '#fff', '#b07cff'][i % 4], (i * 29) % 78, 70 + (i * 13) % 24, 1, 1);
    },
    shimaya(c) {
      R(c, '#7a1f24', 0, 0, CW, 62); for (let x = 0; x < CW; x += 8) R(c, '#6a1a20', x, 8, 1, 54); R(c, '#d9a441', 0, 6, CW, 1); R(c, '#d9a441', 0, 60, CW, 2);
      R(c, '#1f2f5a', 0, 0, CW, 7); [4, 24, 44, 64].forEach(x => { R(c, '#1f2f5a', x, 7, 12, 8); R(c, '#e9e9f0', x + 5, 7, 2, 8); });
      R(c, '#f0e2bc', 20, 18, 40, 36); R(c, '#7a5a3a', 20, 18, 40, 1); R(c, '#7a5a3a', 20, 53, 40, 1); for (let i = 0; i < 5; i++) { R(c, '#7a5a3a', 20 + i * 10, 18, 1, 36); } for (let j = 0; j < 4; j++) R(c, '#7a5a3a', 20, 18 + j * 9, 40, 1);
      [[10, 22], [70, 22]].forEach(([x, y]) => { R(c, '#d9a441', x - 1, y - 8, 3, 2); ell(c, '#e63946', x + 0.5, y, 5, 6); R(c, '#ffd24a', x - 4, y - 1, 9, 1); R(c, '#d9a441', x - 1, y + 5, 3, 2); R(c, '#ffd24a', x, y + 7, 1, 4); });
      R(c, '#d9a441', 26, 8, 28, 7); R(c, '#7a1f24', 27, 9, 26, 5); c.font = '8px VT323'; c.fillStyle = '#ffd24a'; c.textAlign = 'center'; c.fillText('SHIMAYA', 40, 14);
      bands(c, ['#9a6a3a', '#8a5a2e', '#9a6a3a', '#8a5a2e', '#9a6a3a'], 62, CH); for (let y = 66; y < CH; y += 8) R(c, '#6a4222', 0, y, CW, 1);
      R(c, '#5a3220', 6, 70, 68, 4); R(c, '#3a2218', 8, 74, 3, 12); R(c, '#3a2218', 69, 74, 3, 12);
      [[16, 70], [64, 70]].forEach(([x, y]) => { ell(c, '#fffaf0', x, y - 2, 6, 3); R(c, '#e63946', x - 5, y - 2, 10, 1); R(c, '#f2a65a', x - 3, y - 4, 6, 2); R(c, '#2b1b30', x + 3, y - 8, 1, 6); R(c, '#2b1b30', x + 5, y - 8, 1, 6); });
    },
    aire(c) {
      bands(c, ['#5fb8ff', '#86ccff', '#b0defa', '#d7efff'], 0, CH);
      c.strokeStyle = '#ffffff'; c.lineWidth = 1.5; [[22, 28, 12], [58, 52, 10], [30, 70, 8]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0.2, 4.6); c.stroke(); c.beginPath(); c.arc(x, y, r * 0.55, 1.4, 5.6); c.stroke(); });
      c.strokeStyle = '#fff6c8'; c.lineWidth = 1; for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(0, 20 + i * 14); c.bezierCurveTo(25, 10 + i * 14, 50, 32 + i * 14, 80, 18 + i * 14); c.stroke(); }
      cloud(c, 14, 12); cloud(c, 60, 40); cloud(c, 30, 82, '#f4fbff'); cloud(c, 66, 88);
      ell(c, '#8a6a44', 62, 24, 11, 4); ell(c, '#5fae4f', 62, 21, 10, 3); R(c, '#f4e8c8', 59, 12, 6, 8); poly(c, '#d9a441', [[58, 12], [62, 7], [66, 12]]);
    },
    fuego(c) {
      bands(c, ['#240808', '#4a0e0c', '#8a1c0e', '#c63a14', '#e8541c', '#ff8a2a', '#ffb02e'], 0, CH);
      [[6, 96, 16, 52], [22, 96, 14, 40], [38, 96, 18, 60], [54, 96, 14, 36], [68, 96, 16, 50]].forEach(([x, y, w, h]) => { poly(c, '#e63a14', [[x, y], [x + w / 2, y - h], [x + w, y]]); poly(c, '#ff8a2a', [[x + 2, y], [x + w / 2, y - h * 0.72], [x + w - 2, y]]); poly(c, '#ffe14a', [[x + 4, y], [x + w / 2, y - h * 0.4], [x + w - 4, y]]); });
      for (let i = 0; i < 16; i++) R(c, i % 2 ? '#ffe14a' : '#ff9a3c', (i * 31) % 78, 4 + (i * 17) % 50, 1, 1);
    },
    agua(c) {
      bands(c, ['#0b3a7a', '#13549e', '#1b66b8', '#3a8fd0', '#6cb6e6', '#a8dcf5'], 0, CH); ell(c, '#e6f6ff', 56, 16, 7, 7); ell(c, '#cfe9ff', 54, 15, 7, 7);
      c.strokeStyle = '#e6f6ff'; c.lineWidth = 1; for (let r = 0; r < 7; r++) for (let x = -4; x < CW; x += 14) { c.beginPath(); c.arc(x + (r % 2) * 7, 34 + r * 9, 7, 3.3, 6.1); c.stroke(); }
      for (let i = 0; i < 10; i++) { ell(c, 'rgba(255,255,255,.5)', (i * 23) % 76 + 2, 60 + (i * 11) % 30, 2, 2); }
      [[8, 70], [66, 80]].forEach(([x, y]) => { poly(c, '#e6f6ff', [[x, y], [x + 5, y - 16], [x + 10, y]]); });
    },
    tierra(c) {
      bands(c, ['#e8d7a6', '#d9c58a', '#c9b070'], 0, 40); poly(c, '#8a6a44', [[0, 40], [16, 18], [30, 36], [46, 14], [62, 38], [80, 22], [80, 56], [0, 56]]); poly(c, '#6a4a2a', [[0, 48], [20, 36], [40, 50], [60, 38], [80, 48], [80, 60], [0, 60]]);
      bands(c, ['#5a8a3a', '#4f7a34', '#3f6a2c'], 56, 70); bands(c, ['#7a5a38', '#6a4a2a', '#5a3b22', '#4a2e1a'], 70, CH);
      [[12, 76], [40, 84], [64, 76]].forEach(([x, y], i) => { poly(c, ['#3fbf6a', '#5fd88a', '#3fbf6a'][i], [[x, y], [x + 3, y - 14], [x + 6, y - 2], [x + 9, y - 16], [x + 11, y]]); poly(c, '#bff0cf', [[x + 3, y - 14], [x + 4, y - 8], [x + 6, y - 11]]); });
      ell(c, '#9a8a78', 66, 62, 9, 6); ell(c, '#b0a090', 64, 60, 5, 3); ell(c, '#8a7a68', 10, 64, 6, 4);
    },
    malecon(c) {
      bands(c, ['#ff9a5a', '#ffb070', '#ffc888', '#ffe3a8'], 0, 30); ell(c, '#fff0a0', 60, 28, 9, 9);
      [['#f2a7b8', 0, 20, 14], ['#9fdcc6', 14, 28, 16], ['#f2d88a', 30, 16, 14], ['#8fb8e0', 44, 26, 15], ['#f2a7b8', 59, 22, 21]].forEach(([col, x, y, w]) => { R(c, col, x, y, w, 52 - y); R(c, '#ffffff', x, y, w, 1); for (let wy = y + 4; wy < 48; wy += 7) for (let wx = x + 3; wx < x + w - 3; wx += 6) { R(c, '#4a3a5a', wx, wy, 3, 4); R(c, '#c99a6a', wx - 1, wy + 4, 5, 1); } });
      R(c, '#6a6a78', 0, 52, CW, 12); R(c, '#fff', 0, 58, CW, 1); car(c, 14, 62, '#2fc6c6'); car(c, 46, 62, '#f2a65a');
      R(c, '#d8d2bf', 0, 64, CW, 6); R(c, '#bdb6a2', 0, 70, CW, 2); bands(c, ['#2f7fb0', '#2a74a6', '#256a9c', '#1f5f90'], 72, CH);
      for (let i = 0; i < 9; i++) R(c, '#ffffff', (i * 19) % 72, 76 + (i * 7) % 18, 6, 1); [[10, 72], [34, 72], [58, 72]].forEach(([x, y]) => { ell(c, '#ffffff', x + 4, y, 6, 3); ell(c, '#dff4ff', x + 7, y - 3, 3, 3); });
    },
    cubaplaya(c) {
      bands(c, ['#6fd0ff', '#8fdcff', '#b8ecff'], 0, 40); ell(c, '#fff3b0', 16, 12, 7, 7); cloud(c, 54, 14);
      bands(c, ['#1fb8c0', '#2fcfcf', '#5fe0d6', '#a6f0e6'], 40, 62); for (let i = 0; i < 8; i++) R(c, '#ffffff', (i * 23) % 70, 46 + (i * 5) % 14, 5, 1);
      poly(c, '#fff', [[44, 40], [44, 30], [52, 40]]); poly(c, '#e63946', [[40, 40], [40, 33], [44, 40]]); R(c, '#7a5230', 38, 40, 16, 2);
      bands(c, ['#f6e3b0', '#f1d99a', '#ecd08a', '#e6c77c'], 62, CH); for (let i = 0; i < 40; i++) R(c, '#d9b870', (i * 17) % 78, 64 + (i * 11) % 30, 1, 1);
      palm(c, 12, 84, 1); palm(c, 68, 88, -1); ell(c, '#ff7aa8', 40, 86, 3, 2); ell(c, '#ffd24a', 30, 90, 2, 1.5);
    },
    tambo(c) {
      bands(c, ['#fff1c4', '#fae6b0', '#f4dc9c'], 0, 44); ell(c, '#fff8d0', 62, 14, 10, 10); poly(c, '#d4b87a', [[0, 44], [14, 32], [30, 42], [50, 30], [68, 42], [80, 34], [80, 50], [0, 50]]);
      bands(c, ['#d9bf86', '#d2b57a', '#cba96e'], 46, CH); for (let i = 0; i < 12; i++) { R(c, '#a8884a', (i * 31) % 74 + 2, 54 + (i * 13) % 38, 4, 1); R(c, '#b89a52', (i * 17) % 74 + 3, 56 + (i * 9) % 36, 1, 3); }
      [[10, 62], [66, 60]].forEach(([x, y]) => { R(c, '#7a6a52', x - 1, y - 12, 3, 12); ell(c, '#8a9a4a', x, y - 14, 11, 3); ell(c, '#9aaa5a', x - 2, y - 15, 6, 2); });
      [[22, 82], [58, 86]].forEach(([x, y], k) => { R(c, '#5a3b24', x - 2, y - 18, 4, 18); ell(c, '#2f7a3a', x, y - 24, 14, 11); ell(c, '#3f8a44', x - 4, y - 27, 8, 6); [[-8, -22], [-2, -17], [6, -22], [9, -28], [-6, -30], [2, -31]].forEach(([dx, dy], i) => { ell(c, i % 2 ? '#ffb02e' : '#e8541c', x + dx, y + dy, 2.2, 3); R(c, '#2f5a2a', x + dx, y + dy - 4, 1, 2); }); });
      ell(c, '#ffb02e', 40, 92, 2.5, 2); ell(c, '#e8541c', 46, 94, 2, 2);
    },
    chimbote(c) {
      bands(c, ['#aebdce', '#bcc9d8', '#cdd7e2'], 0, 46); [[10, 40, 7], [26, 40, 6], [62, 40, 7]].forEach(([x, y, w], i) => { R(c, '#8a7a72', x, y - 22 - i * 2, w, 22 + i * 2); R(c, '#e63946', x, y - 22 - i * 2, w, 2); ell(c, 'rgba(255,255,255,.75)', x + 3, y - 30 - i * 2, 5, 4); ell(c, 'rgba(255,255,255,.55)', x + 8, y - 37 - i * 2, 6, 4); });
      R(c, '#d9a441', 44, 16, 2, 30); R(c, '#d9a441', 44, 16, 22, 2); R(c, '#d9a441', 64, 16, 2, 8); R(c, '#2b1b30', 64, 24, 2, 2);
      bands(c, ['#2f5f8a', '#2a5780', '#244f76'], 46, 66); [[6, 56, '#e63946'], [40, 60, '#fffaf0']].forEach(([x, y, col]) => { poly(c, col, [[x, y], [x + 22, y], [x + 18, y + 5], [x + 4, y + 5]]); R(c, '#2b1b30', x + 9, y - 6, 2, 6); R(c, '#fff', x + 11, y - 6, 5, 3); });
      R(c, '#8a8a92', 0, 66, CW, 6); R(c, '#6a6a72', 0, 72, CW, 24); for (let i = 0; i < 8; i++) R(c, '#5a5a62', i * 11, 76 + (i % 3) * 6, 5, 1);
      worker(c, 14, 94, '#ff9a1a', '#ff6a1a', '#c98f6a'); worker(c, 36, 90, '#ffd24a', '#ffb02e', '#a8693f'); worker(c, 62, 94, '#ffffff', '#ff6a1a', '#d9a07a');
    },
    estrellas(c) {
      R(c, '#d9262c', 0, 0, CW, CH); R(c, '#b81e24', 0, 78, CW, 18);
      [[10, 12, 6], [40, 8, 4], [66, 16, 7], [24, 34, 4], [54, 38, 5], [8, 56, 5], [72, 52, 4], [32, 62, 6], [60, 72, 5], [14, 84, 4], [44, 86, 3], [72, 88, 4]].forEach(([x, y, r]) => star(c, '#ffd24a', x, y, r));
    },
    duo(c, id) {
      bands(c, ['#e9d5ff', '#f3d3f8', '#ffd6ea', '#ffe3ef'], 0, CH); for (let i = 0; i < 8; i++) { const x = 6 + (i * 29) % 70, y = 8 + (i * 17) % 50; R(c, '#ffffff', x, y, 2, 2); R(c, '#ffffff', x - 1, y + 0.5, 4, 1); }
      [[14, 20], [62, 14], [40, 26], [70, 44], [10, 50]].forEach(([x, y]) => { R(c, '#ff7aa8', x, y, 2, 2); R(c, '#ff7aa8', x + 3, y, 2, 2); R(c, '#ff7aa8', x - 0.5, y + 2, 6, 1); R(c, '#ff7aa8', x + 1, y + 3, 3, 1); });
      R(c, '#f2b8d8', 0, 82, CW, 14); R(c, '#e9a4cc', 0, 82, CW, 1);
    }
  };

  /* los dos looks fijos del fondo "Los dos juntos": Dani con su vestido floreado morado; Sebas con coco largo y polo con rayo rojo */
  function duoLook(who) {
    const l = G.defaultLook(who);
    if (who === 'dani') { G.applyOutfit(l, G.PRESETS.dani.outfits[2]); l.outfitIdx = 2; l.hair = { style: 'largoLiso', color: '#4f2e22' }; }
    else { l.hair = { style: 'cocoLargo', color: '#1b1618' }; l.outfit.top = { style: 'tee', color: '#fffaf0', pattern: 'rayo', p1: '#e63946' }; l.outfitIdx = -1; }
    l.costume = 'none'; l.puffleOn = false; return l;
  }

  /* pinta la tarjeta de `id` ('dani' | 'sebas') con su look dentro de un <canvas> (se amplía con CSS pixelado) */
  G.cardCanvas = function (cv, id, look, name) {
    cv.width = CW; cv.height = CH; const c = cv.getContext('2d'); c.imageSmoothingEnabled = false; c.textAlign = 'left'; c.textBaseline = 'alphabetic';
    const bg = look && look.cardBg || 'none'; (BG[bg] || BG.none)(c, id);
    const av = document.createElement('canvas'), place = (cnv, cx) => c.drawImage(cnv, Math.round(cx - cnv.width / 2), 90 - cnv.height);
    let ax = 40;
    if (bg === 'duo') {
      const other = id === 'dani' ? 'sebas' : 'dani', ol = document.createElement('canvas'); G.drawLook(ol, duoLook(other), 'd', 0, 2, false);
      ax = id === 'dani' ? 24 : 56; place(ol, id === 'dani' ? 58 : 22);
    }
    c.fillStyle = 'rgba(0,0,0,.22)'; c.beginPath(); c.ellipse(ax, 89, 13, 3, 0, 0, 7); c.fill();
    if (look.puffleOn) { const pc = document.createElement('canvas'); G.drawPuffle(pc, look.puffle, 1); c.drawImage(pc, Math.round(ax + (id === 'dani' ? -26 : 8)), 90 - 24); }
    G.drawLook(av, look, 'd', 0, 2, false); place(av, ax);
    // placa con el nombre
    c.fillStyle = 'rgba(43,27,48,.88)'; c.fillRect(0, 0, CW, 11); c.fillStyle = '#ffd24a'; c.fillRect(0, 11, CW, 1);
    c.font = '11px VT323'; c.fillStyle = '#fff3d6'; c.textAlign = 'center'; c.fillText(name || '', 40, 9);
  };

  G.ui.card = function (who) {
    const mine = who === 'me', p = G.state[mine ? 'me' : 'partner']; if (!p || !p.id || !p.look) return;
    const el = (t, cls, h) => { const e = document.createElement(t); if (cls) e.className = cls; if (h !== undefined) e.innerHTML = h; return e; };
    G.modalOpen = true; const root = el('div', 'modal'), panel = el('div', 'panel'); root.appendChild(panel);
    const close = el('button', 'btn small xbtn', '✖ Cerrar'); close.onclick = () => { root.remove(); G.modalOpen = false; }; panel.appendChild(close);
    panel.appendChild(el('h2', '', '🪪 Tarjeta de jugador'));
    const cv = el('canvas'); cv.style.cssText = 'width:240px;height:288px;image-rendering:pixelated;border:4px solid var(--ink);border-radius:8px;display:block;margin:6px auto';
    G.cardCanvas(cv, p.id, p.look, p.name || G.IDS[p.id].short); panel.appendChild(cv);
    const bgName = (G.CARD_BGS.find(b => b[0] === (p.look.cardBg || 'none')) || G.CARD_BGS[0])[1];
    panel.appendChild(el('div', 'small-note', 'Fondo: ' + bgName));
    if (mine) { const b = el('button', 'btn small', '🎨 Cambiar fondo'); b.onclick = () => { root.remove(); G.modalOpen = false; G.ui.lastTab = 'Tarjeta'; G.ui.closet(); }; panel.appendChild(b); }
    G.ui.bgRoot = root; document.getElementById('ui').appendChild(root);
  };
})();
