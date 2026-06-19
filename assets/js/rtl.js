/* 
==================================================
PulseCare Premium Healthcare Template JS
RTL Module (Bi-directional Toggle & Language Switcher)
==================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  const langToggleBtns = document.querySelectorAll('.lang-toggle');
  
  // 1. Get initial direction layout state
  const getDirectionPreference = () => {
    return localStorage.getItem('direction') || 'ltr';
  };

  const applyDirection = (dir) => {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('direction', dir);
    
    // Update language toggle buttons aria-label (icon stays the same)
    langToggleBtns.forEach(btn => {
      if (dir === 'rtl') {
        btn.setAttribute('aria-label', 'Switch Layout to LTR');
      } else {
        btn.setAttribute('aria-label', 'Switch Layout to RTL');
      }
    });

    // In a real application, lang attribute would also change
    document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
  };

  // 2. Initialize layout direction
  const currentDirection = getDirectionPreference();
  applyDirection(currentDirection);

  // 3. Listen for language switch triggers
  langToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const newDirection = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(newDirection);
      
      // Reload is not required since styles are dynamically toggled via html[dir="rtl"] select rules!
    });
  });
});
