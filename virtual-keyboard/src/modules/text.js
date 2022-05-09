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
    this.specMap = new Map()
      .set('Enter', () => this.addText('\r'))
      .set('Tab', () => this.addText('\u0009'))
      .set('Backspace', () => this.remove())
      .set('Delete', () => this.del())
      .set('ArrowLeft', () => { this.back(); this.editor.focus(); })
      .set('ArrowUp', () => { this.up(); this.editor.focus(); })
      .set('ArrowDown', () => { this.down(); this.editor.focus(); })
      .set('ArrowRight', () => { this.forward(); this.editor.focus(); });
  }

  //   connectedCallback() {

  //   }

  vHundle(e) {
    const { type, code, value } = e.detail;
    switch (type) {
      case 'key':
        if (value === '&#92;') {
          this.addText('\\');
          break;
        }
        this.addText(value);
        break;
      case 'nav':
        if (this.specMap.has(code)) this.specMap.get(code)();
        break;
      default: break;
    }
  }

  addText(text) {
    this.editor.setRangeText(text, this.getCursor().start, this.getCursor().end, 'end');
    this.editor.scrollTop = this.editor.scrollHeight;
  }

  del() {
    if (this.isSelected()) {
      this.editor.setRangeText('', this.getCursor().start, this.getCursor().end, 'end');
    } else if (this.getCursor().end < this.editor.textLength) {
      this.editor.setRangeText('', this.getCursor().start, this.getCursor().end + 1, 'end');
    }
  }

  remove() {
    if (this.isSelected()) {
      this.editor.setRangeText('', this.getCursor().start, this.getCursor().end, 'end');
    } else if (this.getCursor().start) {
      this.editor.setRangeText('', this.getCursor().start - 1, this.getCursor().end, 'end');
    }
  }

  getCursor() {
    return { start: this.editor.selectionStart, end: this.editor.selectionEnd };
  }

  isSelected() {
    const { start, end } = this.getCursor();
    return start !== end;
  }

  back(shift = false) {
    if (this.editor.selectionStart) {
      if (shift) this.editor.selectionStart -= 1;
      this.editor.setSelectionRange(this.editor.selectionStart - 1, this.editor.selectionStart - 1);
    }
  }

  forward(shift = false) {
    if (this.editor.selectionStart < this.editor.textLength) {
      if (this.isSelected()) {
        this.editor.setSelectionRange(this.editor.selectionEnd, this.editor.selectionEnd);
        return;
      }
      if (shift) this.editor.selectionStart += 1;
      this.editor.setSelectionRange(this.editor.selectionStart + 1, this.editor.selectionStart + 1);
    }
  }

  offsetInRow(pos = this.editor.selectionStart) {
    return this.editor.value.substring(0, pos).replace(/^(.*[\n\r])*([^\n\r]*)$/, '$2').length;
  }

  offsetToRow(pos = this.editor.selectionEnd) {
    return this.editor.value.indexOf('\n', pos) - pos;
  }

  up(shift = false) {
    const end = this.editor.selectionEnd;
    const offset = this.offsetInRow();
    if (this.editor.selectionStart <= offset) {
      this.editor.setSelectionRange(0, 0);
      return 1;
    }
    this.editor.setSelectionRange(
      this.editor.selectionStart - offset - 1,
      shift ? end : this.editor.selectionStart - offset - 1,
    );
    const length = this.offsetInRow();
    if (length <= offset) {
      return 1;
    }
    this.editor.setSelectionRange(
      this.editor.selectionStart - length + offset,
      shift ? end : this.editor.selectionStart - length + offset,
    );
    return 1;
  }

  down(shift = false) {
    const start = this.editor.selectionStar;
    const offset = this.offsetInRow();
    const to = this.offsetToRow();
    if (to < 0) {
      this.editor.setSelectionRange(this.editor.textLength, this.editor.textLength);
      return 1;
    }
    this.editor.setSelectionRange(
      shift ? start : this.editor.selectionStart + to + 1,
      this.editor.selectionEnd + to + 1,
    );
    let length = this.offsetToRow();
    if (length < 0) {
      length = offset;
    } else length = length < offset ? length : offset;
    this.editor.setSelectionRange(
      shift ? start : this.editor.selectionStart + length,
      this.editor.selectionEnd + length,
    );
    return 1;
  }
}
