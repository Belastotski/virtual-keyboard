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
    }
    .textarea {
        display: inline-block;
        width: 100%;
        height: 100%;
    }
    `;
    textArea.rows = 10;
    textArea.addEventListener('keydown', (e) => e.preventDefault());
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(style);
    shadow.append(textArea);
  }

  //   connectedCallback() {

//   }
}
