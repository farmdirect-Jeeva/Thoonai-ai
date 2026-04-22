// ═══════════════════════════════════════
// common.js — Shared logic for all pages
// ═══════════════════════════════════════

/* ── Theme ── */
function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const btn = document.getElementById('theme-btn');
  if(btn) btn.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('thoonai-theme', dark ? 'dark' : 'light');
}
function toggleTheme() {
  applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
}
(function(){ if(localStorage.getItem('thoonai-theme') === 'dark') applyTheme(true); })();

/* ── Scroll ── */
window.addEventListener('scroll', () => {
  const btn = document.getElementById('scrolltop');
  if(btn) btn.classList.toggle('show', window.scrollY > 350);
  const hdr = document.getElementById('header');
  if(hdr) hdr.classList.toggle('scrolled', window.scrollY > 8);
}, {passive:true});

/* ── Mobile controls ── */
let _mobMenu = false, _mobSearch = false;
function toggleMobMenu() {
  _mobMenu = !_mobMenu;
  document.getElementById('mob-menu').classList.toggle('open', _mobMenu);
  document.getElementById('mob-menu-btn').textContent = _mobMenu ? '✕' : '☰';
}
function toggleMobSearch() {
  _mobSearch = !_mobSearch;
  document.getElementById('mob-search-bar').classList.toggle('open', _mobSearch);
  if(_mobSearch) setTimeout(()=> document.getElementById('mob-search-input')?.focus(), 100);
}
function checkScreenSize() {
  const small = window.innerWidth < 768;
  ['mob-menu-btn','mob-search-btn'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.style.display = small ? 'flex' : 'none';
  });
}
window.addEventListener('resize', checkScreenSize);
document.addEventListener('DOMContentLoaded', checkScreenSize);

/* ── Search ── */
function goSearch(q) {
  if(!q?.trim()) return;
  window.location.href = 'search.html?q=' + encodeURIComponent(q.trim());
}

/* ── Modal ── */
function closeModal(e) {
  const modal = document.getElementById('modal');
  if(!modal) return;
  if(!e || e.target === modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

/* ── API Key management ── */
const KEY_STORE = 'thoonai-api-key';
function getApiKey() { return localStorage.getItem(KEY_STORE) || ''; }
function saveApiKey(k) { localStorage.setItem(KEY_STORE, k.trim()); }
function clearApiKey() { localStorage.removeItem(KEY_STORE); }

/* ── Date helper ── */
function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
}
function todayStr() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

/* ── Shared header HTML builder ── */
function buildHeader(activePage) {
  const pages = [
    {id:'home', href:'index.html', label:'Home'},
    {id:'ca',   href:'current-affairs.html', label:'Current Affairs'},
    {id:'gk',   href:'gk-library.html', label:'GK Library'},
    {id:'srch', href:'search.html', label:'Search'},
  ];
  return `
  <header id="header">
    <div class="wrap">
      <div class="hdr-inner">
        <a class="logo" href="index.html">
          <div class="logo-flame">🪔</div>
          <div>
            <div class="logo-tamil">துணை</div>
            <div class="logo-en">Thoonai <span style="color:var(--saffron);font-size:.55rem;">AI</span></div>
          </div>
        </a>
        <nav class="desk-nav">
          ${pages.map(p=>`<a class="nav-a${activePage===p.id?' on':''}" href="${p.href}">${p.label}</a>`).join('')}
        </nav>
        <div class="hdr-right">
          <div class="search-bar">
            <span class="s-ico">🔍</span>
            <input type="text" placeholder="Search topics…" onkeydown="if(event.key==='Enter')goSearch(this.value)"/>
          </div>
          <button class="icon-btn" id="mob-search-btn" onclick="toggleMobSearch()">🔍</button>
          <button class="icon-btn" id="theme-btn" onclick="toggleTheme()">🌙</button>
          <button class="icon-btn" id="mob-menu-btn" onclick="toggleMobMenu()">☰</button>
        </div>
      </div>
    </div>
    <div class="mob-search" id="mob-search-bar">
      <div class="mob-search-wrap">
        <span class="s-ico">🔍</span>
        <input id="mob-search-input" type="text" placeholder="Search topics…" onkeydown="if(event.key==='Enter')goSearch(this.value)"/>
      </div>
    </div>
    <div class="mob-menu" id="mob-menu">
      ${pages.map(p=>`<a class="mob-nav-a${activePage===p.id?' on':''}" href="${p.href}">${p.label}</a>`).join('')}
    </div>
  </header>`;
}

/* ── Shared footer HTML ── */
function buildFooter() {
  return `
  <footer>
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,#E8714A,#E8A320);display:flex;align-items:center;justify-content:center;font-size:14px;">🪔</div>
            <span style="font-family:var(--f-tamil);font-size:1rem;font-weight:700;color:var(--terra);">துணை · Thoonai AI</span>
          </div>
          <p class="ft-brand-txt">The Trusted Companion on Your Journey to Victory. Now powered by AI.</p>
        </div>
        <div>
          <div class="ft-link-title">Explore</div>
          <ul class="ft-links">
            <li><a href="index.html">🏠 Home</a></li>
            <li><a href="current-affairs.html">📰 Current Affairs</a></li>
            <li><a href="gk-library.html">📚 GK Library</a></li>
            <li><a href="search.html">🔍 Search</a></li>
          </ul>
        </div>
        <div>
          <div class="ft-link-title">Exams Covered</div>
          <div class="exam-chips">
            <span class="exam-chip">UPSC CSE</span>
            <span class="exam-chip">TNPSC Gr. I</span>
            <span class="exam-chip">SSC CGL</span>
            <span class="exam-chip">SBI PO</span>
            <span class="exam-chip">RBI Grade B</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2025 Thoonai (துணை). All rights reserved.</span>
        <span>Made with 🤍 for Aspirants · வெற்றி உங்களுக்கே!</span>
      </div>
    </div>
  </footer>
  <button id="scrolltop" onclick="window.scrollTo({top:0,behavior:'smooth'})">↑</button>`;
}
