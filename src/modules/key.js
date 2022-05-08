export default class Key extends HTMLElement {
  static #keys = new Map();

  static localSet = ['AltLeft', 'ShiftLeft'];

  static activKeys = new Set();

  static get keys() {
    return Key.#keys;
  }

  static getKey(code) {
    return Key.#keys.get(code);
  }

  static hasKey(code) {
    return Key.#keys.has(code);
  }

  static refresh() {
    Key.#keys.forEach((v) => v.setText());
  }

  static storage = window.localStorage;

  static #local = Key.storage.getItem('local') || 'en';

  static set local(set) {
    Key.storage.setItem('local', set);
    Key.#local = set === 'ru' ? 'ru' : 'en';
    Key.refresh();
  }

  static get local() {
    return Key.#local;
  }

  static #shift = false;

  static set Shift(set) {
    Key.#shift = !!set;
    Key.refresh();
  }

  static get Shift() {
    return Key.#shift;
  }

  static sysClear() {
    Key.Ctrl = false;
    Key.Alt = false;
    Key.Shift = false;
    Key.activKeys.forEach((el) => el.active(false));
    Key.activKeys.clear();
  }

  static Ctrl = false;

  static Meta = false;

  static Alt = false;

  static isActiveSys() {
    return Key.Ctrl || Key.Meta || Key.Alt;
  }

  static #capsLock = false;

  static set capsLock(set) {
    Key.#capsLock = !!set;
    Key.refresh();
  }

  static get capsLock() {
    return Key.#capsLock;
  }

  constructor() {
    super();
    this.storage = window.localStorage;
    const shadow = this.attachShadow({ mode: 'open' });
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    const content = document.createElement('span');
    this.content = content;
    this.text = '';
    container.append(content);
    const style = document.createElement('style');
    style.textContent = `:host {
        display: inline-block;
        box-sizing: border-box;
        border-radius: 3px;
        min-width: 50px;
        height: 50px;
        width: 50px;
        background: var(--v-key-background , rgb(200, 200,200));
        color: var(--v-key-color , rgb(100, 100, 100));
        font-size: 1em;
        -webkit-box-shadow: -5px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
        -moz-box-shadow: -5px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
        box-shadow: -5px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
        margin: var(--v-key-margin, 2px);
    }
    
    :host([active]), :host(:active) {
        background: var(--v-key-background-active , rgba(0, 0, 255, 0.5));
        color: var(--v-key-color-active , rgb(255, 255, 255));
        -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
        -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
        box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
    }
    
    :host(:hover) {
        background: var(--v-key-background-active , rgba(0, 0, 255, 0.2));
        color: var(--v-key-color-active , rgb(255, 255, 255));
        cursor: pointer;
    }`;
    shadow.append(container);
    shadow.append(style);
  }

  connectedCallback() {
    if (!this.option) {
      this.option = JSON.parse(this.getAttribute('option'));
    }
    if (!Key.#keys.has(this.option.code)) {
      Key.#keys.set(this.option.code, this);
      this.code = this.option.code;
    }
    this.setText();
  }

  disconnectedCallback() {
    Key.#keys.delete(this.option?.code);
  }

  active(status = true) {
    if (status) {
      if (!this.hasAttribute('active')) {
        this.setAttribute('active', 'true');
        if (this.option.type !== 'caps') Key.activKeys.add(this);
      }
    } else {
      this.removeAttribute('active');
      if (this.option.type !== 'caps') Key.activKeys.delete(this);
    }
  }

  isActive() {
    return Key.activKeys.has(this) || this.hasAttribute('active');
  }

  setText() {
    const local = this.option[Key.local];
    let text = (Key.#shift && local?.sft) || local.key;
    if ((Key.#shift && !Key.#capsLock) && this.option.type === 'key') {
      text = text.toUpperCase();
    } else if ((!Key.#shift && Key.#capsLock) && this.option.type === 'key') {
      text = text.toUpperCase();
    } else if ((Key.#shift && Key.#capsLock) && this.option.type === 'key') {
      text = text.toLowerCase();
    }
    this.value = text;
    this.content.innerHTML = this.value;
  }
}
