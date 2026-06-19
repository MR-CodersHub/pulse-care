/* 
==================================================
PulseCare Premium Healthcare Template JS
Main Global Controller (Navigation, Scrolling, Filters, and Reveal Observers)
==================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. Sticky Header ---
  const header = document.querySelector('.header');
  const topbar = document.querySelector('.topbar');
  
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('sticky');
      if (topbar) {
        topbar.style.marginTop = `-${topbar.offsetHeight}px`;
      }
    } else {
      header.classList.remove('sticky');
      if (topbar) {
        topbar.style.marginTop = '0';
      }
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial call
  
  // --- 2. Mobile Sidebar Navigation ---
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileSidebar = document.querySelector('.mobile-sidebar');
  const mobileSidebarClose = document.querySelector('.mobile-sidebar-close');
  
  // Create and append backdrop dynamically
  const backdrop = document.createElement('div');
  backdrop.className = 'mobile-sidebar-backdrop';
  document.body.appendChild(backdrop);
  
  const openSidebar = () => {
    if (mobileSidebar) mobileSidebar.classList.add('open');
    backdrop.classList.add('show');
    document.body.style.overflow = 'hidden'; // block scrolling
  };
  
  const closeSidebar = () => {
    if (mobileSidebar) mobileSidebar.classList.remove('open');
    backdrop.classList.remove('show');
    document.body.style.overflow = ''; // allow scrolling
  };
  
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', openSidebar);
  }
  
  if (mobileSidebarClose) {
    mobileSidebarClose.addEventListener('click', closeSidebar);
  }
  
  backdrop.addEventListener('click', closeSidebar);
  
  // Mobile sidebar submenus accordion
  const sidebarLinksWithDropdown = document.querySelectorAll('.mobile-sidebar-link[data-dropdown]');
  sidebarLinksWithDropdown.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = link.closest('.mobile-sidebar-item');
      const dropdown = parent.querySelector('.mobile-sidebar-dropdown');
      const icon = link.querySelector('i');
      
      if (dropdown) {
        const isOpen = dropdown.classList.toggle('open');
        if (icon) {
          icon.style.transform = isOpen ? 'rotate(180deg)' : '';
        }
      }
    });
  });

  // --- 3. Scroll to Top Button ---
  const backToTop = document.querySelector('.back-to-top');
  
  const toggleBackToTop = () => {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  };
  
  window.addEventListener('scroll', toggleBackToTop);
  
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 4. Global Accordion Handler ---
  const accordions = document.querySelectorAll('.accordion');
  accordions.forEach(acc => {
    const header = acc.querySelector('.accordion-header');
    const content = acc.querySelector('.accordion-content');
    
    if (header && content) {
      header.addEventListener('click', (e) => {
        e.preventDefault();
        
        const isActive = acc.classList.contains('active');
        
        // Close sibling accordions in the same list group (optional, classical behavior)
        const siblingGroup = acc.parentElement.querySelectorAll('.accordion');
        siblingGroup.forEach(sibling => {
          sibling.classList.remove('active');
          const siblingContent = sibling.querySelector('.accordion-content');
          if (siblingContent) {
            siblingContent.style.maxHeight = null;
          }
        });
        
        if (!isActive) {
          acc.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          acc.classList.remove('active');
          content.style.maxHeight = null;
        }
      });
    }
  });

  // --- 5. Interactive Pricing Switcher ---
  const pricingSwitch = document.getElementById('pricing-billing-switch');
  const pricePeriodLabels = document.querySelectorAll('.price-period');
  const priceValues = document.querySelectorAll('.price-value');

  if (pricingSwitch) {
    pricingSwitch.addEventListener('change', () => {
      const isYearly = pricingSwitch.checked;
      
      priceValues.forEach(price => {
        const monthly = parseFloat(price.dataset.monthly);
        const yearly = parseFloat(price.dataset.yearly);
        
        // Simple counter ticking simulation
        let start = isYearly ? monthly : yearly;
        let end = isYearly ? yearly : monthly;
        let duration = 300;
        let startTime = null;

        const animate = (timestamp) => {
          if (!startTime) startTime = timestamp;
          let progress = timestamp - startTime;
          let percent = Math.min(progress / duration, 1);
          let current = start + (end - start) * percent;
          price.textContent = '$' + Math.round(current);

          if (percent < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      });

      pricePeriodLabels.forEach(label => {
        label.textContent = isYearly ? '/year' : '/month';
      });
    });
  }

  // --- 6. Services & Blog Visual Filter Tabs ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('.filter-item');

  if (filterBtns.length > 0 && filterItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterVal = btn.dataset.filter;
        
        filterItems.forEach(item => {
          if (filterVal === 'all' || item.dataset.category === filterVal) {
            item.style.display = '';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // --- 7. FAQ Live Query Search ---
  const faqSearchInput = document.getElementById('faq-search-input');
  const faqAccordions = document.querySelectorAll('.faq-accordion-group .accordion');

  if (faqSearchInput && faqAccordions.length > 0) {
    faqSearchInput.addEventListener('input', () => {
      const query = faqSearchInput.value.toLowerCase().trim();
      
      faqAccordions.forEach(acc => {
        const text = acc.textContent.toLowerCase();
        if (text.includes(query)) {
          acc.style.display = '';
        } else {
          acc.style.display = 'none';
        }
      });
    });
  }

  // --- 8. Intersection Observer for Scroll Reveals ---
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // trigger animation once
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
  }
});
