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
