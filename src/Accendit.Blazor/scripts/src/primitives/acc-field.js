import { LitElement, css, html } from 'lit';

export class AccField extends LitElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    type: { type: String },
    multiline: { type: Boolean },
    rows: { type: Number },
    value: { type: String },
    placeholder: { type: String },
    hint: { type: String },
    maxlength: { type: Number },
  };

  static styles = css`
    :host {
      display: block;
      margin-bottom: 0.85rem;
    }
    label {
      display: block;
      font-size: 0.85rem;
      color: #9aa8c4;
      margin-bottom: 0.35rem;
    }
    input,
    textarea {
      width: 100%;
      box-sizing: border-box;
      font: inherit;
      color: #e8eefc;
      background: #151922;
      border: 1px solid #2c3447;
      border-radius: 8px;
      padding: 0.55rem 0.75rem;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    input:focus,
    textarea:focus {
      border-color: #5b8def;
      box-shadow: 0 0 0 3px rgba(91, 141, 239, 0.2);
    }
    textarea {
      resize: vertical;
      min-height: 4.5rem;
    }
    .hint {
      margin-top: 0.35rem;
      font-size: 0.8rem;
      color: #6f7d9a;
    }
  `;

  constructor() {
    super();
    this.type = 'text';
    this.multiline = false;
    this.rows = 4;
    this.value = '';
  }

  render() {
    const control = this.multiline
      ? html`<textarea
          id="input"
          name=${this.name || ''}
          rows=${this.rows}
          placeholder=${this.placeholder || ''}
          .value=${this.value}
          maxlength=${this.maxlength || nothing}
          @input=${this._onInput}
        ></textarea>`
      : html`<input
          id="input"
          name=${this.name || ''}
          type=${this.type}
          placeholder=${this.placeholder || ''}
          .value=${this.value}
          maxlength=${this.maxlength || nothing}
          @input=${this._onInput}
        />`;

    return html`
      ${this.label ? html`<label for="input">${this.label}</label>` : null}
      ${control}
      ${this.hint ? html`<p class="hint">${this.hint}</p>` : null}
    `;
  }

  _onInput(e) {
    this.value = e.target.value;
    this.dispatchEvent(
      new CustomEvent('acc-input', {
        bubbles: true,
        composed: true,
        detail: { name: this.name, value: this.value },
      }),
    );
  }
}

const nothing = undefined;

customElements.define('acc-field', AccField);