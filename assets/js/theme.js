/* 
==================================================
PulseCare Premium Healthcare Template JS
Theme Module (Light/Dark Mode Toggler & System Preferences)
==================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  
  // 1. Get initial theme state
  const getThemePreference = () => {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update theme toggle button icons
    themeToggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fa-solid fa-sun';
          btn.setAttribute('aria-label', 'Switch to Light Mode');
        } else {
          icon.className = 'fa-solid fa-moon';
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
        }
      }
    });
  };

  // 2. Initialize theme
  const currentTheme = getThemePreference();
  applyTheme(currentTheme);

  // 3. Listen for clicks on the buttons
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  });

  // 4. Listen for system preference updates
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
});
