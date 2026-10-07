const dialog=document.querySelector('dialog');document.querySelectorAll('[data-zoom]').forEach(img=>img.addEventListener('click',()=>{dialog.querySelector('img').src=img.src;dialog.querySelector('img').alt=img.alt;dialog.showModal()}));dialog?.querySelector('button').addEventListener('click',()=>dialog.close());dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.querySelectorAll('[data-zoom]').forEach(img=>img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();img.click()}}));

const motionOK=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const nativeTransitions='startViewTransition' in document;
if(motionOK && 'IntersectionObserver' in window){
 const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:0.08});
 document.querySelectorAll('.card,.about,.extra,.contact,.story section').forEach(el=>{el.classList.add('reveal');revealObserver.observe(el)});
}
if(motionOK && !nativeTransitions){
 document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||a.hasAttribute('download')||a.target||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;const url=new URL(a.href,location.href);if(url.origin!==location.origin||url.pathname===location.pathname||!url.pathname.endsWith('.html'))return;e.preventDefault();document.body.classList.add('page-leaving');setTimeout(()=>location.assign(url.href),180)});
}
window.addEventListener('pageshow',()=>{document.body.classList.remove('page-leaving');});
if(document.querySelector('.story')){const bar=document.createElement('div');bar.className='scroll-progress';bar.setAttribute('aria-hidden','true');document.body.append(bar);let queued=false;function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${max>0?Math.min(1,Math.max(0,scrollY/max)):0})`;queued=false}addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(updateProgress)}},{passive:true});addEventListener('resize',updateProgress);updateProgress();if('IntersectionObserver' in window){const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('.toc a').forEach(a=>{if(a.hash==='#'+e.target.id)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')})}})},{rootMargin:'-15% 0px -60% 0px'});document.querySelectorAll('.story section').forEach(s=>sectionObserver.observe(s))}}
