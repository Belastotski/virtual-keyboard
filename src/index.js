/* eslint-disable import/extensions */
import keyboard from './keyboard.js';
import Key from './modules/key.js';

customElements.define('v-key', Key);

const app = document.getElementById('app');
const container = document.createElement('div');
app.append(container);
container.append(keyboard);

// app.addEventListener('keydown', (e) => {
//   console.log(e.code);
// });
