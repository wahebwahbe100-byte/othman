(()=>{
'use strict';
const buttons=[...document.querySelectorAll('.projects-page .filter-btn')];
const cards=[...document.querySelectorAll('.projects-page .project-card[data-project]')];
const status=document.querySelector('.gallery-status');
const applyFilter=filter=>{
 let count=0;
 cards.forEach(card=>{const show=filter==='all'||card.dataset.category===filter;card.hidden=!show;if(show)count++});
 buttons.forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.filter===filter)));
 if(status)status.textContent=count+' '+(count===1?'Bild':'Bilder')+' in unserer Galerie';
};
buttons.forEach(btn=>btn.addEventListener('click',()=>applyFilter(btn.dataset.filter)));
applyFilter('all');
const showUnavailable=img=>{const wrap=img.closest('.project-image');if(!wrap)return;wrap.classList.add('is-blocked');const label=wrap.querySelector('.ka-unavailable');if(label)label.hidden=false};
cards.forEach(card=>{
 const img=card.querySelector('.project-image img');
 if(img){img.addEventListener('error',()=>showUnavailable(img));if(img.complete&&!img.naturalWidth)showUnavailable(img)}
});
const media=matchMedia('(prefers-reduced-motion: reduce)');
if(!media.matches&&'IntersectionObserver' in window){
 const obs=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add('is-revealed');obs.unobserve(e.target)}},{threshold:.06,rootMargin:'0px 0px -4% 0px'});
 cards.forEach((el,i)=>{el.classList.add('scroll-reveal');el.style.setProperty('--reveal-delay',(i%3)*90+'ms');obs.observe(el)});
}
})();
