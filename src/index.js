/* eslint-disable import/extensions */

import Key from './modules/key.js';
import keysMap from './keys.js';

customElements.define('v-key', Key);

const keyboardArray = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'InitBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'AltLeft', 'ArrowDown', 'AltRight'],
];

const addKey = (code) => {
  const key = document.createElement('v-key');
  key.setAttribute('code', code);
  key.setAttribute('option', JSON.stringify(keysMap.get(code)));
  return key;
};

function addKeys(...code) {
  code.forEach((e) => this.append(addKey(e)));
}

const app = document.getElementById('app');
const container = document.createElement('div');
const keyboard = document.createElement('div');
const line = Array.from({ length: 5 }, () => document.createElement('div'));
line.forEach((el, i) => addKeys.call(el, ...keyboardArray[i]));
line.forEach((el) => keyboard.append(el));
app.append(container);
container.append(keyboard);

// app.addEventListener('keydown', (e) => {
//   console.log(e.code);
// });
