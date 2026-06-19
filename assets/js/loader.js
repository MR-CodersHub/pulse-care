/* 
==================================================
PulseCare Premium Healthcare Template JS
Loader Module (Skeletons, Shimmers, and Pre-rendering delays)
==================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // Simulate network fetching on elements containing skeletons
  const skeletons = document.querySelectorAll('.skeleton-loading-state');
  const actualContents = document.querySelectorAll('.actual-content-state');
  
  if (skeletons.length > 0) {
    // Hide actual content at first
    actualContents.forEach(el => {
      el.style.display = 'none';
      el.style.opacity = '0';
    });

    // Simulate API fetch delay
    setTimeout(() => {
      skeletons.forEach(el => {
        el.style.opacity = '0';
        setTimeout(() => {
          el.style.display = 'none';
        }, 300); // fade out duration
      });

      actualContents.forEach(el => {
        setTimeout(() => {
          el.style.display = '';
          el.style.opacity = '1';
          el.classList.add('fade-in-up'); // adds entry effect
        }, 320);
      });
    }, 1200); // simulated load time (1.2 seconds)
  }

  // Preloader element handling if any exists in pages
  const preloader = document.getElementById('page-preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });
  }
});
