// Mobile menu
const burger=document.querySelector('.burger'),links=document.getElementById('links');
if(burger&&links){
  burger.addEventListener('click',()=>{const o=links.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
  links.addEventListener('click',()=>{links.classList.remove('open');burger.setAttribute('aria-expanded','false')});
}

// Hero live chart + price
const pts=[],line=document.getElementById('line'),price=document.getElementById('price');
if(line&&price){
  let p=24318.4;for(let i=0;i<30;i++)pts.push(45);
  function tick(){p+=(Math.random()-.48)*8;pts.push(Math.max(8,Math.min(82,pts[pts.length-1]+(Math.random()-.5)*14)));pts.shift();
  line.setAttribute('points',pts.map((y,i)=>`${i*10.3},${y}`).join(' '));price.textContent=p.toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2})}
  tick();setInterval(tick,1200);
}

// Solutions dashboard live chart + price
const solutionsLine=document.getElementById('solutions-line'),solutionsPrice=document.getElementById('solutions-price');
if(solutionsLine&&solutionsPrice){
  const solutionsPoints=Array.from({length:30},(_,i)=>86-i*2.1);
  let solutionsValue=24319.4;
  const renderSolutionsLine=()=>solutionsLine.setAttribute('points',solutionsPoints.map((y,i)=>`${i*14.48},${y}`).join(' '));
  renderSolutionsLine();
  function tickSolutions(){
    solutionsValue+=(Math.random()-.48)*8;
    solutionsPoints.push(Math.max(8,Math.min(88,solutionsPoints[solutionsPoints.length-1]+(Math.random()-.5)*14)));
    solutionsPoints.shift();
    renderSolutionsLine();
    solutionsPrice.textContent=solutionsValue.toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2});
  }
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    tickSolutions();setInterval(tickSolutions,1200);
  }
}

// Stats count-up
const statEls=document.querySelectorAll('[data-n]');
if(statEls.length&&'IntersectionObserver'in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);
  const el=e.target,n=+el.dataset.n,s=el.dataset.s;let t=0;const id=setInterval(()=>{t+=n/40;if(t>=n){t=n;clearInterval(id)}el.textContent=Math.round(t)+s},25)}),{threshold:.6});
  statEls.forEach(el=>io.observe(el));
}

// Testimonial slider
const slides=[...document.querySelectorAll('.slide')],dots=document.querySelector('.dots');
const next=document.querySelector('.next'),prev=document.querySelector('.prev');
if(slides.length&&dots&&next&&prev){
  let cur=0,timer;
  slides.forEach(()=>dots.appendChild(document.createElement('i')));
  function show(i){cur=(i+slides.length)%slides.length;slides.forEach((s,k)=>s.classList.toggle('on',k===cur));[...dots.children].forEach((d,k)=>d.classList.toggle('on',k===cur))}
  function auto(){clearInterval(timer);timer=setInterval(()=>show(cur+1),6000)}
  next.onclick=()=>{show(cur+1);auto()};
  prev.onclick=()=>{show(cur-1);auto()};
  show(0);auto();
}

// FAQ category and text filters
const faqList=document.querySelector('.faq-list'),faqSearch=document.getElementById('faq-search');
if(faqList&&faqSearch){
  const faqItems=[...faqList.querySelectorAll('details[data-category]')];
  const faqFilters=[...document.querySelectorAll('.faq-filter[data-category]')];
  const faqEmpty=faqList.querySelector('.faq-empty');
  let activeCategory='all';
  function filterFaqs(){
    const query=faqSearch.value.trim().toLocaleLowerCase();
    let visibleCount=0;
    faqItems.forEach(item=>{
      const matchesCategory=activeCategory==='all'||item.dataset.category===activeCategory;
      const matchesQuery=!query||item.textContent.toLocaleLowerCase().includes(query);
      item.hidden=!(matchesCategory&&matchesQuery);
      if(!item.hidden)visibleCount++;
    });
    if(faqEmpty)faqEmpty.hidden=visibleCount>0;
  }
  faqFilters.forEach(button=>button.addEventListener('click',()=>{
    activeCategory=button.dataset.category;
    faqFilters.forEach(filter=>{
      const isActive=filter===button;
      filter.classList.toggle('active',isActive);
      filter.setAttribute('aria-pressed',String(isActive));
    });
    filterFaqs();
  }));
  faqSearch.addEventListener('input',filterFaqs);
  filterFaqs();
}

