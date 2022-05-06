// eslint-disable-next-line import/extensions
import keysMap from './keys.js';

const keyboardArray = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'InitBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
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

const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
const line = Array.from({ length: 5 }, () => document.createElement('div'));
line.forEach((el, i) => {
  addKeys.call(el, ...keyboardArray[i]);
  keyboard.append(el);
  el.classList.add('key-line', `line${i}`);
});
const keyboardStyle = document.createElement('style');
keyboardStyle.innerHTML = `
.keyboard {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    max-width: 1200px;
    min-width: 810px;
    margin: auto;
}
.key-line {
    display: flex;
    flex-wrap: nowrap;
    align-content: stretch;
}

.key-line > * {
    flex-basis: 6.5%;
}

.line0 :last-child {
    flex-basis: 15.5%;
}
.line2 :last-child,
.line2 :first-child  {
    flex-basis: 14.25%;
}
.line3 :last-child,
.line3 :first-child  {
    flex-basis: 11%;
}

.line4 :nth-child(4) {
    flex-basis: 43.5%;
}
.line4 :last-child {
    flex-basis: 11%;
}
`;
keyboard.append(keyboardStyle);

export default keyboard;
