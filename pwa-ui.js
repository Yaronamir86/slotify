
// Slotify splash screen
(function () {
  const splash = document.createElement('div');
  splash.id = 'slotify-splash';
  splash.innerHTML = `
    <div class="slotify-splash-card">
      <div class="slotify-logo-wrap">
        <img src="assets/splash-logo.png" alt="Slotify">
      </div>
      <h1>Slotify</h1>
      <p>Smart appointment scheduling</p>
      <div class="slotify-loader" aria-hidden="true"></div>
    </div>
  `;
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(splash);
  });
  const hideSplash = () => {
    const el = document.getElementById('slotify-splash');
    if (!el) return;
    el.classList.add('slotify-hidden');
    setTimeout(() => el.remove(), 450);
  };
  window.addEventListener('load', () => setTimeout(hideSplash, 450));
  setTimeout(hideSplash, 4000);
})();

// Slotify install popup
let slotifyDeferredPrompt = null;

(function () {
  function closeInstall() {
    const box = document.getElementById('slotify-install');
    if (!box) return;
    box.classList.remove('slotify-show');
    localStorage.setItem('slotifyInstallDismissed', '1');
  }

  function createInstallPopup() {
    if (document.getElementById('slotify-install')) return;
    const box = document.createElement('div');
    box.id = 'slotify-install';
    box.innerHTML = `
      <div class="slotify-install-row">
        <div class="slotify-install-icon">
          <img src="assets/apple-touch-icon.png" alt="Slotify icon">
        </div>
        <div class="slotify-install-copy">
          <h3 class="slotify-install-title">Install Slotify</h3>
          <p class="slotify-install-text">Add Slotify to your home screen for a faster app-like experience.</p>
        </div>
      </div>
      <div class="slotify-install-actions">
        <button class="slotify-btn-primary" id="slotify-install-btn">Install</button>
        <button class="slotify-btn-secondary" id="slotify-install-close">Later</button>
      </div>
    `;
    document.body.appendChild(box);

    document.getElementById('slotify-install-close').addEventListener('click', closeInstall);

    document.getElementById('slotify-install-btn').addEventListener('click', async () => {
      if (slotifyDeferredPrompt) {
        slotifyDeferredPrompt.prompt();
        const choice = await slotifyDeferredPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') closeInstall();
        slotifyDeferredPrompt = null;
      } else {
        alert('On iPhone: tap Share → Add to Home Screen.');
      }
    });
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    if (localStorage.getItem('slotifyInstallDismissed') === '1') return;
    slotifyDeferredPrompt = e;
    createInstallPopup();
    setTimeout(() => {
      const box = document.getElementById('slotify-install');
      if (box) box.classList.add('slotify-show');
    }, 1200);
  });

  window.addEventListener('appinstalled', () => {
    closeInstall();
    localStorage.removeItem('slotifyInstallDismissed');
  });

  document.addEventListener('DOMContentLoaded', () => {
    // iPhone fallback
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isIOS && !isStandalone && localStorage.getItem('slotifyInstallDismissed') !== '1') {
      createInstallPopup();
      setTimeout(() => {
        const box = document.getElementById('slotify-install');
        if (box) {
          box.querySelector('.slotify-install-text').textContent =
            'On iPhone, tap Share and then “Add to Home Screen”.';
          box.classList.add('slotify-show');
        }
      }, 1600);
    }
  });
})();
