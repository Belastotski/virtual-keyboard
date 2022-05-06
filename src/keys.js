const keysMap = new Map();

function addkey(code, enParam = code, ruParam = enParam, type = 'key') {
  const keyObj = {};
  keyObj.code = code;
  keyObj.type = type;
  keyObj.en = {};
  keyObj.ru = {};
  if (Array.isArray(enParam)) {
    [keyObj.en.key, keyObj.en.sft] = enParam;
  } else keyObj.en.key = enParam;
  if (Array.isArray(ruParam)) {
    [keyObj.ru.key, keyObj.ru.sft] = ruParam;
  } else keyObj.ru.key = ruParam;
  keysMap.set(code, keyObj);
  return addkey;
}

addkey('Backquote', ['`', '~'], ['ё', '‘'])('"Backslash"', ['\\', '|'], ['\\', '|']);
addkey('BracketLeft', ['[', '{'], 'х')('BracketRight', [']', '}'], 'Ъ')('Comma', ['.', '>'], 'ю');
addkey('Digit0', ['0', ')'], ['0', ')'])('Digit1', ['1', '!'], ['1', '!'])('Digit2', ['2', '@'], ['2', '"']);
addkey('Digit3', ['3', '#'], ['3', '№'])('Digit4', ['4', '$'], ['4', ';'])('Digit5', ['5', '%'], ['5', '%']);
addkey('Digit6', ['6', '^'], ['6', ':'])('Digit7', ['7', '&'], ['7', '?'])('Digit8', ['8', '*'], ['8', '*']);
addkey('Digit9', ['9', '('], ['9', '('])('Equal', ['+', '='], ['+', '='])('Minus', ['-', '_'], ['-', '_']);
addkey('KeyA', 'a', 'ф')('KeyB', 'b', 'и')('KeyC', 'c', 'с')('KeyQ', 'q', 'й')('KeyW', 'w', 'ц')('KeyE', 'e', 'у');
addkey('KeyR', 'r', 'к')('KeyT', 't', 'е')('KeyY', 'y', 'н')('KeyU', 'u', 'г')('KeyI', 'i', 'ш')('KeyO', 'o', 'щ');
addkey('KeyP', 'p', 'з')('KeyS', 's', 'ы')('KeyD', 'd', 'в')('KeyF', 'f', 'а')('KeyG', 'g', 'п')('KeyH', 'h', 'р');
addkey('KeyJ', 'j', 'о')('KeyK', 'k', 'л')('KeyL', 'l', 'д')('KeyZ', 'z', 'я')('KeyX', 'x', 'ч')('KeyV', 'v', 'м');
addkey('KeyN', 'n', 'т')('KeyM', 'm', 'ь')('Period', [',', '<'], 'б')('Quote', ['\'', '"'], 'э')('Semicolon', [';', ':'], 'ж')('Slash', ['/', '?'], '.');
addkey('AltLeft', 'Alt', 'Alt', 'sys')('AltRight', 'Alt', 'Alt', 'sys')('CapsLock', 'CapsLock', 'CapsLock', 'sys')('ControlLeft', 'Ctrl', 'Ctrl', 'sys');
addkey('Enter', 'Enter', 'Enter', 'nav')('MetaLeft', '⌘', '⌘', 'sys')('ShiftLeft', 'Shift ⇧', 'Shift ⇧', 'sys')('ControlRight', 'Ctrl', 'Ctrl', 'sys');
addkey('Space', ' ', ' ')('Tab', 'Tab ⇥', 'Tab ⇥', 'nav')('ShiftRight', 'Shift ⇧', 'Shift ⇧', 'sys');
addkey('ArrowDown', '↓', '↓', 'nav')('ArrowLeft', '←', '←', 'nav')('IntlBackslash', '\\', '|');
addkey('ArrowRight', '→', '→', 'nav')('ArrowUp', '↑', '↑', 'nav')('Delete', '⌦', '⌦', 'nav')('Backspace', '⌫', '⌫', 'nav');

export default keysMap;
