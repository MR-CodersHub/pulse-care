/* 
==================================================
PulseCare Premium Healthcare Template JS
Dashboard Controller (Tabs, Custom CSS/SVG Charts, Metrics Filtering)
==================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Dashboard Tab Switcher ---
  const dbMenuLinks = document.querySelectorAll('.db-menu-link');
  const dbTabPanes = document.querySelectorAll('.db-tab-pane');

  if (dbMenuLinks.length > 0 && dbTabPanes.length > 0) {
    dbMenuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetTab = link.dataset.tab;
        if (!targetTab) return; // Allow normal link redirection for home/logout

        e.preventDefault();

        // Remove active class from all links
        dbMenuLinks.forEach(item => item.classList.remove('active'));
        // Add active to clicked link
        link.classList.add('active');

        // Hide all tab panes
        dbTabPanes.forEach(pane => {
          pane.style.display = 'none';
          pane.classList.remove('fade-in-up');
        });

        // Show target pane
        const targetPane = document.getElementById(targetTab);
        if (targetPane) {
          targetPane.style.display = 'block';
          targetPane.classList.add('fade-in-up');
        }
      });
    });
  }

  // --- 2. Animate CSS Bar Chart Heights on Load ---
  const barFills = document.querySelectorAll('.bar-fill');
  if (barFills.length > 0) {
    setTimeout(() => {
      barFills.forEach(bar => {
        const height = bar.dataset.height;
        if (height) {
          bar.style.height = height + '%';
        }
      });
    }, 400);
  }

  // --- 3. Interactive SVG Path Animation ---
  const animateSvgChart = () => {
    const chartPath = document.querySelector('.chart-data-line');
    if (chartPath) {
      const length = chartPath.getTotalLength();
      chartPath.style.strokeDasharray = length;
      chartPath.style.strokeDashoffset = length;
      
      // Force repaint
      chartPath.getBoundingClientRect();
      
      // Transition path drawing
      chartPath.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)';
      chartPath.style.strokeDashoffset = '0';
    }
  };

  setTimeout(animateSvgChart, 600);

  // --- 4. Search Filter for Admin Appointments Table ---
  const tableSearch = document.getElementById('db-table-search');
  const appointmentRows = document.querySelectorAll('.db-table tbody tr');

  if (tableSearch && appointmentRows.length > 0) {
    tableSearch.addEventListener('input', () => {
      const query = tableSearch.value.toLowerCase().trim();
      
      appointmentRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(query)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  // --- 5. User Panel Notifications Dismissal ---
  const notificationCloseBtns = document.querySelectorAll('.noti-close');
  notificationCloseBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const notificationCard = btn.closest('.noti-card');
      if (notificationCard) {
        notificationCard.style.opacity = '0';
        notificationCard.style.transform = 'scale(0.9)';
        setTimeout(() => {
          notificationCard.remove();
        }, 300);
      }
    });
  });

  // --- 6. Mobile Dashboard Menu Toggle ---
  const dbMenuToggler = document.querySelector('.db-menu-toggle');
  const dbSidebar = document.querySelector('.db-sidebar');

  if (dbMenuToggler && dbSidebar) {
    dbMenuToggler.addEventListener('click', (e) => {
      e.preventDefault();
      dbSidebar.classList.toggle('active');
    });

    // Close sidebar when clicking menu items on mobile
    dbMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        dbSidebar.classList.remove('active');
      });
    });
  }
});
