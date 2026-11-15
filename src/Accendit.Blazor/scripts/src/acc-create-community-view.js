import { LitElement, css, html } from 'lit';

export class AccCreateCommunityView extends LitElement {
  static properties = {
    state: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
    }
    h1 {
      font-size: 1.75rem;
      margin: 0 0 1.25rem;
    }
    .error {
      color: #f29a9a;
      margin-top: 0.75rem;
    }
    .create-btn {
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.5rem 1rem;
      background: #5b8def;
      color: #0b0d12;
    }
    .create-btn:hover {
      background: #7aa4f5;
    }
  `;

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const s = this.state ?? {};

    return html`
      <h1>Create a community</h1>
      <acc-field
        label="Name"
        name="name"
        hint="Lowercase URL segment, e.g. puppies → /c/puppies"
        .value=${s.name ?? ''}
        @acc-input=${(e) => this._emit('name', e.detail.value)}
      ></acc-field>
      <acc-field
        label="Description"
        multiline
        rows="4"
        name="description"
        .value=${s.description ?? ''}
        @acc-input=${(e) => this._emit('description', e.detail.value)}
      ></acc-field>
      <button type="button" class="create-btn" @click=${() => this._emit('create')}>Create</button>
      ${s.error ? html`<p class="error">${s.error}</p>` : null}
    `;
  }

  _emit(action, value) {
    this.dispatchEvent(
      new CustomEvent('acc-action', {
        bubbles: true,
        composed: true,
        detail: { action, value },
      }),
    );
  }
}

customElements.define('acc-create-community-view', AccCreateCommunityView);