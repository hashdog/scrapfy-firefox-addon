var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require('sdk/panel');
var data = require('sdk/self').data;
var tabs = require('sdk/tabs');
var Request = require('sdk/request').Request;

var button = ToggleButton({
  id: 'scrapfy-addon',
  label: 'SCRAPfy',
  icon: {
    '16': './img/icon-16.png',
    '32': './img/icon-32.png',
    '64': './img/icon-64.png'
  },
  onChange: handleChange
});

var panel = panels.Panel({
  contentURL: data.url('popup.html'),
  contentScriptFile: data.url('js/main.js'),
  onHide: handleHide,
  height: 180
});

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}

panel.port.on('create', function(lang) {
  Request({
    url: 'http://api.scrapfy.io/scraps',
    content: {lang: lang},
    onComplete: function (response) {
      if (response.status === 200) {
        tabs.open(response.json.url);
      }
    }
  }).post();

  panel.hide();
});
