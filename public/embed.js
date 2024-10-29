// Clicki Referrals Widget Embed Script
(function() {
  const script = document.createElement('script');
  script.src = 'YOUR_HOSTED_APP_URL/widget.js'; // Replace with your actual hosted widget URL
  script.async = true;
  script.defer = true;
  
  const link = document.createElement('link');
  link.href = 'YOUR_HOSTED_APP_URL/style.css'; // Replace with your actual hosted CSS URL
  link.rel = 'stylesheet';
  
  document.head.appendChild(link);
  document.body.appendChild(script);
})();