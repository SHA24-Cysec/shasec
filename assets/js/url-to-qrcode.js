/**
 * ShaSec URL to QR Code Tool - offline, client-side
 * Uses qrcodejs (davidshimjs) vendored as assets/js/qrcodejs.min.js must be loaded before this file
 * If not loaded, fallback to simple generator via canvas
 */
(function () {
  'use strict';

  function $(id) { return document.getElementById(id); }

  // translation
  var lang = document.documentElement.lang || 'id';
  var isEN = lang.toLowerCase().startsWith('en');

  var T = {
    invalidUrl: isEN ? 'Enter a valid URL starting with https://' : 'Masukkan URL valid yang diawali https://',
    httpWarn: isEN ? 'HTTP is not encrypted. Use HTTPS if possible.' : 'HTTP tidak terenkripsi. Pakai HTTPS jika bisa.',
    suspiciousIp: isEN ? 'URL uses IP address. This is often abused in phishing.' : 'URL pakai alamat IP. Pola ini sering dipakai phishing.',
    suspiciousAt: isEN ? 'URL contains @ symbol that can hide real destination.' : 'URL mengandung simbol @ yang bisa sembunyikan tujuan asli.',
    suspiciousLong: isEN ? 'Very long URL – check carefully before sharing.' : 'URL sangat panjang – cek dengan teliti sebelum dibagikan.',
    punycode: isEN ? 'Internationalized domain (xn--) – verify visually for homoglyphs.' : 'Domain internasional (xn--) – cek visual untuk homoglyph.',
    generated: isEN ? 'QR generated. Preview shows final result.' : 'QR berhasil dibuat. Preview menampilkan hasil akhir.',
    empty: isEN ? 'Please enter URL first.' : 'Masukkan URL dulu.',
    download: isEN ? 'Download' : 'Unduh',
    safe: isEN ? 'Looks safe for QR (still double-check destination).' : 'Terlihat aman untuk QR (tetap cek tujuan).'
  };

  var els = {};

  function init() {
    els.input = $('qr-url-input');
    els.size = $('qr-size');
    els.sizeVal = $('qr-size-val');
    els.ecc = $('qr-ecc');
    els.fg = $('qr-fg');
    els.bg = $('qr-bg');
    els.margin = $('qr-margin');
    els.logo = $('qr-logo');
    els.logoFile = $('qr-logo-file');
    els.preview = $('qr-preview');
    els.canvasWrap = $('qr-canvas-wrap');
    els.generateBtn = $('qr-generate');
    els.downloadPng = $('qr-download-png');
    els.downloadWebp = $('qr-download-webp');
    els.downloadSvg = $('qr-download-svg');
    els.clearBtn = $('qr-clear');
    els.msg = $('qr-message');
    els.safety = $('qr-safety');
    els.urlPreview = $('qr-url-preview');
    els.brandedFrame = $('qr-branded-frame');

    if (!els.input || !els.preview) return;

    // range events
    if (els.size && els.sizeVal) {
      els.size.addEventListener('input', function () {
        els.sizeVal.textContent = els.size.value + 'px';
      });
    }

    // logo file
    if (els.logoFile) {
      els.logoFile.addEventListener('change', function () {
        if (els.logoFile.files && els.logoFile.files[0]) {
          els.logo.checked = true;
        }
      });
    }

    els.generateBtn && els.generateBtn.addEventListener('click', generate);
    els.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); generate(); }
    });
    els.downloadPng && els.downloadPng.addEventListener('click', function () { download('png'); });
    els.downloadWebp && els.downloadWebp.addEventListener('click', function () { download('webp'); });
    els.downloadSvg && els.downloadSvg.addEventListener('click', function () { download('svg'); });
    els.clearBtn && els.clearBtn.addEventListener('click', clearAll);

    // auto generate if input has value on load (from query param)
    var params = new URLSearchParams(window.location.search);
    var q = params.get('url') || params.get('text');
    if (q) {
      els.input.value = q;
      setTimeout(generate, 200);
    }
  }

  function setMessage(text, type) {
    if (!els.msg) return;
    if (!text) {
      els.msg.textContent = '';
      els.msg.className = 'hidden mt-3 rounded-lg border px-3 py-2.5 text-[12px] leading-relaxed';
      els.msg.hidden = true;
      return;
    }
    els.msg.textContent = text;
    els.msg.className = 'mt-3 rounded-lg border px-3 py-2.5 text-[12px] leading-relaxed ' + (type === 'error' ? 'border-red-500/25 bg-red-500/10 text-red-300' : type === 'ok' ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300' : 'border-shasec-border bg-shasec-bg-elevated/50 text-shasec-muted');
    els.msg.hidden = false;
    els.msg.classList.remove('hidden');
  }

  function setSafety(text, type) {
    if (!els.safety) return;
    if (!text) {
      els.safety.textContent = '';
      els.safety.className = 'hidden mt-2 rounded-lg border border-dashed px-3 py-2 text-[11px] leading-relaxed';
      els.safety.hidden = true;
      return;
    }
    els.safety.textContent = text;
    els.safety.className = 'mt-2 rounded-lg border border-dashed px-3 py-2 text-[11px] leading-relaxed ' + (type === 'warn' ? 'border-amber-500/25 bg-amber-500/10 text-amber-200' : 'border-shasec-border bg-shasec-bg-elevated/50 text-shasec-muted');
    els.safety.hidden = false;
    els.safety.classList.remove('hidden');
  }

  function validateUrl(str) {
    if (!str || !str.trim()) return { ok: false, reason: T.empty };
    str = str.trim();
    // allow without protocol but warn - we will prepend https for check
    var testStr = str;
    if (!/^https?:\/\//i.test(testStr)) {
      // if user entered without protocol, try with https
      testStr = 'https://' + testStr;
    }
    try {
      var u = new URL(testStr);
      if (!['http:', 'https:'].includes(u.protocol)) {
        return { ok: false, reason: T.invalidUrl };
      }
      // basic length check
      if (testStr.length < 8) return { ok: false, reason: T.invalidUrl };
      return { ok: true, url: testStr, parsed: u, original: str };
    } catch (e) {
      return { ok: false, reason: T.invalidUrl };
    }
  }

  function analyzeSafety(parsed, originalUrl) {
    var warnings = [];
    var isHttp = parsed.protocol === 'http:';
    if (isHttp) warnings.push(T.httpWarn);

    // IP check
    var host = parsed.hostname;
    var ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipRegex.test(host) || /^\[?[0-9a-f:]*:[0-9a-f:]*\]?$/i.test(host) && host.includes(':')) {
      // naive ipv4/ipv6
      if (ipRegex.test(host) || host.includes(':')) warnings.push(T.suspiciousIp);
    }
    if (originalUrl.includes('@')) warnings.push(T.suspiciousAt);
    if (originalUrl.length > 120) warnings.push(T.suspiciousLong);
    if (host.includes('xn--')) warnings.push(T.punycode);

    if (warnings.length === 0) {
      setSafety(T.safe, 'ok');
    } else {
      setSafety(warnings.join(' '), 'warn');
    }
  }

  function clearPreview() {
    if (els.canvasWrap) {
      els.canvasWrap.innerHTML = '';
      els.canvasWrap.className = 'hidden justify-center bg-white p-6 sm:p-8';
      els.canvasWrap.hidden = true;
    }
    if (els.preview) {
      els.preview.style.display = 'flex';
      els.preview.classList.remove('hidden');
      // restore empty state if it was cleared (fallback)
      if (!els.preview.innerHTML.trim()) {
        els.preview.innerHTML = '<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-dashed border-shasec-border bg-shasec-bg-card text-shasec-muted"><svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M14 14h3M18 14h3M14 18h3M18 18h3"/></svg></div><p class="font-mono text-[11px] uppercase tracking-widest text-shasec-muted">QR Preview</p><p class="mt-1 max-w-[260px] text-[12px] leading-relaxed text-shasec-muted-soft">Masukkan URL di atas, QR akan muncul di sini. Siap download.</p>';
      }
    }
    var dlWrap = document.getElementById('qr-download-wrap');
    if (dlWrap) {
      dlWrap.className = 'hidden border-t border-shasec-border bg-shasec-bg-card/50 p-4';
      dlWrap.hidden = true;
    }
    var urlWrap = document.getElementById('qr-url-preview-wrap');
    if (urlWrap) {
      urlWrap.className = 'hidden mt-3 rounded-lg border border-dashed border-shasec-border bg-shasec-bg-elevated/50 px-3 py-2';
      urlWrap.hidden = true;
    }
  }

  function generate() {
    var raw = els.input ? els.input.value.trim() : '';
    var v = validateUrl(raw);
    if (!v.ok) {
      setMessage(v.reason, 'error');
      setSafety('', '');
      clearPreview();
      return;
    }
    var url = v.url;
    // show url preview
    if (els.urlPreview) {
      els.urlPreview.textContent = url;
      els.urlPreview.href = url;
    }

    analyzeSafety(v.parsed, url);
    setMessage(T.generated, 'ok');

    // options
    var size = parseInt(els.size ? els.size.value : 256, 10) || 256;
    var eccStr = els.ecc ? els.ecc.value : 'M';
    var fg = els.fg ? els.fg.value : '#000000';
    var bg = els.bg ? els.bg.value : '#ffffff';
    var margin = els.margin ? parseInt(els.margin.value, 10) : 4;

    // map ecc
    var eccMap = { L: QRCode.CorrectLevel.L, M: QRCode.CorrectLevel.M, Q: QRCode.CorrectLevel.Q, H: QRCode.CorrectLevel.H };
    var eccLevel = eccMap[eccStr] !== undefined ? eccMap[eccStr] : QRCode.CorrectLevel.M;

    clearPreview();

    // show canvas and download areas, hide empty preview
    if (els.preview) {
      els.preview.style.display = 'none';
      els.preview.classList.add('hidden');
    }
    if (els.canvasWrap) {
      els.canvasWrap.classList.remove('hidden');
      els.canvasWrap.style.display = 'flex';
      els.canvasWrap.hidden = false;
    }
    var dlWrap = document.getElementById('qr-download-wrap');
    if (dlWrap) {
      dlWrap.classList.remove('hidden');
      dlWrap.style.display = 'block';
      dlWrap.hidden = false;
    }
    var urlWrap = document.getElementById('qr-url-preview-wrap');
    if (urlWrap) {
      urlWrap.classList.remove('hidden');
      urlWrap.style.display = 'block';
      urlWrap.hidden = false;
    }

    // create container for QRCode lib
    var container = document.createElement('div');
    container.style.width = size + 'px';
    container.style.height = size + 'px';
    container.style.background = bg;
    container.style.padding = margin + 'px';
    container.style.display = 'inline-block';
    container.style.maxWidth = '100%';
    els.canvasWrap && els.canvasWrap.appendChild(container);

    // eslint-disable-next-line no-undef
    var qrcode = new QRCode(container, {
      text: url,
      width: size,
      height: size,
      colorDark: fg,
      colorLight: bg,
      correctLevel: eccLevel
    });

    // after render, try to find canvas
    setTimeout(function () {
      var canvas = container.querySelector('canvas');
      var img = container.querySelector('img');
      // if library rendered as img (fallback), convert to canvas for download + logo
      if (!canvas && img) {
        canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, size, size);
        var tmpImg = new Image();
        tmpImg.crossOrigin = 'anonymous';
        tmpImg.onload = function () {
          ctx.drawImage(tmpImg, 0, 0, size, size);
          applyLogoAndFrame(canvas);
        };
        tmpImg.src = img.src;
        container.innerHTML = '';
        container.appendChild(canvas);
      } else if (canvas) {
        applyLogoAndFrame(canvas);
      }

      // enable download buttons
      if (els.downloadPng) els.downloadPng.disabled = false;
      if (els.downloadWebp) els.downloadWebp.disabled = false;
      if (els.downloadSvg) els.downloadSvg.disabled = false;
    }, 50);
  }

  function applyLogoAndFrame(canvas) {
    if (!canvas) return;
    var size = canvas.width;
    var ctx = canvas.getContext('2d');
    var branded = els.brandedFrame ? els.brandedFrame.checked : false;

    // branded frame: draw border and label
    if (branded) {
      var framePadding = Math.round(size * 0.06);
      // save old
      var oldCanvas = document.createElement('canvas');
      oldCanvas.width = size;
      oldCanvas.height = size;
      oldCanvas.getContext('2d').drawImage(canvas, 0, 0);

      // enlarge canvas for frame
      var newSize = size + framePadding * 2 + 28; // extra for text
      var newCanvas = document.createElement('canvas');
      newCanvas.width = newSize;
      newCanvas.height = newSize + 20;
      var nctx = newCanvas.getContext('2d');
      // background
      nctx.fillStyle = '#ffffff';
      nctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
      // draw QR centered
      nctx.drawImage(oldCanvas, framePadding, framePadding, size, size);
      // draw frame border
      nctx.strokeStyle = '#0b1220';
      nctx.lineWidth = 3;
      nctx.strokeRect(framePadding - 2, framePadding - 2, size + 4, size + 4);
      // footer text
      nctx.fillStyle = '#0b1220';
      nctx.font = 'bold ' + Math.round(size * 0.06) + 'px Inter, system-ui, sans-serif';
      nctx.textAlign = 'center';
      nctx.fillText('Scan me • shasec.my.id', newCanvas.width / 2, newCanvas.height - 8);

      // replace
      canvas.width = newCanvas.width;
      canvas.height = newCanvas.height;
      ctx = canvas.getContext('2d');
      ctx.drawImage(newCanvas, 0, 0);
    }

    // logo overlay
    var withLogo = els.logo ? els.logo.checked : false;
    if (!withLogo) return;

    var file = els.logoFile && els.logoFile.files && els.logoFile.files[0] ? els.logoFile.files[0] : null;

    function drawCenterLogo(imgEl) {
      var logoSize = Math.round(canvas.width * 0.22);
      var x = (canvas.width - logoSize) / 2;
      var y = (canvas.height - logoSize) / 2 - (branded ? 10 : 0);
      // white bg for logo
      ctx.fillStyle = '#ffffff';
      var pad = 4;
      ctx.fillRect(x - pad, y - pad, logoSize + pad * 2, logoSize + pad * 2);
      // rounded clip
      ctx.save();
      ctx.beginPath();
      var r = 6;
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + logoSize - r, y);
      ctx.quadraticCurveTo(x + logoSize, y, x + logoSize, y + r);
      ctx.lineTo(x + logoSize, y + logoSize - r);
      ctx.quadraticCurveTo(x + logoSize, y + logoSize, x + logoSize - r, y + logoSize);
      ctx.lineTo(x + r, y + logoSize);
      ctx.quadraticCurveTo(x, y + logoSize, x, y + logoSize - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(imgEl, x, y, logoSize, logoSize);
      ctx.restore();
      // border
      ctx.strokeStyle = '#0b1220';
      ctx.lineWidth = 1;
      ctx.strokeRect(x - pad, y - pad, logoSize + pad * 2, logoSize + pad * 2);
    }

    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = new Image();
        img.onload = function () { drawCenterLogo(img); };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      // default logo: simple text / fallback shasec icon via canvas
      var img = new Image();
      img.onload = function () { drawCenterLogo(img); };
      // create tiny default logo canvas as data URL: ShaSec S
      var tmp = document.createElement('canvas');
      tmp.width = 128; tmp.height = 128;
      var tctx = tmp.getContext('2d');
      tctx.fillStyle = '#0b1220';
      tctx.fillRect(0,0,128,128);
      tctx.fillStyle = '#4ee0ff';
      tctx.font = 'bold 64px Inter, sans-serif';
      tctx.textAlign='center'; tctx.textBaseline='middle';
      tctx.fillText('S',64,72);
      img.src = tmp.toDataURL();
    }
  }

  function download(type) {
    var container = els.canvasWrap;
    if (!container) return;
    var canvas = container.querySelector('canvas');
    if (!canvas) {
      var img = container.querySelector('img');
      if (!img) return;
      // if only img, create canvas from it
      canvas = document.createElement('canvas');
      var size = parseInt(els.size ? els.size.value : 256,10);
      canvas.width = size; canvas.height = size;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img,0,0,size,size);
    }

    var a = document.createElement('a');
    var urlValue = els.input ? els.input.value.trim() : 'qrcode';
    // sanitize filename from url host
    var fname = 'shasec-qrcode';
    try {
      var u = new URL(/^https?:\/\//i.test(urlValue) ? urlValue : 'https://' + urlValue);
      fname = u.hostname.replace(/\./g,'-') + '-qr';
    } catch(e){}

    if (type === 'png') {
      a.href = canvas.toDataURL('image/png');
      a.download = fname + '.png';
    } else if (type === 'webp') {
      // check support
      var dataUrl;
      try { dataUrl = canvas.toDataURL('image/webp', 0.92); } catch(e){ dataUrl = canvas.toDataURL('image/png'); }
      a.href = dataUrl;
      a.download = fname + '.webp';
    } else if (type === 'svg') {
      // generate simple SVG from canvas data? For now embed PNG inside SVG
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+canvas.width+'" height="'+canvas.height+'"><foreignObject width="100%" height="100%"><img xmlns="http://www.w3.org/1999/xhtml" src="'+canvas.toDataURL('image/png')+'" width="'+canvas.width+'" height="'+canvas.height+'"/></foreignObject></svg>';
      // better: create blob
      var blob = new Blob([svg], {type:'image/svg+xml'});
      var url = URL.createObjectURL(blob);
      a.href = url;
      a.download = fname + '.svg';
      setTimeout(function(){ URL.revokeObjectURL(url); }, 2000);
    }
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function clearAll() {
    if (els.input) els.input.value = '';
    clearPreview();
    setMessage('', '');
    setSafety('', '');
    if (els.urlPreview) { els.urlPreview.textContent = ''; els.urlPreview.removeAttribute('href'); }
    if (els.downloadPng) els.downloadPng.disabled = true;
    if (els.downloadWebp) els.downloadWebp.disabled = true;
    if (els.downloadSvg) els.downloadSvg.disabled = true;
  }

  // init on ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
