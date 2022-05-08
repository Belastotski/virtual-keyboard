/* eslint-disable import/extensions */
import keyboard from './keyboard.js';
import Key from './modules/key.js';
import Text from './modules/text.js';
import Controller from './controller.js';

customElements.define('v-key', Key);
customElements.define('v-text', Text);

const app = document.getElementById('app');
const container = document.createElement('div');
const text = document.createElement('v-text');
const controller = new Controller(Key, text);

app.append(container);
container.append(text);
container.append(keyboard);

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
