(() => {
  if (window.__marsQuantRequirementOverlayLoaded) return;
  window.__marsQuantRequirementOverlayLoaded = true;

  const CONFIG = {
    accessKey: 'e8b60715-c55b-4b02-9054-410988807f54'
  };
  const scriptUrl = document.currentScript && document.currentScript.src;
  if (!scriptUrl) {
    console.error('Requirement overlay could not determine its script URL.');
    return;
  }

  const checklistSections = [
    {
      title: 'Live market execution/trading',
      options: [
        'Broker API Integration',
        'Real-time Trade Execution',
        'Simultaneous Instrument Management',
        'Real-time Data Processing',
        'Multiple Broker Integration',
        'Historical Data Fetching',
        'Third-Party Integration',
        'Market Data Integration',
        'Order Execution',
        'Complex Strategy Codification for Equity and FnO (Technical, Fundamental and Quantitative)',
        'Multithreading Processing',
        'Real-time ATM Strike Management',
        'Dynamic Parameter Input',
        'Cloud based strategy deployment'
      ]
    },
    {
      title: 'Data Processing Engine',
      options: [
        'Co-location server (NSE/BSE/MCX)',
        'Real-time Chart Formation',
        'Custom Indicator Calculation',
        'Complex Calculations for signal generation',
        'Historical Data Utilization',
        'Multiple Data Provider Funnel',
        'Dynamic ATM Changes',
        'Real-time Straddle and Strangle Price Capturing'
      ]
    },
    {
      title: 'Order Types and Execution',
      options: [
        'Support for GTT, Day, Bracket, Limit, Market, and IOC orders',
        'Custom Order Slicing',
        'Fast Order Execution',
        'Exit Conditions'
      ]
    },
    {
      title: 'User friendly interface / one stop solution',
      options: [
        'User-Friendly Interface',
        'Trade Execution Visualization',
        'Real-time Position Monitoring',
        'Manual Exits and Entries',
        'Automated Trade Log Analysis',
        'Support for Paper and Live Trading'
      ]
    },
    {
      title: 'Cloud-Based Infrastructure and Computing',
      options: [
        'Data Collection multiple sources tick-by-tick and snapshot',
        'Schedule, extract, and funnel collected data automatically',
        'Strategy Scheduling',
        'Automated Logins for multiple data source providers',
        'Customizable Data Storage Solutions',
        'AWS Deployment',
        'AWS Managed Services for automation',
        'Real-time Data Storage'
      ]
    },
    {
      title: 'Other capabilities',
      options: [
        'Risk Management System',
        'Order Management System'
      ]
    }
  ];

  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);

  const addFontAwesome = () => {
    const alreadyLoaded = [...document.querySelectorAll('link[rel="stylesheet"]')]
      .some(link => /font[-.]?awesome/i.test(link.href));
    if (alreadyLoaded) return;
    const iconStylesheet = document.createElement('link');
    iconStylesheet.rel = 'stylesheet';
    iconStylesheet.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
    iconStylesheet.crossOrigin = 'anonymous';
    document.head.appendChild(iconStylesheet);
  };

  const cssUrl = new URL('requirement-overlay.css', scriptUrl).href;
  let styleLink = [...document.querySelectorAll('link[rel="stylesheet"]')]
    .find(link => link.href === cssUrl);
  let stylesReady;
  if (styleLink) {
    stylesReady = Promise.resolve();
  } else {
    styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = cssUrl;
    stylesReady = new Promise(resolve => {
      styleLink.addEventListener('load', resolve, { once: true });
      styleLink.addEventListener('error', () => {
        console.error(`Could not load requirement overlay styles: ${cssUrl}`);
        resolve();
      }, { once: true });
    });
    document.head.appendChild(styleLink);
  }
  addFontAwesome();

  const sectionsMarkup = checklistSections.map((section, sectionIndex) => `
    <section class="mq-req__section" aria-labelledby="mq-req-section-${sectionIndex}">
      <h3 id="mq-req-section-${sectionIndex}">${escapeHtml(section.title)}</h3>
      <div class="mq-req__options">
        ${section.options.map((option, optionIndex) => {
          const id = `mq-req-option-${sectionIndex}-${optionIndex}`;
          return `<label class="mq-req__check" for="${id}">
            <input id="${id}" type="checkbox" name="capability" value="${escapeHtml(option)}">
            <span>${escapeHtml(option)}</span>
          </label>`;
        }).join('')}
      </div>
    </section>
  `).join('');

  const overlay = document.createElement('div');
  overlay.className = 'mq-req';
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="mq-req__backdrop">
      <section class="mq-req__panel" role="dialog" aria-modal="true" aria-label="Tell Us Your Requirement" tabindex="-1">
        <div class="mq-req__step" data-step="checklist">
          <header class="mq-req__header">
            <h2>Tell Us Your Requirement</h2>
            <button class="mq-req__icon-button" type="button" data-close aria-label="Close requirement form">
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </header>
          <div class="mq-req__body">
            <p class="mq-req__intro">Select the capabilities that match your requirements.</p>
            <div class="mq-req__sections">${sectionsMarkup}</div>
            <button class="mq-req__primary" type="button" data-next>Next <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
          </div>
        </div>

        <div class="mq-req__step" data-step="contact" hidden>
          <header class="mq-req__header">
            <div class="mq-req__header-title">
              <button class="mq-req__icon-button" type="button" data-back aria-label="Back to capabilities">
                <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
              </button>
              <h2>Contact Details</h2>
            </div>
            <button class="mq-req__icon-button" type="button" data-close aria-label="Close requirement form">
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </header>
          <div class="mq-req__body">
            <form class="mq-req__form" novalidate>
              <input type="hidden" name="access_key">
              <input type="hidden" name="subject" value="New Requirement from MarsQuant Website">
              <input type="hidden" name="from_name" value="MarsQuant Website">
              <input type="hidden" name="page_url">
              <input type="hidden" name="capabilities">
              <div class="mq-req__honeypot" aria-hidden="true">
                <label>Leave this field empty<input type="text" name="botcheck" tabindex="-1" autocomplete="off"></label>
              </div>
              <div class="mq-req__form-grid">
                <label>First Name
                  <input type="text" name="first_name" autocomplete="given-name" required>
                </label>
                <label>Last Name
                  <input type="text" name="last_name" autocomplete="family-name" required>
                </label>
                <label>Email
                  <input type="email" name="email" autocomplete="email" required>
                </label>
                <label>Phone Number
                  <input type="tel" name="Phone" autocomplete="tel" required>
                </label>
              </div>
              <label class="mq-req__message">Any other requirements/query
                <textarea name="requirements" rows="4"></textarea>
              </label>
              <p class="mq-req__error" role="alert" hidden></p>
              <button class="mq-req__primary mq-req__submit" type="submit">Submit <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
            </form>
          </div>
        </div>

        <div class="mq-req__step mq-req__success" data-step="success" hidden>
          <header class="mq-req__header">
            <h2>Request received</h2>
            <button class="mq-req__icon-button" type="button" data-close aria-label="Close requirement form">
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </header>
          <div class="mq-req__success-body">
            <span class="mq-req__success-icon" aria-hidden="true"><i class="fa-solid fa-check"></i></span>
            <h3>Thank You for Contacting Us!</h3>
            <p>We've received your request successfully.</p>
            <p>Our team will get in touch with you shortly.</p>
            <button class="mq-req__primary" type="button" data-close>Close</button>
          </div>
        </div>
      </section>
    </div>
  `;
  document.body.appendChild(overlay);

  const panel = overlay.querySelector('.mq-req__panel');
  const steps = [...overlay.querySelectorAll('.mq-req__step')];
  const form = overlay.querySelector('.mq-req__form');
  const errorMessage = overlay.querySelector('.mq-req__error');
  const submitButton = overlay.querySelector('.mq-req__submit');
  let isOpen = false;
  let isOpening = false;
  let opener = null;
  let previousSubmitText = '';

  const showStep = name => {
    panel.dataset.currentStep = name;
    steps.forEach(step => {
      const active = step.dataset.step === name;
      step.hidden = !active;
    });
    panel.scrollTop = 0;
    const currentStep = steps.find(step => step.dataset.step === name);
    const focusTarget = currentStep.querySelector('[data-next], input:not([type="hidden"]):not([tabindex="-1"]), [data-back], [data-close]');
    (focusTarget || panel).focus();
  };

  const closeOverlay = () => {
    if (!isOpen) return;
    isOpen = false;
    overlay.hidden = true;
    document.documentElement.classList.remove('mq-req-open');
    if (opener && opener.isConnected && typeof opener.focus === 'function') opener.focus();
    opener = null;
  };

  const openOverlay = async trigger => {
    if (isOpen || isOpening) return;
    isOpening = true;
    await stylesReady;
    isOpening = false;
    isOpen = true;
    opener = trigger instanceof HTMLElement ? trigger : document.activeElement;
    overlay.hidden = false;
    document.documentElement.classList.add('mq-req-open');
    showStep('checklist');
  };

  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const trigger = event.target.closest('[data-requirement], a[href="#requirement"]');
    if (!trigger || !document.contains(trigger)) return;
    event.preventDefault();
    openOverlay(trigger);
  });

  overlay.addEventListener('click', event => {
    if (event.target === overlay.querySelector('.mq-req__backdrop')) closeOverlay();
    const closeButton = event.target.closest('[data-close]');
    if (closeButton) closeOverlay();
    if (event.target.closest('[data-next]')) {
      errorMessage.hidden = true;
      showStep('contact');
    }
    if (event.target.closest('[data-back]')) showStep('checklist');
  });

  document.addEventListener('keydown', event => {
    if (!isOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeOverlay();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...panel.querySelectorAll(
      'button:not(:disabled), input:not([type="hidden"]):not([tabindex="-1"]), textarea, select, a[href], [tabindex]:not([tabindex="-1"])'
    )].filter(element => !element.closest('[hidden]') && element.getClientRects().length > 0);
    if (!focusable.length) {
      event.preventDefault();
      panel.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (!CONFIG.accessKey.trim()) {
      errorMessage.textContent = 'The request form is not configured yet. Please contact us by email at contact@marsquant.com.';
      errorMessage.hidden = false;
      return;
    }

    const checkedCapabilities = [...overlay.querySelectorAll('input[name="capability"]:checked')]
      .map(input => input.value);
    const uniqueCapabilities = [...new Set(checkedCapabilities)];
    form.elements.capabilities.value = uniqueCapabilities.join(', ');
    form.elements.page_url.value = window.location.href;
    form.elements.access_key.value = CONFIG.accessKey.trim();
    errorMessage.hidden = true;
    submitButton.disabled = true;
    previousSubmitText = submitButton.innerHTML;
    submitButton.textContent = 'Sending...';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || `Request failed with status ${response.status}.`);
      }
      form.reset();
      overlay.querySelectorAll('input[name="capability"]').forEach(input => { input.checked = false; });
      showStep('success');
    } catch (error) {
      errorMessage.textContent = error instanceof Error
        ? `We couldn't submit your request. ${error.message}`
        : "We couldn't submit your request. Please try again or email contact@marsquant.com.";
      errorMessage.hidden = false;
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = previousSubmitText;
    }
  });
})();
