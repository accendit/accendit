import { LitElement, css, html } from 'lit';

export class AccButton extends LitElement {
  static properties = {
    variant: { type: String },
    size: { type: String },
    buttonType: { type: String, attribute: 'button-type' },
    disabled: { type: Boolean, reflect: true },
  };

  static styles = css`
    :host {
      display: inline-block;
    }
    button {
      font: inherit;
      cursor: pointer;
      border-radius: 8px;
      border: 1px solid transparent;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
      font-weight: 600;
      letter-spacing: 0.01em;
    }
    button:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
    .md {
      padding: 0.5rem 1rem;
      font-size: 0.95rem;
    }
    .sm {
      padding: 0.35rem 0.75rem;
      font-size: 0.85rem;
    }
    .primary {
      background: #5b8def;
      color: #0b0d12;
    }
    .primary:hover:not(:disabled) {
      background: #7aa4f5;
    }
    .ghost {
      background: transparent;
      color: #c5d0e6;
      border-color: #3a4459;
    }
    .ghost:hover:not(:disabled) {
      border-color: #5b8def;
      color: #e8eefc;
    }
    .danger {
      background: transparent;
      color: #f29a9a;
      border-color: #5c3535;
    }
    .danger:hover:not(:disabled) {
      background: #3a1f1f;
      border-color: #f29a9a;
    }
    .link {
      background: none;
      border: none;
      padding: 0;
      color: #7aa4f5;
      font-weight: 500;
    }
    .link:hover:not(:disabled) {
      text-decoration: underline;
    }
    .link.danger {
      color: #f29a9a;
    }
  `;

  constructor() {
    super();
    this.variant = 'primary';
    this.size = 'md';
    this.buttonType = 'button';
    this.disabled = false;
  }

  render() {
    return html`
      <button
        class="${this.variant} ${this.size}"
        type=${this.buttonType}
        ?disabled=${this.disabled}
        @click=${this._onClick}
      >
        <slot></slot>
      </button>
    `;
  }

  _onClick(e) {
    this.dispatchEvent(
      new CustomEvent('acc-click', { bubbles: true, composed: true, detail: { originalEvent: e } }),
    );
  }
}

customElements.define('acc-button', AccButton);