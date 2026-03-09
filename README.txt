Slotify Complete PWA Kit

כולל:
- Splash screen
- Install popup
- favicon שקוף
- App icon עם פינות iOS
- manifest + service worker

1) בתוך <head> הוסף:
   <link rel="manifest" href="manifest.json">
   <meta name="theme-color" content="#4f46e5">
   <meta name="apple-mobile-web-app-capable" content="yes">
   <meta name="apple-mobile-web-app-status-bar-style" content="default">
   <meta name="apple-mobile-web-app-title" content="Slotify">
   <link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
   <link rel="icon" href="assets/favicon.ico" sizes="any">
   <link rel="icon" href="assets/favicon.png" type="image/png">
   <link rel="stylesheet" href="pwa-ui.css">

2) לפני </body> הוסף:
   <script>
   if ('serviceWorker' in navigator) {
     window.addEventListener('load', () => {
       navigator.serviceWorker.register('service-worker.js')
         .catch(err => console.error('Service Worker registration failed:', err));
     });
   }
   </script>
   <script src="pwa-ui.js"></script>

3) העלה את כל הקבצים לשורש הפרויקט יחד עם תיקיית assets.
