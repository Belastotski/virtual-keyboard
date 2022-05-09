import keyboard from './keyboard.js';
import Key from './modules/key.js';
import Text from './modules/text.js';
import Controller from './controller.js';

customElements.define('v-key', Key);
customElements.define('v-text', Text);

const html = document.querySelector('html');
const head = document.querySelector('head');
const app = document.getElementById('app');
const container = document.createElement('div');
const text = document.createElement('v-text');
const controller = new Controller(Key, text);
const desc = document.createElement('div');
desc.innerHTML = `
</br>Keyboard was created in Windows. 
</br> Switch between language LeftShift + LeftAlt.
</br> Auto keys repeat off.
`;
desc.style.margin = 'auto';
desc.style.maxWidth = '1200px';
desc.style.minWidth = '810px';

head.innerHTML = `
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="./style.css" />
<title>Keyboard</title>
`;
html.setAttribute('lang', 'en');
app.append(container);
container.append(text);
container.append(keyboard);
container.append(desc);

app.onblur = Key.sysClear;

app.addEventListener('keydown', (e) => {
  if (!Key.hasKey(e.code)) return;
  e.preventDefault();
  if (!e.repeat) {
    const p = controller.down(e, Key.getKey(e.code));
    if (p != null) controller.push(p);
  }
});

app.addEventListener('click', (e) => {
  if (!Key.hasKey(e.target.code)) return;
  e.preventDefault();
  {
    const p = controller.down(e, Key.getKey(e.target.code), false);
    if (p != null) controller.push(p);
    controller.up(e, Key.getKey(e.target.code), false);
  }
});

app.addEventListener('keyup', (e) => {
  if (!Key.hasKey(e.code)) return;
  e.preventDefault();
  controller.up(e, Key.getKey(e.code));
});
