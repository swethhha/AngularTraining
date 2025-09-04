export function useReveal(root: Element | Document = document){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e=>{
      if(e.isIntersecting) {
        (e.target as HTMLElement).classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  const els = root.querySelectorAll('.reveal');
  els.forEach(el => io.observe(el));
}
