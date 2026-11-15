import { LitElement, css, html } from 'lit';

export class AccCommunityView extends LitElement {
  static properties = {
    state: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
    }
    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 0.5rem;
      letter-spacing: -0.02em;
    }
    .lead {
      font-size: 1.05rem;
      color: #b8c4de;
      margin: 0 0 1.25rem;
    }
    .membership {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.25rem;
    }
    .moderator {
      margin-bottom: 1.5rem;
    }
    .row {
      display: flex;
      gap: 0.5rem;
      align-items: flex-end;
      max-width: 22rem;
    }
    .row acc-field {
      flex: 1;
    }
    h2 {
      font-size: 1.1rem;
      margin: 1.75rem 0 0.75rem;
      color: #d4ddef;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      padding: 0.65rem 0;
      border-bottom: 1px solid #1e2433;
    }
    li a {
      color: #e8eefc;
      text-decoration: none;
      font-weight: 600;
    }
    li a:hover {
      color: #7aa4f5;
    }
  li time {
      margin-left: 0.5rem;
      font-size: 0.8rem;
      color: #6f7d9a;
      font-weight: 400;
    }
    .muted {
      color: #6f7d9a;
    }
    .error {
      color: #f29a9a;
      margin-top: 0.5rem;
    }
    .signin a {
      color: #7aa4f5;
    }
    .divider {
      border: none;
      border-top: 1px solid #1e2433;
      margin: 1.75rem 0;
    }
  `;

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const s = this.state ?? {};
    if (!s.loaded) {
      return html``;
    }
    if (s.notFound) {
      return html`<h2>Community not found</h2>`;
    }

    const role = s.membershipRole;

    return html`
      <h1>/c/${s.name}</h1>
      ${s.description ? html`<p class="lead">${s.description}</p>` : null}

      ${s.isSignedIn
        ? html`
            <div class="membership">
              ${role == null
                ? html`<acc-button variant="ghost" size="sm" @acc-click=${() => this._emit('follow')}>Follow</acc-button>`
                : html`
                    <acc-badge>${role}</acc-badge>
                    ${role === 'Follower'
                      ? html`<acc-button variant="ghost" size="sm" @acc-click=${() => this._emit('unfollow')}>Unfollow</acc-button>`
                      : null}
                  `}
            </div>
            ${role === 'Owner'
              ? html`
                  <div class="moderator">
                    <acc-field
                      label="Add moderator (account email)"
                      name="moderatorEmail"
                      .value=${s.moderatorEmail ?? ''}
                      @acc-input=${(e) => this._emit('moderator-email', e.detail.value)}
                    ></acc-field>
                    <div class="row">
                      <acc-button variant="ghost" size="sm" @acc-click=${() => this._emit('add-moderator')}>Add</acc-button>
                    </div>
                    ${s.moderatorMessage ? html`<p class="muted">${s.moderatorMessage}</p>` : null}
                  </div>
                `
              : null}
          `
        : null}

      <h2>Topics</h2>
      ${!s.topics?.length ? html`<p class="muted"><em>No topics yet.</em></p>` : null}
      <ul>
        ${(s.topics ?? []).map(
          (t) => html`
            <li>
              <a href="/c/${s.name}/topics/${t.id}">${t.title}</a>
              <time>${t.createdAt}</time>
            </li>
          `,
        )}
      </ul>

      ${s.isSignedIn
        ? html`
            <hr class="divider" />
            <h2>New topic</h2>
            <acc-field
              name="title"
              placeholder="Title (max 50 characters)"
              maxlength="50"
              .value=${s.newTopicTitle ?? ''}
              @acc-input=${(e) => this._emit('topic-title', e.detail.value)}
            ></acc-field>
            <acc-field
              multiline
              rows="5"
              name="content"
              placeholder="Content"
              .value=${s.newTopicContent ?? ''}
              @acc-input=${(e) => this._emit('topic-content', e.detail.value)}
            ></acc-field>
            <acc-button size="sm" @acc-click=${() => this._emit('create-topic')}>Post topic</acc-button>
            ${s.topicError ? html`<p class="error">${s.topicError}</p>` : null}
          `
        : html`<p class="signin"><a href="Account/Login">Sign in</a> to post or follow.</p>`}
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

customElements.define('acc-community-view', AccCommunityView);