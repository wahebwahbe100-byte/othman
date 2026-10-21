/* The entrance animation system used by BABIN BAU, mapped to OTHMAN's elements. */
(()=>{
 'use strict';
 const media=window.matchMedia('(prefers-reduced-motion: reduce)');
 if(media.matches||!('IntersectionObserver' in window))return;
 const elements=new Set();
 const add=(selector,opt={})=>{
  [...document.querySelectorAll(selector)].forEach((el,i)=>{
   if(el.closest('dialog, [hidden], .hero-slider')||elements.has(el))return;
   el.classList.add('scroll-reveal');
   let direction=typeof opt.direction==='function'?opt.direction(el,i):opt.direction;
   if(direction==='left'||direction==='right')el.classList.add('reveal-'+direction);
   const n=opt.columns?i%opt.columns:i;
   if(opt.step)el.style.setProperty('--reveal-delay',Math.min(n*opt.step,420)+'ms');
   elements.add(el);
  });
 };
 // The same gentle, staged rhythm as BABIN BAU on the home page.
 add('.trust-grid>.trust-item',{step:110});
 add('.section-head');
 add('.service-grid>.service-card',{step:95,columns:4});
 add('.split-feature>.feature-photo',{direction:'left'});
 add('.split-feature>.feature-copy',{direction:'right'});
 add('.work-showcase .gallery-section-header');
 add('.othman-gallery>.project-card',{step:75,columns:4});
 add('.process-home .steps>.step',{step:135,columns:3});
 add('.cta-inner');
 // Internal pages.
 add('.service-detail .detail-image',{direction:(_,i)=>i%2?'right':'left'});
 add('.service-detail .detail-copy',{direction:(_,i)=>i%2?'left':'right'});
 add('.service-detail .detail-content',{direction:(_,i)=>i%2?'left':'right'});
 add('.service-jumps>*',{step:80,columns:4});
 add('.faq-intro',{direction:'left'});
 add('.faq-list>details',{direction:'right',step:100});
 add('.about-intro>*',{direction:(_,i)=>i%2?'right':'left'});
 add('.values-grid>.value',{step:110,columns:3});
 add('.area-inner>*',{direction:(_,i)=>i%2?'right':'left'});
 add('.contact-grid>.contact-aside',{direction:'left'});
 add('.contact-grid>.request-panel',{direction:'right'});
 const root=document.documentElement;
 if(!elements.size)return;
 root.classList.add('othman-motion-ready');
 const observer=new IntersectionObserver(records=>{
  records.forEach(r=>{
   if(!r.isIntersecting)return;
   r.target.classList.add('is-revealed');
   observer.unobserve(r.target);
  });
 },{threshold:.06,rootMargin:'0px 0px -3% 0px'});
 requestAnimationFrame(()=>{
  for(const node of elements){
   const rect=node.getBoundingClientRect();
   if(rect.bottom<0)node.classList.add('is-revealed');
   else observer.observe(node);
  }
 });
 media.addEventListener?.('change',ev=>{
  if(ev.matches){root.classList.remove('othman-motion-ready');observer.disconnect();elements.forEach(el=>el.classList.add('is-revealed'));}
 });
})();
