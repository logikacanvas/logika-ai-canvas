const polish=document.createElement('style');
polish.textContent=`
.nav-wrap{grid-template-columns:240px 1fr auto;gap:26px}
.brand img{width:218px;max-height:50px;object-fit:contain;object-position:left center}
.main-nav{gap:36px}
.featured-grid{gap:26px}
.featured img{height:128px;object-fit:cover;background:#f3f8fc}
.featured .article-content{padding:20px 22px 18px}
.featured .micro{margin-bottom:10px}
.featured h4{font-size:23px;line-height:1.18;letter-spacing:-.02em;margin-bottom:14px;font-weight:700}
.featured p:not(.micro){font-size:14.5px;line-height:1.58;margin-bottom:18px;max-width:94%}
.featured .article-meta{padding-top:2px;gap:16px}
.earlier-grid{gap:20px}
.compact img{height:100px;object-fit:cover;background:#f4f8fb}
.compact .article-content{padding:15px 16px 14px}
.compact h4{line-height:1.14;margin-bottom:9px}
.coming-art{height:100px}
.insights-body{padding-bottom:92px}
@media(max-width:1000px){.nav-wrap{grid-template-columns:210px 1fr auto}.brand img{width:198px}.main-nav{gap:22px}}
@media(max-width:760px){.brand img{width:174px}.featured img,.compact img{height:118px}.featured h4{font-size:21px}.featured p:not(.micro){max-width:none}}
`;
document.head.appendChild(polish);

const header=document.getElementById('site-header');
const navLinks=[...document.querySelectorAll('.main-nav a[data-section]')];
const sections=navLinks.map(a=>document.getElementById(a.dataset.section)).filter(Boolean);
const setActive=()=>{const y=window.scrollY+110;let current='home';for(const s of sections){if(s.offsetTop<=y)current=s.id}navLinks.forEach(a=>a.classList.toggle('active',a.dataset.section===current))};
window.addEventListener('scroll',setActive,{passive:true});setActive();
const menu=document.querySelector('.menu-toggle'), nav=document.querySelector('.main-nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
navLinks.forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const toast=document.getElementById('toast');document.getElementById('notify-btn').addEventListener('click',()=>{toast.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove('show'),2600)});
const panel=document.getElementById('search-panel'), open=document.getElementById('search-open'), close=document.getElementById('search-close'), input=document.getElementById('search-input'), cards=[...document.querySelectorAll('.article-card[data-search]')];
open.addEventListener('click',()=>{panel.classList.add('open');panel.setAttribute('aria-hidden','false');setTimeout(()=>input.focus(),50)});
const closeSearch=()=>{panel.classList.remove('open');panel.setAttribute('aria-hidden','true');input.value='';cards.forEach(c=>c.classList.remove('hidden-by-search'))};
close.addEventListener('click',closeSearch);panel.addEventListener('click',e=>{if(e.target===panel)closeSearch()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSearch()});
input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase();cards.forEach(c=>{const hay=(c.innerText+' '+c.dataset.search).toLowerCase();c.classList.toggle('hidden-by-search',q && !hay.includes(q))});if(q)document.getElementById('insights').scrollIntoView({behavior:'smooth'})});