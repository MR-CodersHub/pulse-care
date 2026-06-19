/* 
==================================================
PulseCare Premium Healthcare Template JS
Validation Module (Real-time and Regex Client-Side Form Checking)
==================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // Select all forms that require client-side validation
  const validateForms = document.querySelectorAll('.needs-validation');

  // Core regular expressions
  const regexPatterns = {
    name: /^[a-zA-Z\s]{3,30}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\+?[0-9]{8,15}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  };

  const validateInput = (input) => {
    const type = input.dataset.validation;
    const value = input.value.trim();
    let isValid = true;
    
    if (input.hasAttribute('required') && value === '') {
      isValid = false;
    } else if (value !== '') {
      if (type && regexPatterns[type]) {
        isValid = regexPatterns[type].test(value);
      }
    }

    if (isValid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    }

    return isValid;
  };

  // Attach real-time validating event listeners
  validateForms.forEach(form => {
    const inputs = form.querySelectorAll('[data-validation]');
    
    inputs.forEach(input => {
      // Validate on input changes and blur events
      input.addEventListener('input', () => validateInput(input));
      input.addEventListener('blur', () => validateInput(input));
    });

    // Form submit blocker if invalid
    form.addEventListener('submit', (e) => {
      let isFormValid = true;
      inputs.forEach(input => {
        const isValid = validateInput(input);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        e.preventDefault();
        e.stopPropagation();
        
        // Scroll to the first invalid field for better UX
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.focus();
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        // Mock successful form submission
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
          const originalHTML = submitBtn.innerHTML;
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<div class="spinner"></div> Sending...';
          
          e.preventDefault(); // Stop actual submit since it's frontend-only
          
          setTimeout(() => {
            submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Success!';
            submitBtn.style.backgroundColor = 'var(--success)';
            form.reset();
            
            // Clear valid indicator circles
            inputs.forEach(input => input.classList.remove('is-valid'));
            
            setTimeout(() => {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalHTML;
              submitBtn.style.backgroundColor = '';
            }, 2500);
          }, 1500);
        }
      }
    });
  });

  // Password strength meter specific logic (if element exists)
  const pwdInput = document.querySelector('.password-strength-input');
  const strengthMeter = document.querySelector('.password-strength-meter');
  const strengthLabel = document.querySelector('.password-strength-label');

  if (pwdInput && strengthMeter) {
    pwdInput.addEventListener('input', () => {
      const val = pwdInput.value;
      let score = 0;

      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[@$!%*?&]/.test(val)) score++;

      strengthMeter.className = 'password-strength-meter'; // reset classes
      
      if (val.length === 0) {
        strengthMeter.style.width = '0';
        strengthLabel.textContent = '';
      } else if (score <= 1) {
        strengthMeter.style.width = '25%';
        strengthMeter.classList.add('weak');
        strengthLabel.textContent = 'Weak';
        strengthLabel.style.color = 'var(--danger)';
      } else if (score <= 3) {
        strengthMeter.style.width = '60%';
        strengthMeter.classList.add('medium');
        strengthLabel.textContent = 'Medium';
        strengthLabel.style.color = 'var(--warning)';
      } else {
        strengthMeter.style.width = '100%';
        strengthMeter.classList.add('strong');
        strengthLabel.textContent = 'Strong';
        strengthLabel.style.color = 'var(--success)';
      }
    });
  }

  // Password visibility peek toggles
  const peekToggles = document.querySelectorAll('.password-peek-toggle');
  peekToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.closest('.form-group') || toggle.parentElement;
      const pwdInput = parent.querySelector('input');
      const icon = toggle.querySelector('i');
      
      if (pwdInput && icon) {
        if (pwdInput.type === 'password') {
          pwdInput.type = 'text';
          icon.className = 'fa-solid fa-eye-slash';
        } else {
          pwdInput.type = 'password';
          icon.className = 'fa-solid fa-eye';
        }
      }
    });
  });
});
