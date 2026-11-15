import { LitElement, css, html } from 'lit';

export class AccHomePromo extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    h1 {
      font-size: 1.85rem;
      margin: 0 0 0.35rem;
    }
    p {
      color: #b8c4de;
    }
    a {
      display: inline-block;
      margin-top: 1rem;
      color: #7aa4f5;
      font-weight: 600;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <h1>Hello, world!</h1>
      <p>Welcome to your new app.</p>
      <a href="/c/create">Create a community</a>
    `;
  }
}

customElements.define('acc-home-promo', AccHomePromo);