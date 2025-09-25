// Main interactive script for Lunchbox landing page
// Handles nav toggle, temperature simulation, form submission (demo only), modal

(function(){
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const modeToggle = document.getElementById('modeToggle');
  const shell = document.querySelector('.lunchbox-shell');
  const tempIndicator = document.getElementById('tempIndicator');
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutNote = document.getElementById('checkoutNote');
  const yearEl = document.getElementById('year');
  const watchDemoBtn = document.getElementById('watchDemoBtn');
  const demoModal = document.getElementById('demoModal');
  const closeDemo = document.getElementById('closeDemo');

  // Checkout elements
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const quantityInput = document.getElementById('quantity');
  const orderQty = document.getElementById('orderQty');
  const subtotal = document.getElementById('subtotal');
  const tax = document.getElementById('tax');
  const total = document.getElementById('total');
  const qtySavings = document.getElementById('qtySavings');
  const savingsAmount = document.getElementById('savingsAmount');

  // Set year
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  if(navToggle){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('show');
      if(!expanded){
        // trap focus start
        navMenu.querySelector('a')?.focus();
      } else {
        navToggle.focus();
      }
    });

    // Close on link click (mobile)
    navMenu.addEventListener('click', e => {
      if(e.target.matches('a')){
        navMenu.classList.remove('show');
        navToggle.setAttribute('aria-expanded','false');
      }
    });
  }

  // Temperature simulation
  let mode = 'hot'; // 'hot' or 'cold'
  const hotPlate = document.getElementById('hotPlate');
  const coldPlate = document.getElementById('coldPlate');
  function updateMode(){
    if(mode === 'hot'){
      shell.classList.add('hot-active');
      shell.classList.remove('cold-active');
      // Approx original 30–38°C => 86–100°F (rounded). We'll widen slightly for dynamism.
      tempIndicator.textContent = Math.round(86 + Math.random()*14) + '°F Heat Mode';
      modeToggle.textContent = 'Cool Mode';
      modeToggle.setAttribute('aria-label','Switch to cooling mode');
    } else {
      shell.classList.add('cold-active');
      shell.classList.remove('hot-active');
      // Original 5–8°C => 41–46°F.
      tempIndicator.textContent = Math.round(41 + Math.random()*5) + '°F Chill Mode';
      modeToggle.textContent = 'Heat Mode';
      modeToggle.setAttribute('aria-label','Switch to heating mode');
    }
  }
  updateMode();

  if(modeToggle){
    modeToggle.addEventListener('click', () => {
      mode = mode === 'hot' ? 'cold' : 'hot';
      updateMode();
    });
  }

  // Ambient subtle temperature variance every 4s
  setInterval(() => {
    if(!document.hidden){
      if(mode === 'hot'){
        tempIndicator.textContent = Math.round(88 + Math.random()*12) + '°F Heat Mode';
      } else {
        tempIndicator.textContent = Math.round(41 + Math.random()*5) + '°F Chill Mode';
      }
    }
  }, 4000);

  // Checkout functionality
  const basePrice = 55.99;
  const taxRate = 0.08; // 8% tax
  
  function updateOrderSummary(){
    const qty = parseInt(quantityInput.value);
    let subtotalAmount;
    let savings = 0;
    
    // BOGO 50% off logic
    if(qty === 1){
      subtotalAmount = basePrice;
    } else {
      const fullPriceItems = Math.ceil(qty / 2);
      const halfPriceItems = Math.floor(qty / 2);
      subtotalAmount = (fullPriceItems * basePrice) + (halfPriceItems * basePrice * 0.5);
      
      // Calculate savings compared to regular price
      const regularPrice = qty * basePrice;
      savings = regularPrice - subtotalAmount;
    }
    
    const taxAmount = subtotalAmount * taxRate;
    const totalAmount = subtotalAmount + taxAmount;

    orderQty.textContent = qty;
    subtotal.textContent = '$' + subtotalAmount.toFixed(2);
    tax.textContent = '$' + taxAmount.toFixed(2);
    total.textContent = '$' + totalAmount.toFixed(2);
    
    // Show/hide savings indicator
    if(qty >= 2 && qtySavings && savingsAmount){
      qtySavings.style.display = 'block';
      savingsAmount.textContent = '$' + savings.toFixed(2);
    } else if(qtySavings) {
      qtySavings.style.display = 'none';
    }
  }

  // Quantity controls
  if(qtyMinus && qtyPlus){
    qtyMinus.addEventListener('click', () => {
      const current = parseInt(quantityInput.value);
      if(current > 1){
        quantityInput.value = current - 1;
        updateOrderSummary();
      }
    });

    qtyPlus.addEventListener('click', () => {
      const current = parseInt(quantityInput.value);
      if(current < 10){
        quantityInput.value = current + 1;
        updateOrderSummary();
      }
    });
  }

  // Initialize order summary
  if(quantityInput) updateOrderSummary();

  // Card number formatting
  const cardNumberInput = document.querySelector('input[name="cardNumber"]');
  if(cardNumberInput){
    cardNumberInput.addEventListener('input', e => {
      let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      let formattedValue = value.match(/.{1,4}/g)?.join(' ');
      if(formattedValue) e.target.value = formattedValue;
    });
  }

  // Expiry date formatting
  const expiryInput = document.querySelector('input[name="expiry"]');
  if(expiryInput){
    expiryInput.addEventListener('input', e => {
      let value = e.target.value.replace(/\D/g, '');
      if(value.length >= 2) {
        value = value.substring(0,2) + '/' + value.substring(2,4);
      }
      e.target.value = value;
    });
  }

  // Checkout form submission
  if(checkoutForm){
    checkoutForm.addEventListener('submit', e => {
      e.preventDefault();
      checkoutNote.textContent = '';

      const formData = new FormData(checkoutForm);
      const email = formData.get('email')?.toString().trim();
      const fullName = formData.get('fullName')?.toString().trim();
      const cardNumber = formData.get('cardNumber')?.toString().trim();

      if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
        checkoutNote.textContent = 'Please enter a valid email address.';
        return;
      }
      if(!fullName || fullName.length < 2){
        checkoutNote.textContent = 'Please enter your full name.';
        return;
      }
      if(!cardNumber || cardNumber.replace(/\s/g, '').length < 13){
        checkoutNote.textContent = 'Please enter a valid card number.';
        return;
      }

      checkoutNote.textContent = 'Processing your order...';
      checkoutForm.querySelector('button[type="submit"]').disabled = true;

      // Simulate payment processing
      setTimeout(() => {
        checkoutNote.textContent = '✅ Order confirmed! You\'ll receive a confirmation email shortly.';
        checkoutForm.querySelector('button[type="submit"]').disabled = false;
      }, 2000);
    });
  }

  // Demo modal (if video later)
  function openModal(){
    if(typeof demoModal.showModal === 'function'){
      demoModal.showModal();
    } else {
      demoModal.classList.add('open-fallback');
    }
  }
  function closeModal(){
    if(demoModal.open){ demoModal.close(); }
    demoModal.classList.remove('open-fallback');
  }
  watchDemoBtn?.addEventListener('click', openModal);
  closeDemo?.addEventListener('click', closeModal);
  demoModal?.addEventListener('click', e => { if(e.target === demoModal){ closeModal(); } });
  document.addEventListener('keydown', e => { if(e.key === 'Escape'){ closeModal(); } });
})();
