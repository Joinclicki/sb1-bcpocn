// Clicki Referrals Widget
(function() {
  // Create root container
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'clicki-referral-widget';
  document.body.appendChild(widgetContainer);

  // Load React and ReactDOM from CDN
  const scripts = [
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    'YOUR_HOSTED_APP_URL/app.js' // This will be your bundled widget code
  ];

  // Load scripts sequentially
  scripts.reduce((promise, src) => {
    return promise.then(() => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    });
  }, Promise.resolve());
})();