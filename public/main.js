"use strict";

(function () {

  /* Hamburger menu */

  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navList = document.querySelector('.nav-list');

  const getRootFontSizePx = () => parseFloat(getComputedStyle(document.documentElement).fontSize);

  const isMobileViewport = () => window.innerWidth < 44 * getRootFontSizePx();

  const setNavLinksTabindex = (isAccessible) => {
    const navLinks = navList.querySelectorAll('.nav-link');
    for (const link of navLinks) {
      if (isAccessible) {
        link.removeAttribute('tabindex');
      } else {
        link.setAttribute('tabindex', '-1');
      }
    }
  };

  const syncNavWithViewport = () => {
    if (isMobileViewport()) {
      const isOpen = navList.classList.contains('nav-list-open');
      setNavLinksTabindex(isOpen);
    } else {
      navList.classList.remove('nav-list-open');
      setNavLinksTabindex(true);
    }
  };

  if (hamburgerBtn && navList) {
    // Toggle nav list visibility and link 
    // accessibility when hamburger button is clicked
    hamburgerBtn.addEventListener('click', () => {
      const willBeOpen = !navList.classList.contains('nav-list-open');
      navList.classList.toggle('nav-list-open', willBeOpen);
      setNavLinksTabindex(willBeOpen);
    });

    syncNavWithViewport();
    window.addEventListener('resize', syncNavWithViewport);
  }

  /* Subscribe modal (cats.html only) */

  const modal = document.getElementById('subscribe-modal');

  if (modal) {
    const subscribeBtns = document.querySelectorAll('.subscribe-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const subscribeForm = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('email');
    const confirmInput = document.getElementById('confirm-email');
    const emailError = document.getElementById('email-error');
    const confirmError = document.getElementById('confirm-email-error');

    /* Validation helpers */

    const getEmailError = (value) => {
      // check length
      if (!value.trim()) {
        return 'This field is required';
      }
      if (!value.trim().includes('@')) {
        return 'This field must be a valid email address including a @';
      }
      return '';
    };

    const getConfirmError = (confirmValue, emailValue) => {
      if (!confirmValue.trim()) {
        return 'This field is required';
      }
      if (confirmValue.trim() !== emailValue.trim()) {
        return 'This field must match the provided email address';
      }
      return '';
    };

    const setError = (inputEl, errorEl, message) => {
      errorEl.innerText = message;
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
      if (message) {
        inputEl.classList.add('input-invalid');
      } else {
        inputEl.classList.remove('input-invalid');
      }
    };

    const clearAllErrors = () => {
      setError(emailInput, emailError, '');
      setError(confirmInput, confirmError, '');
    };

    /* Event listeners */

    for (const btn of subscribeBtns) {
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal
      btn.addEventListener('click', () => modal.showModal());
    }

    cancelBtn.addEventListener('click', () => {
      modal.close();
      subscribeForm.reset();
      clearAllErrors();
    });

    emailInput.addEventListener('change', () => {
      setError(emailInput, emailError, getEmailError(emailInput.value));
    });

    confirmInput.addEventListener('change', () => {
      setError(confirmInput, confirmError, getConfirmError(confirmInput.value, emailInput.value));
    });

    subscribeForm.addEventListener('submit', (e) => {
      const emailErr = getEmailError(emailInput.value);
      const confirmErr = getConfirmError(confirmInput.value, emailInput.value);

      setError(emailInput, emailError, emailErr);
      setError(confirmInput, confirmError, confirmErr);
   
      if (emailErr || confirmErr) {
        e.preventDefault();
      }
    });
  }

})();