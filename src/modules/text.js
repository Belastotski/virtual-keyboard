export default class Text extends HTMLElement {
  constructor() {
    super();
    const textArea = document.createElement('textarea');
    this.editor = textArea;
    textArea.className = 'textarea';
    const style = document.createElement('style');
    style.innerHTML = `
    :host {
        margin: auto;
        display: flex;
        justify-content: stretch;
        max-width: var(--max-width-text, 1200px);
        min-width: var(--mix-width-text, 810px);
        padding: 10px 0 10px 0;
    }
    .textarea {
        display: inline-block;
        width: 100%;
        height: 100%;
    }
    `;
    textArea.rows = 10;
    textArea.addEventListener('keydown', (e) => e.preventDefault());
    this.addEventListener('v-key', this.vHundle);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(style);
    shadow.append(textArea);
    this.navMap = new Map()
      .set('Enter', this.addText('\n\r'))
      .set('Tab', this.addText('\u0009'));
  }

  //   connectedCallback() {

  //   }

  vHundle(e) {
    switch (e.detail.type) {
      case 'key':
        this.addText(e.detail.value);
        break;
      case 'nav': if (this.navMap.has(e.detail.value)) this.navMap.get(e.detail.value);
        break;
      default: break;
    }
  }

  addText(text) {
    this.editor.value += text;
  }

  //   del() {

  //   }

  //   remove() {

//   }
}
