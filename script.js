const ARTICLES = [
  {
    title: "How I Built and Launched My Website with AI, from Prompt to Production",
    category: "AI IN PRACTICE",
    description: "The prompts, tools and workflow I used to take an idea through AI-assisted design, GitHub, Cloudflare and a live domain.",
    date: "2026-09-13",
    displayDate: "Sep 13, 2026",
    readTime: "7 min read",
    url: "https://prakash-raman.medium.com/how-i-built-and-launched-my-website-with-ai-from-prompt-to-production-36cca6c288ab?sharedUserId=prakash-raman",
    search: "website AI prompts tools workflow cloudflare github"
  },
  {
    title: "AI-First Transformation: How to Redesign Work Around Humans and AI Agents",
    category: "AI TRANSFORMATION",
    description: "A practical introduction to moving beyond isolated tools and redesigning work around human judgment, agent capability and measurable outcomes.",
    date: "2026-09-11",
    displayDate: "Sep 11, 2026",
    readTime: "6 min read",
    url: "https://medium.com/logika-ai-canvas/ai-first-transformation-how-to-redesign-work-around-humans-and-ai-agents-ba021da3f683?source=friends_link&sk=e647967bdd1a33fe31aa1192dfae2ebb",
    search: "AI transformation humans agents redesign work"
  },
  {
    title: "Rethinking Definition of Done (DoD) in the Era of AI",
    category: "AGILE + AI",
    description: "A practical path for teams starting with AI-assisted delivery.",
    date: "2026-08-31",
    displayDate: "Aug 31, 2026",
    readTime: "5 min read",
    url: "https://prakash-raman.medium.com/rethinking-definition-of-done-dod-in-the-era-of-ai-43ca75cb33c0?source=friends_link&sk=acb1d739adba038d60c542304bb802b5",
    search: "definition of done dod AI agile assisted delivery"
  },
  {
    title: "How to Build an AI-Powered Retrospective Summarizer Using Google Gemini",
    category: "AI TOOLS + AGILE",
    description: "A hands-on experiment turning meeting notes into structured insights.",
    date: "2025-10-11",
    displayDate: "Oct 11, 2025",
    readTime: "9 min read",
    url: "https://prakash-raman.medium.com/how-to-build-an-ai-powered-retrospective-summarizer-using-google-gemini-ed8b2e24ebf3?source=friends_link&sk=d5e16c06b25f28a22b1256d74e1eddcf",
    search: "retrospective summarizer google gemini python gradio agile"
  },
  {
    title: "From Zero to Hello: Connect Python to Google Gemini via API Key",
    category: "GEMINI + PYTHON",
    description: "Windows + VS Code + Python 3.12 in a few hours.",
    date: "2025-09-21",
    displayDate: "Sep 21, 2025",
    readTime: "5 min read",
    url: "https://prakash-raman.medium.com/from-zero-to-hello-connect-python-to-google-gemini-via-api-key-d83aa427bb5d?source=friends_link&sk=044a569964a916353b6eb3e712af91d3",
    search: "python google gemini api key vscode"
  }
];

const articleCard = (article, type) => {
  const a = document.createElement("a");
  a.className = "article-card " + type;
  a.dataset.search = article.search + " " + article.title + " " + article.category;
  a.href = article.url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.innerHTML = `
    <div class="article-content">
      <p class="micro">${article.category}</p>
      <h4>${article.title}</h4>
      <p>${article.description}</p>
      <div class="article-meta">
        <span>${article.readTime}</span>
        <span>${article.displayDate}</span>
        <b>Read article →</b>
      </div>
    </div>`;
  return a;
};

const sortedArticles = [...ARTICLES].sort((a,b) => new Date(b.date) - new Date(a.date));
const recentContainer = document.getElementById("recent-insights");
const earlierContainer = document.getElementById("earlier-insights");
sortedArticles.slice(0,3).forEach(a => recentContainer?.appendChild(articleCard(a,"featured")));
sortedArticles.slice(3).forEach(a => earlierContainer?.appendChild(articleCard(a,"compact")));

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
const getCards=()=>[...document.querySelectorAll('.article-card[data-search]')];
openBtn?.addEventListener('click',()=>{
  panel.classList.add('open');
  panel.setAttribute('aria-hidden','false');
  setTimeout(()=>input.focus(),50);
});
const closeSearch=()=>{
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden','true');
  input.value='';
  getCards().forEach(c=>c.classList.remove('hidden-by-search'));
};
closeBtn?.addEventListener('click',closeSearch);
panel?.addEventListener('click',e=>{if(e.target===panel) closeSearch();});
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeSearch();});
input?.addEventListener('input',()=>{
  const q=input.value.trim().toLowerCase();
  getCards().forEach(c=>{
    const hay=(c.innerText+' '+c.dataset.search).toLowerCase();
    c.classList.toggle('hidden-by-search',q && !hay.includes(q));
  });
  if(q){document.getElementById('insights').scrollIntoView({behavior:'smooth'});}
});
