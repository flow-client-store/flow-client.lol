/**
 * FLOW STORE — MODERN E-COMMERCE JAVASCRIPT ENGINE
 * Domain: flow-client.lol
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. PRODUCT CATALOG DATA =====
  // Default placeholder SVG in case external images load slowly
  const PLACEHOLDER_IMG = 'assets/product.jpg';
  
  const PRODUCTS = [
    {
      id: 'flow-01',
      name: 'Your Product Name 1',
      desc: 'Your description - Engineered with aerospace-grade materials, ergonomic grip, and seamless daily utility.',
      price: 29.99,
      originalPrice: 49.99,
      rating: 4.9,
      reviewsCount: 142,
      category: 'bestseller',
      badge: 'BESTSELLER',
      badgeType: 'bestseller',
      image: PLACEHOLDER_IMG,
      features: [
        'Premium ultra-durable build quality',
        'Minimalist matte finish resistant to fingerprints',
        'Backed by our 30-day money-back guarantee',
        'Includes tracked express delivery'
      ]
    },
    {
      id: 'flow-02',
      name: 'Your Product Name 2',
      desc: 'Your description - Upgraded performance architecture designed for modern lifestyle enthusiasts.',
      price: 49.99,
      originalPrice: 79.99,
      rating: 5.0,
      reviewsCount: 89,
      category: 'tech',
      badge: '-35% OFF',
      badgeType: 'sale',
      image: PLACEHOLDER_IMG,
      features: [
        'Enhanced precision sensor array',
        'Ultra-fast USB-C rapid charging support',
        'Whisper-quiet operational acoustics',
        'Full 1-year replacement warranty included'
      ]
    },
    {
      id: 'flow-03',
      name: 'Your Product Name 3',
      desc: 'Your description - Streamlined aesthetic crafted for clean workspaces and everyday convenience.',
      price: 19.99,
      originalPrice: 34.99,
      rating: 4.8,
      reviewsCount: 64,
      category: 'lifestyle',
      badge: 'NEW',
      badgeType: 'new',
      image: PLACEHOLDER_IMG,
      features: [
        'Pocket-sized compact form factor',
        'Eco-friendly sustainable packaging',
        'Shockproof & weather-resistant exterior',
        'Ready to use straight out of the box'
      ]
    },
    {
      id: 'flow-04',
      name: 'Your Product Name 4',
      desc: 'Your description - Timeless Scandinavian design fused with intelligent smart-touch functionality.',
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.9,
      reviewsCount: 112,
      category: 'home',
      badge: 'POPULAR',
      badgeType: 'bestseller',
      image: PLACEHOLDER_IMG,
      features: [
        'Sleek ambient LED status indicator',
        'Low energy consumption profile',
        'Non-slip silicone stability base',
        'Certified RoHS and CE safe compliance'
      ]
    },
    {
      id: 'flow-05',
      name: 'Your Product Name 5',
      desc: 'Your description - High-grade reinforced shell engineered for on-the-go travel and outdoor resilience.',
      price: 24.99,
      originalPrice: 39.99,
      rating: 4.7,
      reviewsCount: 78,
      category: 'lifestyle',
      badge: '-30% OFF',
      badgeType: 'sale',
      image: PLACEHOLDER_IMG,
      features: [
        'Water-repellent nanocoating treatment',
        'Impact absorption cushioning up to 2 meters',
        'Ultra-lightweight aerospace alloy chassis',
        'Complimentary carabiner clip included'
      ]
    },
    {
      id: 'flow-06',
      name: 'Your Product Name 6',
      desc: 'Your description - Flagship performance package bundled with complete accessory kit.',
      price: 64.99,
      originalPrice: 99.99,
      rating: 5.0,
      reviewsCount: 205,
      category: 'tech',
      badge: 'LIMITED',
      badgeType: 'bestseller',
      image: PLACEHOLDER_IMG,
      features: [
        'Custom calibrated dual internal cores',
        'Heavy-duty braided reinforced cable',
        'Precision milled aluminum enclosure',
        'VIP 24/7 dedicated support priority'
      ]
    },
    {
      id: 'flow-07',
      name: 'Your Product Name 7',
      desc: 'Your description - Elevate your desk setup with clean cable routing and refined matte aesthetic.',
      price: 34.99,
      originalPrice: 49.99,
      rating: 4.8,
      reviewsCount: 95,
      category: 'home',
      badge: 'NEW',
      badgeType: 'new',
      image: PLACEHOLDER_IMG,
      features: [
        'Integrated modular cable management clips',
        'Weighted anti-tip base architecture',
        'Scratch-resistant anodized finish',
        'Fits seamlessly with all modern monitors'
      ]
    },
    {
      id: 'flow-08',
      name: 'Your Product Name 8',
      desc: 'Your description - The complete 3-in-1 combo providing all your essential tools at maximum savings.',
      price: 79.99,
      originalPrice: 129.99,
      rating: 4.9,
      reviewsCount: 310,
      category: 'bestseller',
      badge: 'SAVE €50',
      badgeType: 'sale',
      image: PLACEHOLDER_IMG,
      features: [
        'Complete 3-piece coordinated set',
        'Free expedited tracked courier shipping',
        'Deluxe gift box packaging included',
        'Full 2-year worry-free replacement warranty'
      ]
    }
  ];

  // ===== 2. STATE MANAGEMENT =====
  let currentCurrency = 'EUR';
  let currencySymbol = '€';
  let currencyRate = 1.0;
  
  let cart = JSON.parse(localStorage.getItem('flow_cart') || '[]');
  let appliedDiscount = 0; // percentage e.g. 0.10 for 10%
  let appliedDiscountCode = '';
  const FREE_SHIPPING_THRESHOLD = 40.0; // In EUR
  const BASE_SHIPPING_FEE = 4.99; // In EUR

  // ===== 3. DOM ELEMENTS =====
  const productsGrid = document.getElementById('productsGrid');
  const categoryTabs = document.getElementById('categoryTabs');
  const cartBtn = document.getElementById('cartBtn');
  const cartClose = document.getElementById('cartClose');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartBody = document.getElementById('cartBody');
  const cartCount = document.getElementById('cartCount');
  const cartDrawerItemCount = document.getElementById('cartDrawerItemCount');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartShipping = document.getElementById('cartShipping');
  const cartTotal = document.getElementById('cartTotal');
  const shippingProgressText = document.getElementById('shippingProgressText');
  const shippingProgressBar = document.getElementById('shippingProgressBar');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  const scrollTop = document.getElementById('scrollTop');
  const burgerBtn = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');
  
  // Currency elements
  const currencyBtn = document.getElementById('currencyBtn');
  const currencyDropdown = document.getElementById('currencyDropdown');
  const currentCurrencyLabel = document.getElementById('currentCurrencyLabel');

  // Modals
  const quickViewOverlay = document.getElementById('quickViewOverlay');
  const quickViewClose = document.getElementById('quickViewClose');
  const quickViewContent = document.getElementById('quickViewContent');

  const legalModalOverlay = document.getElementById('legalModalOverlay');
  const legalModalClose = document.getElementById('legalModalClose');
  const legalModalTitle = document.getElementById('legalModalTitle');
  const legalModalBody = document.getElementById('legalModalBody');

  const checkoutOverlay = document.getElementById('checkoutOverlay');
  const checkoutClose = document.getElementById('checkoutClose');
  const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');
  const checkoutFormStep1 = document.getElementById('checkoutFormStep1');
  const checkoutFormStep2 = document.getElementById('checkoutFormStep2');
  const checkoutConfirmed = document.getElementById('checkoutConfirmed');
  const checkoutBackToStep1 = document.getElementById('checkoutBackToStep1');
  const checkoutDoneBtn = document.getElementById('checkoutDoneBtn');
  const checkoutFinalTotal = document.getElementById('checkoutFinalTotal');
  const stepIndicator1 = document.getElementById('stepIndicator1');
  const stepIndicator2 = document.getElementById('stepIndicator2');
  const stepIndicator3 = document.getElementById('stepIndicator3');

  // Search Modal
  const searchBtn = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  const searchResultsList = document.getElementById('searchResultsList');

  // Cookie Consent
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieDecline = document.getElementById('cookieDecline');
  const openCookieSettings = document.getElementById('openCookieSettings');

  // Newsletter & Promo
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterCoupon = document.getElementById('newsletterCoupon');
  const btnCopyCode = document.getElementById('btnCopyCode');
  const cartPromoInput = document.getElementById('cartPromoInput');
  const cartApplyPromoBtn = document.getElementById('cartApplyPromoBtn');
  const cartPromoApplied = document.getElementById('cartPromoApplied');
  const appliedPromoCode = document.getElementById('appliedPromoCode');
  const appliedDiscountAmount = document.getElementById('appliedDiscountAmount');
  const removePromoBtn = document.getElementById('removePromoBtn');
  const cartDiscountRow = document.getElementById('cartDiscountRow');
  const cartDiscountTotal = document.getElementById('cartDiscountTotal');

  // Order Tracker Form
  const trackerForm = document.getElementById('trackerForm');
  const trackOrderInput = document.getElementById('trackOrderInput');
  const trackerResult = document.getElementById('trackerResult');

  // ===== 4. HELPER FUNCTIONS =====
  function formatMoney(amountInEur) {
    const converted = amountInEur * currencyRate;
    return `${currencySymbol}${converted.toFixed(2)}`;
  }

  function showToast(message) {
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Cookie helper functions
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // ===== 5. RENDER PRODUCTS =====
  function renderProducts(category = 'all') {
    if (!productsGrid) return;
    productsGrid.innerHTML = '';

    const filtered = category === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === category || (category === 'bestseller' && p.badgeType === 'bestseller'));

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.setAttribute('data-id', p.id);

      card.innerHTML = `
        <div class="product-card__img-wrap">
          <span class="product-card__badge product-card__badge--${p.badgeType}">${p.badge}</span>
          <img src="${p.image}" alt="${p.name}" class="product-card__img" loading="lazy" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'300\\' height=\\'300\\' viewBox=\\'0 0 300 300\\'><rect fill=\\'%231a222d\\' width=\\'300\\' height=\\'300\\'/><circle cx=\\'150\\' cy=\\'120\\' r=\\'30\\' fill=\\'%23324155\\'/><path d=\\'M80 220 L150 160 L220 220 Z\\' fill=\\'%23263344\\'/></svg>'">
          <button class="product-card__quick-btn" data-action="quickview" data-id="${p.id}">Quick View</button>
        </div>
        <div class="product-card__body">
          <div class="product-card__rating">
            <span class="product-card__stars">★★★★★</span>
            <span class="product-card__rating-count">(${p.reviewsCount})</span>
          </div>
          <h3 class="product-card__name">${p.name}</h3>
          <p class="product-card__desc">${p.desc}</p>
          <div class="product-card__footer">
            <div class="product-card__price-box">
              <span class="product-card__price">${formatMoney(p.price)}</span>
              <span class="product-card__price--original">${formatMoney(p.originalPrice)}</span>
            </div>
            <button class="product-card__add-btn" data-action="add" data-id="${p.id}" aria-label="Add ${p.name} to cart">
              <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Add</span>
            </button>
          </div>
        </div>
      `;

      productsGrid.appendChild(card);
    });
  }

  // Category Filtering
  if (categoryTabs) {
    categoryTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;

      categoryTabs.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const cat = btn.getAttribute('data-category');
      renderProducts(cat);
    });
  }

  // Category trigger from footer links
  document.querySelectorAll('[data-cat-trigger]').forEach(link => {
    link.addEventListener('click', (e) => {
      const cat = link.getAttribute('data-cat-trigger');
      const targetBtn = categoryTabs?.querySelector(`[data-category="${cat}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
    });
  });

  // ===== 6. CART MANAGEMENT =====
  function saveCart() {
    localStorage.setItem('flow_cart', JSON.stringify(cart));
    updateCartUI();
  }

  function addToCart(productId, qty = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        desc: product.desc,
        price: product.price,
        image: product.image,
        quantity: qty
      });
    }

    saveCart();
    showToast(`Added ${product.name} to cart`);
    openCart();
  }

  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update Badge
    if (cartCount) {
      cartCount.textContent = totalItems;
      if (totalItems > 0) {
        cartCount.classList.add('visible');
      } else {
        cartCount.classList.remove('visible');
      }
    }

    if (cartDrawerItemCount) {
      cartDrawerItemCount.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
    }

    // Render Cart Items
    if (!cartBody) return;

    if (cart.length === 0) {
      cartBody.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">🛍️</div>
          <h4 class="cart-empty-title">Your Cart is Empty</h4>
          <p class="cart-empty-desc">Explore our premium catalog on flow-client.lol and add essentials to your cart.</p>
        </div>
      `;
    } else {
      cartBody.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item__img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\'><rect fill=\\'%231a222d\\' width=\\'100\\' height=\\'100\\'/></svg>'">
          <div class="cart-item__info">
            <h4 class="cart-item__name">${item.name}</h4>
            <p class="cart-item__desc">${item.desc}</p>
            <div class="cart-item__price">${formatMoney(item.price)}</div>
            <div class="cart-item__actions">
              <div class="cart-item__qty">
                <button class="qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                <span class="qty-num">${item.quantity}</span>
                <button class="qty-btn" data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
              </div>
              <button class="cart-item__remove" data-action="remove" data-id="${item.id}">Remove</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Calculate Subtotal & Totals
    const subtotalEur = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmountEur = subtotalEur * appliedDiscount;
    const isFreeShipping = subtotalEur >= FREE_SHIPPING_THRESHOLD || subtotalEur === 0;
    const shippingEur = isFreeShipping ? 0 : BASE_SHIPPING_FEE;
    const totalEur = Math.max(0, subtotalEur - discountAmountEur + (subtotalEur > 0 ? shippingEur : 0));

    if (cartSubtotal) cartSubtotal.textContent = formatMoney(subtotalEur);
    if (cartShipping) cartShipping.textContent = isFreeShipping ? (subtotalEur > 0 ? 'FREE' : formatMoney(0)) : formatMoney(shippingEur);
    if (cartTotal) cartTotal.textContent = formatMoney(totalEur);
    if (checkoutFinalTotal) checkoutFinalTotal.textContent = formatMoney(totalEur);

    // Discount UI
    if (appliedDiscount > 0 && subtotalEur > 0) {
      if (cartDiscountRow) cartDiscountRow.style.display = 'flex';
      if (cartDiscountTotal) cartDiscountTotal.textContent = `-${formatMoney(discountAmountEur)}`;
      if (cartPromoApplied) cartPromoApplied.style.display = 'flex';
      if (appliedPromoCode) appliedPromoCode.textContent = appliedDiscountCode;
      if (appliedDiscountAmount) appliedDiscountAmount.textContent = formatMoney(discountAmountEur);
    } else {
      if (cartDiscountRow) cartDiscountRow.style.display = 'none';
      if (cartPromoApplied) cartPromoApplied.style.display = 'none';
    }

    // Shipping Progress Bar
    if (shippingProgressText && shippingProgressBar) {
      if (subtotalEur === 0) {
        shippingProgressText.innerHTML = `Add ${formatMoney(FREE_SHIPPING_THRESHOLD)} more for <strong>FREE Express Shipping</strong>`;
        shippingProgressBar.style.width = '0%';
      } else if (subtotalEur >= FREE_SHIPPING_THRESHOLD) {
        shippingProgressText.innerHTML = `🎉 You unlocked <strong>FREE Express Shipping</strong>!`;
        shippingProgressBar.style.width = '100%';
      } else {
        const remainingEur = FREE_SHIPPING_THRESHOLD - subtotalEur;
        const percent = Math.min(100, Math.round((subtotalEur / FREE_SHIPPING_THRESHOLD) * 100));
        shippingProgressText.innerHTML = `Add ${formatMoney(remainingEur)} more for <strong>FREE Express Shipping</strong>`;
        shippingProgressBar.style.width = `${percent}%`;
      }
    }
  }

  // Cart Drawer open / close
  function openCart() {
    cartDrawer?.classList.add('open');
    cartOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer?.classList.remove('open');
    cartOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  cartBtn?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  // Cart delegation events (increase, decrease, remove)
  cartBody?.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;

    const action = target.getAttribute('data-action');
    const id = target.getAttribute('data-id');
    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex === -1) return;

    if (action === 'increase') {
      cart[itemIndex].quantity += 1;
      saveCart();
    } else if (action === 'decrease') {
      if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity -= 1;
      } else {
        cart.splice(itemIndex, 1);
      }
      saveCart();
    } else if (action === 'remove') {
      cart.splice(itemIndex, 1);
      saveCart();
      showToast('Item removed from cart');
    }
  });

  // Global Grid delegation events (Add to cart & Quick View)
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-action="add"]');
    if (addBtn) {
      const id = addBtn.getAttribute('data-id');
      addToCart(id, 1);
      return;
    }

    const qvBtn = e.target.closest('[data-action="quickview"]');
    if (qvBtn) {
      const id = qvBtn.getAttribute('data-id');
      openQuickView(id);
      return;
    }
  });

  // Promo Code Handler
  cartApplyPromoBtn?.addEventListener('click', () => {
    const code = (cartPromoInput.value || '').trim().toUpperCase();
    if (code === 'FLOW10') {
      appliedDiscount = 0.10;
      appliedDiscountCode = 'FLOW10 (10% OFF)';
      cartPromoInput.value = '';
      saveCart();
      showToast('10% discount applied!');
    } else if (code === 'FLOW15') {
      appliedDiscount = 0.15;
      appliedDiscountCode = 'FLOW15 (15% OFF)';
      cartPromoInput.value = '';
      saveCart();
      showToast('15% discount applied!');
    } else {
      showToast('Invalid promo code. Try FLOW10 or FLOW15');
    }
  });

  removePromoBtn?.addEventListener('click', () => {
    appliedDiscount = 0;
    appliedDiscountCode = '';
    saveCart();
    showToast('Promo code removed');
  });

  // ===== 7. CURRENCY CONVERTER =====
  currencyBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    currencyDropdown.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    currencyDropdown?.classList.remove('show');
  });

  currencyDropdown?.addEventListener('click', (e) => {
    const opt = e.target.closest('.currency-option');
    if (!opt) return;

    currentCurrency = opt.getAttribute('data-currency');
    currencySymbol = opt.getAttribute('data-symbol');
    currencyRate = parseFloat(opt.getAttribute('data-rate'));

    currentCurrencyLabel.textContent = `${currentCurrency} (${currencySymbol})`;

    currencyDropdown.querySelectorAll('.currency-option').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');

    // Re-render UI with new rates
    const activeTab = categoryTabs?.querySelector('.tab-btn.active')?.getAttribute('data-category') || 'all';
    renderProducts(activeTab);
    updateCartUI();

    showToast(`Switched currency to ${currentCurrency}`);
  });

  // ===== 8. QUICK VIEW MODAL =====
  function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !quickViewContent) return;

    quickViewContent.innerHTML = `
      <div>
        <img src="${product.image}" alt="${product.name}" class="quickview-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'400\\'><rect fill=\\'%231a222d\\' width=\\'400\\' height=\\'400\\'/></svg>'">
      </div>
      <div class="quickview-info">
        <div class="quickview-tag">FLOW Essentials • ${product.category.toUpperCase()}</div>
        <h2 class="quickview-title">${product.name}</h2>
        <div class="product-card__rating" style="margin-bottom: 12px;">
          <span class="product-card__stars">★★★★★</span>
          <span class="product-card__rating-count">(${product.reviewsCount} verified reviews)</span>
        </div>
        <p class="quickview-desc">${product.desc}</p>
        
        <div class="quickview-price-row">
          <span class="quickview-price">${formatMoney(product.price)}</span>
          <span class="product-card__price--original">${formatMoney(product.originalPrice)}</span>
          <span class="product-card__badge product-card__badge--${product.badgeType}">${product.badge}</span>
        </div>

        <ul class="quickview-features">
          ${product.features.map(f => `<li><span>✓</span> ${f}</li>`).join('')}
        </ul>

        <div style="display: flex; gap: 12px; margin-top: auto;">
          <button class="btn btn--primary btn--full" id="qvAddToCartBtn" data-id="${product.id}">
            <span>Add to Cart — ${formatMoney(product.price)}</span>
          </button>
        </div>
      </div>
    `;

    quickViewOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Hook add to cart inside modal
    document.getElementById('qvAddToCartBtn')?.addEventListener('click', () => {
      addToCart(product.id, 1);
      closeQuickView();
    });
  }

  function closeQuickView() {
    quickViewOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  quickViewClose?.addEventListener('click', closeQuickView);
  quickViewOverlay?.addEventListener('click', (e) => {
    if (e.target === quickViewOverlay) closeQuickView();
  });

  // ===== 9. FAQ ACCORDION =====
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ===== 10. REAL COOKIE CONSENT ENGINE =====
  const COOKIE_NAME = 'flow_cookie_consent';
  const existingConsent = getCookie(COOKIE_NAME) || localStorage.getItem(COOKIE_NAME);

  if (!existingConsent) {
    setTimeout(() => {
      cookieBanner?.classList.add('visible');
    }, 900);
  }

  cookieAccept?.addEventListener('click', () => {
    setCookie(COOKIE_NAME, 'accepted_all', 365);
    localStorage.setItem(COOKIE_NAME, 'accepted_all');
    cookieBanner?.classList.remove('visible');
    showToast('Cookie preferences saved: All enabled');
  });

  cookieDecline?.addEventListener('click', () => {
    setCookie(COOKIE_NAME, 'essential_only', 365);
    localStorage.setItem(COOKIE_NAME, 'essential_only');
    cookieBanner?.classList.remove('visible');
    showToast('Cookie preferences saved: Essential only');
  });

  openCookieSettings?.addEventListener('click', (e) => {
    e.preventDefault();
    cookieBanner?.classList.add('visible');
    showToast('Manage your cookie settings below');
  });

  // ===== 11. LEGAL POLICIES MODAL SYSTEM =====
  const LEGAL_DOCS = {
    terms: {
      title: 'Terms of Service',
      content: `
        <p><strong>Effective Date:</strong> January 1, 2026 | <strong>Website:</strong> flow-client.lol</p>
        <h4>1. Agreement to Terms</h4>
        <p>By accessing or purchasing from flow-client.lol (operated by FLOW), you agree to be bound by these Terms of Service. If you disagree with any part, you may not access our store.</p>
        <h4>2. Products & Pricing</h4>
        <p>All prices listed on flow-client.lol are quoted in EUR (€), USD ($), or GBP (£) and include relevant applicable taxes unless stated otherwise. We reserve the right to modify prices, product specifications, and availability at any time without prior notice.</p>
        <h4>3. Order Processing & Acceptance</h4>
        <p>Your receipt of an electronic order confirmation does not signify our final acceptance. We reserve the right at any time after receipt of your order to accept or decline your order for standard fraud prevention or inventory verification.</p>
        <h4>4. Intellectual Property & Trademark</h4>
        <p>All visual designs, logos, graphics, copy, and product catalog presentations on flow-client.lol are proprietary properties of FLOW. Unauthorized reproduction or crawling is strictly prohibited.</p>
        <h4>5. Governing Law</h4>
        <p>These terms shall be governed by and construed in accordance with standard international electronic commerce law and consumer protection standards.</p>
      `
    },
    privacy: {
      title: 'Privacy Policy (GDPR / ePrivacy)',
      content: `
        <p><strong>Effective Date:</strong> January 1, 2026 | <strong>Domain:</strong> flow-client.lol</p>
        <h4>1. Information We Collect</h4>
        <p>When you visit flow-client.lol or place an order, we collect minimal necessary data: your shipping address, email address, name, and order contents to fulfill your parcel dispatch.</p>
        <h4>2. How We Protect Your Data</h4>
        <p>All sensitive transactions are processed through 256-bit SSL encrypted merchant gateways (Stripe / PayPal). We never store raw payment card numbers on our servers.</p>
        <h4>3. Cookie & Analytics Usage</h4>
        <p>We use functional session cookies to retain your shopping cart items and store your preferred currency. You can adjust your consent choices at any time.</p>
        <h4>4. Third-Party Sharing</h4>
        <p>We strictly do NOT sell or lease customer information. We only share dispatch addresses with vetted international courier logistics partners to complete physical delivery.</p>
        <h4>5. Your Rights Under GDPR</h4>
        <p>You have the right to request data access, rectification, or total erasure of your customer records by contacting <a href="mailto:support@flow-client.lol">support@flow-client.lol</a>.</p>
      `
    },
    shipping: {
      title: 'Shipping & Delivery Policy',
      content: `
        <p><strong>Official Fulfillment Policy:</strong> flow-client.lol</p>
        <h4>1. Processing Time</h4>
        <p>All orders are verified, packaged, and dispatched from our fulfillment hub within <strong>24 to 48 business hours</strong> after payment confirmation.</p>
        <h4>2. Tracked Express Delivery Times</h4>
        <ul>
          <li><strong>Europe & UK:</strong> 3 – 7 business days</li>
          <li><strong>United States & Canada:</strong> 4 – 8 business days</li>
          <li><strong>Australia & Rest of World:</strong> 6 – 10 business days</li>
        </ul>
        <h4>3. Real-Time Tracking</h4>
        <p>As soon as your package is scanned by our logistics carrier, an automated confirmation email containing your end-to-end tracking code is generated.</p>
        <h4>4. Free Shipping Policy</h4>
        <p>All orders over €40.00 qualify for 100% Free Tracked Express Courier Shipping.</p>
      `
    },
    returns: {
      title: '30-Day Money-Back Guarantee & Returns',
      content: `
        <p><strong>Guarantee Policy:</strong> flow-client.lol</p>
        <h4>1. 30-Day Risk-Free Returns</h4>
        <p>If you are not 100% delighted with your product, you can initiate a return or exchange within 30 days of package delivery.</p>
        <h4>2. Damaged or Defective Items</h4>
        <p>If your order arrives damaged or malfunctioning, we will immediately send a brand-new replacement free of charge or issue a 100% refund without requiring complex return shipping.</p>
        <h4>3. How to Request a Refund</h4>
        <p>Email our support desk at <a href="mailto:support@flow-client.lol">support@flow-client.lol</a> with your order number. Our agents respond in under 24 hours.</p>
      `
    },
    cookies: {
      title: 'Cookie Policy',
      content: `
        <p><strong>Cookie Information:</strong> flow-client.lol</p>
        <h4>1. What are Cookies?</h4>
        <p>Cookies are small text files stored on your browser to enable essential website functionality like preserving items in your shopping cart and keeping your currency preference.</p>
        <h4>2. Essential Cookies</h4>
        <p>These cookies are required for checkout security and cart persistence. They do not store personally identifiable marketing data.</p>
        <h4>3. Managing Preferences</h4>
        <p>You can toggle non-essential cookies via our on-screen banner or clear cookies in your browser settings at any time.</p>
      `
    },
    contact: {
      title: 'Customer Support & Contact',
      content: `
        <p><strong>Customer Care Desk:</strong> flow-client.lol</p>
        <h4>Dedicated Support Email</h4>
        <p><a href="mailto:support@flow-client.lol">support@flow-client.lol</a></p>
        <h4>Response Hours</h4>
        <p>24 hours a day, 7 days a week. Average initial response time: &lt; 2 hours.</p>
        <h4>Store Address & Brand Operations</h4>
        <p>FLOW Client Brand Operations • flow-client.lol</p>
      `
    },
    warranty: {
      title: '1-Year Limited Product Warranty',
      content: `
        <p><strong>Warranty Standard:</strong> flow-client.lol</p>
        <h4>1. Coverage Terms</h4>
        <p>Every product purchased directly from flow-client.lol is backed by our comprehensive 1-year limited hardware and build warranty against manufacturing defects.</p>
      `
    },
    disclaimer: {
      title: 'Compliance & Legal Disclaimer',
      content: `
        <p><strong>Legal Notice:</strong> flow-client.lol</p>
        <p>FLOW is an independent e-commerce brand. All product names, logos, and brands are property of their respective owners. Content on flow-client.lol is for e-commerce retail purposes.</p>
      `
    }
  };

  document.querySelectorAll('.legal-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const policyKey = trigger.getAttribute('data-policy');
      const doc = LEGAL_DOCS[policyKey];
      if (!doc) return;

      legalModalTitle.textContent = doc.title;
      legalModalBody.innerHTML = doc.content;
      legalModalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLegalModal() {
    legalModalOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  legalModalClose?.addEventListener('click', closeLegalModal);
  legalModalOverlay?.addEventListener('click', (e) => {
    if (e.target === legalModalOverlay) closeLegalModal();
  });

  // ===== 12. SIMULATED CHECKOUT FLOW =====
  cartCheckoutBtn?.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Your cart is empty! Add products first.');
      return;
    }

    closeCart();
    // Reset checkout wizard
    checkoutFormStep1.style.display = 'block';
    checkoutFormStep2.style.display = 'none';
    checkoutConfirmed.style.display = 'none';
    stepIndicator1.classList.add('active');
    stepIndicator2.classList.remove('active');
    stepIndicator3.classList.remove('active');

    checkoutOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  checkoutFormStep1?.addEventListener('submit', (e) => {
    e.preventDefault();
    checkoutFormStep1.style.display = 'none';
    checkoutFormStep2.style.display = 'block';
    stepIndicator1.classList.remove('active');
    stepIndicator2.classList.add('active');
  });

  checkoutBackToStep1?.addEventListener('click', () => {
    checkoutFormStep2.style.display = 'none';
    checkoutFormStep1.style.display = 'block';
    stepIndicator2.classList.remove('active');
    stepIndicator1.classList.add('active');
  });

  checkoutFormStep2?.addEventListener('submit', (e) => {
    e.preventDefault();
    const orderNum = `FLOW-${Math.floor(10000 + Math.random() * 90000)}`;
    document.getElementById('confirmedOrderNumber').textContent = orderNum;

    checkoutFormStep2.style.display = 'none';
    checkoutConfirmed.style.display = 'block';
    stepIndicator2.classList.remove('active');
    stepIndicator3.classList.add('active');

    // Clear cart after purchase
    cart = [];
    appliedDiscount = 0;
    saveCart();
  });

  function closeCheckoutModal() {
    checkoutOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  checkoutClose?.addEventListener('click', closeCheckoutModal);
  checkoutDoneBtn?.addEventListener('click', closeCheckoutModal);

  // ===== 13. LIVE ORDER TRACKER SIMULATION =====
  trackerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = (trackOrderInput.value || '').trim();
    if (!query) return;

    trackerResult.style.display = 'block';
    trackerResult.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <span class="tracker-status-badge">⚡ IN TRANSIT (ON SCHEDULE)</span>
          <h4 style="font-size: 16px; font-weight: 800; margin-bottom: 2px;">Shipment #${query.toUpperCase()}</h4>
          <p style="font-size: 12.5px; color: var(--text-muted);">Courier: FLOW Global Express Line • Estimated Delivery: in 2 days</p>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 13px; font-weight: 700; color: var(--accent);">Direct Fulfillment Hub</span>
        </div>
      </div>

      <div class="tracker-timeline">
        <div class="timeline-step completed">
          <div class="timeline-dot">✓</div>
          <div>Order Placed</div>
        </div>
        <div class="timeline-step completed">
          <div class="timeline-dot">✓</div>
          <div>Inspected & Packed</div>
        </div>
        <div class="timeline-step completed">
          <div class="timeline-dot">⚡</div>
          <div>In Transit</div>
        </div>
        <div class="timeline-step">
          <div class="timeline-dot">○</div>
          <div>Delivered</div>
        </div>
      </div>
    `;
  });

  // ===== 14. SEARCH MODAL =====
  function openSearchModal() {
    searchOverlay.classList.add('open');
    searchInput.value = '';
    searchInput.focus();
    renderSearchResults('');
    document.body.style.overflow = 'hidden';
  }

  function closeSearchModal() {
    searchOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  searchBtn?.addEventListener('click', openSearchModal);
  searchClose?.addEventListener('click', closeSearchModal);
  searchOverlay?.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearchModal();
  });

  function renderSearchResults(query) {
    if (!searchResultsList) return;
    const q = query.toLowerCase().trim();

    if (!q) {
      searchResultsList.innerHTML = `<div class="search-hint">Type above to search our curated catalog...</div>`;
      return;
    }

    const matches = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.desc.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      searchResultsList.innerHTML = `<div class="search-hint">No products found matching "${query}"</div>`;
      return;
    }

    searchResultsList.innerHTML = matches.map(p => `
      <div class="search-result-item" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" class="search-result-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'44\\' height=\\'44\\'><rect fill=\\'%231a222d\\' width=\\'44\\' height=\\'44\\'/></svg>'">
        <div>
          <div class="search-result-title">${p.name}</div>
          <div class="search-result-desc">${p.desc}</div>
        </div>
        <div class="search-result-price">${formatMoney(p.price)}</div>
      </div>
    `).join('');

    // Clicking item opens quickview
    searchResultsList.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        closeSearchModal();
        openQuickView(id);
      });
    });
  }

  searchInput?.addEventListener('input', (e) => {
    renderSearchResults(e.target.value);
  });

  // ===== 15. NEWSLETTER & COUPON =====
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    newsletterCoupon.style.display = 'block';
    showToast('🎉 Discount code generated: FLOW15 (15% OFF)');
  });

  btnCopyCode?.addEventListener('click', () => {
    navigator.clipboard.writeText('FLOW15').then(() => {
      showToast('Copied code FLOW15 to clipboard!');
      btnCopyCode.textContent = 'Copied!';
      setTimeout(() => {
        btnCopyCode.textContent = 'Copy Code';
      }, 2000);
    });
  });

  // ===== 16. MOBILE NAV & SCROLL TO TOP =====
  burgerBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTop?.classList.add('visible');
    } else {
      scrollTop?.classList.remove('visible');
    }
  });

  scrollTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== 17. INITIAL LOAD =====
  renderProducts('all');
  updateCartUI();

});