// Pulse product popup
(()=>{
  const slides=[
    {src:'Pulse/pulse_1.png',alt:'Pulse market intelligence workspace with a live NIFTY 50 chart',label:'Market intelligence'},
    {src:'Pulse/pulse_2.png',alt:'Pulse options analytics dashboard with strike-level data',label:'Options analytics'},
    {src:'Pulse/pulse_3.png',alt:'Pulse strategy builder with option legs and payoff analysis',label:'Strategy builder'},
    {src:'Pulse/pulse_5.png',alt:'Pulse company research workspace with financial metrics',label:'Research and insights'},
    {src:'Pulse/pulse_6.png',alt:'Pulse market heatmaps showing sector performance',label:'Market heatmaps'}
  ];
  const dismissedKey='marsquant-pulse-popup-dismissed';
  try{
    if(sessionStorage.getItem(dismissedKey)==='true')return;
  }catch(error){
    if(!(error instanceof DOMException))throw error;
  }

  const popup=document.createElement('aside');
  popup.className='pulse-popup';
  popup.setAttribute('role','dialog');
  popup.setAttribute('aria-label','Discover Pulse by MarsQuant');
  popup.setAttribute('aria-hidden','true');
  popup.innerHTML=`
    <button class="pulse-popup-close" type="button" aria-label="Close Pulse promotion">&times;</button>
    <div class="pulse-popup-visual">
      <a class="pulse-popup-image-link" href="https://pulse.marsquant.in/" tabindex="-1">
        <img class="pulse-popup-image" src="${slides[0].src}" alt="${slides[0].alt}">
      </a>
      <div class="pulse-popup-dots" role="group" aria-label="Choose a Pulse preview"></div>
    </div>
    <div class="pulse-popup-content">
      <p class="pulse-popup-eyebrow">Pulse by MarsQuant</p>
      <h2>Make your next market move with clarity.</h2>
      <p class="pulse-popup-description">Explore market intelligence, options analytics, strategy tools, and research in one workspace.</p>
      <a class="pulse-popup-cta" href="https://pulse.marsquant.in/">Explore Pulse <span aria-hidden="true">&rarr;</span></a>
    </div>
  `;
  document.body.appendChild(popup);

  const image=popup.querySelector('.pulse-popup-image');
  const dots=popup.querySelector('.pulse-popup-dots');
  const closeButton=popup.querySelector('.pulse-popup-close');
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeIndex=0;
  let rotationTimer;
  let imageTimer;

  function showSlide(index){
    activeIndex=(index+slides.length)%slides.length;
    const slide=slides[activeIndex];
    image.classList.add('is-changing');
    window.clearTimeout(imageTimer);
    imageTimer=window.setTimeout(()=>{
      image.src=slide.src;
      image.alt=slide.alt;
      [...dots.children].forEach((dot,dotIndex)=>{
        dot.classList.toggle('is-active',dotIndex===activeIndex);
        dot.setAttribute('aria-pressed',String(dotIndex===activeIndex));
      });
      image.classList.remove('is-changing');
    },160);
  }

  slides.forEach((slide,index)=>{
    const dot=document.createElement('button');
    dot.className='pulse-popup-dot';
    dot.type='button';
    dot.setAttribute('aria-label',`Show ${slide.label} preview`);
    dot.setAttribute('aria-pressed',String(index===0));
    dot.classList.toggle('is-active',index===0);
    dot.addEventListener('click',()=>showSlide(index));
    dots.appendChild(dot);
  });

  function startRotation(){
    if(!reduceMotion.matches&&!rotationTimer){
      rotationTimer=window.setInterval(()=>showSlide(activeIndex+1),4800);
    }
  }
  function stopRotation(){
    window.clearInterval(rotationTimer);
    rotationTimer=undefined;
  }

  popup.addEventListener('mouseenter',stopRotation);
  popup.addEventListener('mouseleave',startRotation);
  popup.addEventListener('focusin',stopRotation);
  popup.addEventListener('focusout',event=>{
    if(!popup.contains(event.relatedTarget))startRotation();
  });
  reduceMotion.addEventListener?.('change',()=>{
    if(reduceMotion.matches)stopRotation();
    else startRotation();
  });
  closeButton.addEventListener('click',()=>{
    popup.classList.remove('is-visible');
    popup.setAttribute('aria-hidden','true');
    stopRotation();
    window.clearTimeout(imageTimer);
    try{
      sessionStorage.setItem(dismissedKey,'true');
    }catch(error){
      if(!(error instanceof DOMException))throw error;
    }
    window.setTimeout(()=>popup.remove(),350);
  });

  window.setTimeout(()=>{
    popup.classList.add('is-visible');
    popup.setAttribute('aria-hidden','false');
    startRotation();
  },3200);
})();
