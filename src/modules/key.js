export default class Key extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    const content = document.createElement('span');
    content.innerHTML = '';
    this.content = content;
    container.append(content);
    const style = document.createElement('style');
    style.textContent = `:host {
        display: inline-block;
        box-sizing: border-box;
        border-radius: 3px;
        max-width: 200px;
        min-width: 15px;
        height: 50px;
        width: 100%;
        background: var(--v-key-background , rgb(200, 200,200));
        color: var(--v-key-color , rgb(100, 100, 100));
        font-size: 1em;
        -webkit-box-shadow: -5px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
        -moz-box-shadow: -5px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
        box-shadow: -5px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
        margin: var(--v-key-margin, 5px);
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
    shadow.append(style);
    shadow.append(container);
  }

  connectedCallback() {
    console.log('create Key', this.content);
    this.content.innerHTML = this.getAttribute('kode');
    console.log('key', this.content);
  }
}
