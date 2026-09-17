const navLinks=[...document.querySelectorAll('.main-nav a[data-section]')];
const sections=navLinks.map(a=>document.getElementById(a.dataset.section)).filter(Boolean);
const setActive=()=>{
  const y=window.scrollY+110;
  let current='home';
  for(const s of sections){if(s.offsetTop<=y) current=s.id;}
  navLinks.forEach(a=>a.classList.toggle('active',a.dataset.section===current));
};
window.addEventListener('scroll',setActive,{passive:true});
setActive();

const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
menu?.addEventListener('click',()=>{
  const isOpen=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(isOpen));
});
navLinks.forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const toast=document.getElementById('toast');
const notifyBtn=document.getElementById('notify-btn');
notifyBtn?.addEventListener('click',()=>{
  toast.classList.add('show');
  clearTimeout(window.__toast);
  window.__toast=setTimeout(()=>toast.classList.remove('show'),2800);
});

const panel=document.getElementById('search-panel');
const openBtn=document.getElementById('search-open');
const closeBtn=document.getElementById('search-close');
const input=document.getElementById('search-input');
const cards=[...document.querySelectorAll('.article-card[data-search]')];
openBtn?.addEventListener('click',()=>{
  panel.classList.add('open');
  panel.setAttribute('aria-hidden','false');
  setTimeout(()=>input.focus(),50);
});
const closeSearch=()=>{
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden','true');
  input.value='';
  cards.forEach(c=>c.classList.remove('hidden-by-search'));
};
closeBtn?.addEventListener('click',closeSearch);
panel?.addEventListener('click',e=>{if(e.target===panel) closeSearch();});
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeSearch();});
input?.addEventListener('input',()=>{
  const q=input.value.trim().toLowerCase();
  cards.forEach(c=>{
    const hay=(c.innerText+' '+c.dataset.search).toLowerCase();
    c.classList.toggle('hidden-by-search',q && !hay.includes(q));
  });
  if(q){document.getElementById('insights').scrollIntoView({behavior:'smooth'});}
});
