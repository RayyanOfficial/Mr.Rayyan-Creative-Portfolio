// Year
document.getElementById('year').textContent = new Date().getFullYear();

// AOS
AOS.init({ duration: 900, once: false, offset: 80, easing: 'ease-out-quart' });

// GSAP intro
gsap.from('.nav', { y: -40, opacity: 0, duration: 0.6, ease: 'power2.out' });
gsap.from('.hero__title', { y: 20, opacity: 0, duration: 0.8, delay: .2 });
gsap.from('.hero__sub', { y: 20, opacity: 0, duration: 0.8, delay: .35 });
gsap.from('.hero__cta .btn', { y: 20, opacity: 0, duration: 0.6, delay: .45, stagger: .1 });

// Typing effect
const typingEl = document.querySelector('.hero__typing');
const roles = ['Front-End Developer', 'React Enthusiast', 'Animation Lover', 'Clean Coding'];
let idx = 0, char = 0, deleting = false;
function typeLoop(){
  const text = roles[idx];
  typingEl.textContent = deleting ? text.slice(0, --char) : text.slice(0, ++char);
  if(!deleting && char === text.length){ deleting = true; setTimeout(typeLoop, 1200); return; }
  if(deleting && char === 0){ deleting = false; idx = (idx+1)%roles.length; }
  setTimeout(typeLoop, deleting ? 50 : 80);
}
typeLoop();

// Stats counter
document.querySelectorAll('.stat__num').forEach(el=>{
  const end = +el.dataset.count;
  const obs = new IntersectionObserver(([e])=>{
    if(e.isIntersecting){
      let cur = 0; const step = Math.max(1, Math.round(end/60));
      const int = setInterval(()=>{ cur+=step; if(cur>=end){cur=end; clearInterval(int);} el.textContent = cur; }, 20);
      obs.disconnect();
    }
  }, {threshold: .6});
  obs.observe(el);
});

// Skill bars
document.querySelectorAll('.skill').forEach(s=>{
  const value = +s.dataset.value/100;
  const bar = document.createElement('div'); bar.className = 'bar';
  s.appendChild(bar);
  gsap.fromTo(bar, {scaleX:0}, {
    scaleX:value,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {trigger: s, start: 'top 80%'}
  });
});

// Fancy cursor
const c = document.querySelector('.cursor');
const o = document.querySelector('.cursor-outline');
document.addEventListener('mousemove', (e)=>{
  c.style.top = o.style.top = e.clientY + 'px';
  c.style.left = o.style.left = e.clientX + 'px';
});
document.querySelectorAll('a,button,.btn,.project').forEach(el=>{
  el.addEventListener('mouseenter', ()=>{ c.style.transform='translate(-50%,-50%) scale(1.8)'; o.style.transform='translate(-50%,-50%) scale(1.2)'; });
  el.addEventListener('mouseleave', ()=>{ c.style.transform='translate(-50%,-50%) scale(1)'; o.style.transform='translate(-50%,-50%) scale(1)'; });
});

// Small burger animation
const burger = document.querySelector('.burger');
const toggle = document.getElementById('nav-toggle');
burger?.addEventListener('click', ()=>{
  burger.classList.toggle('open');
  burger.querySelector('span').style.transform = toggle.checked ? '' : 'rotate(45deg)';
});

// VanillaTilt is auto-initialized by data-tilt attribute.
