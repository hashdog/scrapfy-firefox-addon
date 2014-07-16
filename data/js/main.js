var langSelector = document.getElementById('lang-selector');
var createButton = document.getElementById('create-btn');
var createText = document.getElementById('create-text');
var loadingText = document.getElementById('loading-text');

self.port.on('opened', function() {
  createText.style.display = 'block';
  loadingText.style.display = 'none';
});

createButton.addEventListener('click', function() {
  createText.style.display = 'none';
  loadingText.style.display = 'block';

  var lang = langSelector.value;
  self.port.emit('create', lang);
}, false);
