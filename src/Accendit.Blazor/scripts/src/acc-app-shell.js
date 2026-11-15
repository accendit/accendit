import { LitElement, css, html } from 'lit';

export class AccAppShell extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: #0b0d12;
      color: #e8eefc;
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      line-height: 1.5;
    }
    .wrap {
      max-width: 42rem;
      margin: 0 auto;
      padding: 2rem 1.25rem 4rem;
    }
    ::slotted(*) {
      display: block;
    }
  `;

  render() {
    return html`
      <div class="wrap">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('acc-app-shell', AccAppShell);