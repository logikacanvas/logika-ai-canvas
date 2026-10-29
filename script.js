const ARTICLES = [
  {
    title:"Inside My AI Project Manager Agent. Part 3",
    category:"AI AGENTS + PROJECT MANAGEMENT",
    description:"From LLM-Centric to Deterministic Architecture",
    date:"Oct 13, 2026",
    readTime:"5 min read",
    url:"https://medium.com/logika-ai-canvas/inside-my-ai-project-manager-agent-part-3-75105c41c052?source=friends_link&sk=5752f1b230a69768f4d546d0cd348066"
  },
  {
    title:"How to Automate Project Management Tasks Using AI. Part 2",
    category:"AI AGENTS + PROJECT MANAGEMENT",
    description:"From Asana tasks to AI analysis and Slack updates",
    date:"Oct 5, 2026",
    readTime:"7 min read",
    url:"https://medium.com/logika-ai-canvas/how-to-automate-project-management-tasks-using-ai-part-2-af8a0d8fcf9b"
  },
  {
    title:"How I Built an AI Project Manager Agent Using Free Tools. Part 1",
    category:"AI AGENTS + PROJECT MANAGEMENT",
    description:"The goal, architecture and setting up the local AI workflow",
    date:"Sep 28, 2026",
    readTime:"7 min read",
    url:"https://medium.com/logika-ai-canvas/how-i-built-an-ai-project-manager-agent-using-free-tools-part-1-925b752d548c?source=friends_link&sk=c1fba617c917583ac5697032e74453f7"
  }
];

const container=document.getElementById("latest-insights");
ARTICLES.forEach(article=>{
  const a=document.createElement("a");
  a.className="latest-card";
  a.href=article.url;
  a.target="_blank";
  a.rel="noopener noreferrer";
  a.innerHTML='<p class="micro">'+article.category+'</p><h3>'+article.title+'</h3><p>'+article.description+'</p><div class="latest-meta"><span>'+article.readTime+' · '+article.date+'</span><b>Read article →</b></div>';
  container?.appendChild(a);
});

const nav=document.querySelector(".main-nav");
const menu=document.querySelector(".menu-toggle");
menu?.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menu.setAttribute("aria-expanded",String(open));
});
document.querySelectorAll(".main-nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const navLinks=[...document.querySelectorAll(".main-nav a[data-section]")];
const sections=navLinks.map(a=>document.getElementById(a.dataset.section)).filter(Boolean);
const setActive=()=>{
  const y=window.scrollY+120;
  let current="home";
  sections.forEach(s=>{if(s.offsetTop<=y) current=s.id;});
  navLinks.forEach(a=>a.classList.toggle("active",a.dataset.section===current));
};
window.addEventListener("scroll",setActive,{passive:true});
setActive();
