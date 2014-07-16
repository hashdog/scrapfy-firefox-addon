var langSelector = document.getElementById('lang-selector');
var createButton = document.getElementById('create-btn');

createButton.addEventListener('click', function() {
  var lang = langSelector.value;
  self.port.emit('create', lang);
}, false);
