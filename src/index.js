/* eslint-disable import/extensions */
import keyboard from './keyboard.js';
import Key from './modules/key.js';
import Text from './modules/text.js';

customElements.define('v-key', Key);
customElements.define('v-text', Text);

const app = document.getElementById('app');
const container = document.createElement('div');
const text = document.createElement('v-text');

app.append(container);
container.append(text);
container.append(keyboard);

// app.addEventListener('keydown', (e) => {
//   console.log(e.code);
// });
