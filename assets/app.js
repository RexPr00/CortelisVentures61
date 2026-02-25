
const qs=(s,p=document)=>p.querySelector(s),qsa=(s,p=document)=>[...p.querySelectorAll(s)];
qsa('[data-lang]').forEach(w=>{const b=qs('.pill',w);b.addEventListener('click',()=>w.classList.toggle('open'));document.addEventListener('click',e=>{if(!w.contains(e.target))w.classList.remove('open')})});
const burger=qs('.burger'),drawer=qs('.drawer'),ov=qs('.overlay'),closeBtn=qs('.close');
let lastFocus=null;
const focusables='a,button,input,[tabindex]:not([tabindex="-1"])';
function lock(v){document.body.style.overflow=v?'hidden':''}
function trap(e){if(!drawer.classList.contains('open')||e.key!=='Tab')return;const f=qsa(focusables,drawer);if(!f.length)return;const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
function openD(){lastFocus=document.activeElement;drawer.classList.add('open');ov.classList.add('open');drawer.setAttribute('aria-hidden','false');burger.setAttribute('aria-expanded','true');lock(true);qsa(focusables,drawer)[0]?.focus()}
function closeD(){drawer.classList.remove('open');ov.classList.remove('open');drawer.setAttribute('aria-hidden','true');burger.setAttribute('aria-expanded','false');lock(false);lastFocus?.focus()}
burger?.addEventListener('click',openD);closeBtn?.addEventListener('click',closeD);ov?.addEventListener('click',closeD);document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeD();closeModal()}trap(e)});
qsa('.faq-item').forEach(item=>qs('.faq-q',item).addEventListener('click',()=>{qsa('.faq-item').forEach(x=>x!==item&&x.classList.remove('open'));item.classList.toggle('open')}));
const modal=qs('.modal');
function openModal(){modal?.classList.add('open');modal?.setAttribute('aria-hidden','false');lock(true)}
function closeModal(){modal?.classList.remove('open');modal?.setAttribute('aria-hidden','true');lock(false)}
qs('[data-modal-open]')?.addEventListener('click',e=>{e.preventDefault();openModal()});qsa('[data-modal-close]').forEach(b=>b.addEventListener('click',closeModal));modal?.addEventListener('click',e=>{if(e.target===modal)closeModal()});
const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:560,fill:'forwards'});io.unobserve(en.target)}}),{threshold:.14});
qsa('section,.review,.faq-item').forEach(el=>{el.style.opacity=.01;io.observe(el)});
