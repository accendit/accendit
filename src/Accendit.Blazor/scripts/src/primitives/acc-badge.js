import { LitElement, css, html } from 'lit';

export class AccBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    span {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 0.2rem 0.55rem;
      border-radius: 999px;
      background: #252b3a;
      color: #b8c4de;
      border: 1px solid #3a4459;
    }
  `;

  render() {
    return html`<span><slot></slot></span>`;
  }
}

customElements.define('acc-badge', AccBadge);