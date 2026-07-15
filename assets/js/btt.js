document.addEventListener("DOMContentLoaded", () => {
  const btt = document.getElementById('backToTop');
  if (!btt) return;

  const updateProgress = () => {
    // Calculate scroll percentage
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Avoid division by zero on very short pages
    let p = 0;
    if (docHeight > 0) {
      p = scrollTop / docHeight;
    }
    
    // Show button if scrolled more than 100px, otherwise hide
    if (scrollTop > 100) {
      btt.classList.add('show');
    } else {
      btt.classList.remove('show');
    }

    // Set custom property for CSS stroke-dashoffset calculation
    btt.style.setProperty('--p', p);
  };

  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateProgress);
  }, { passive: true });

  // Handle click to scroll top smoothly
  btt.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Init
  updateProgress();
});
