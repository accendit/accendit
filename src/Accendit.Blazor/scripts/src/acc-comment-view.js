import { LitElement, css, html } from 'lit';

export class AccCommentView extends LitElement {
  static properties = {
    state: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
    }
    .crumb {
      font-size: 0.9rem;
      color: #6f7d9a;
    }
    .crumb a {
      color: #7aa4f5;
      text-decoration: none;
    }
    .crumb a:hover {
      text-decoration: underline;
    }
    article {
      margin: 1rem 0 1.5rem;
      padding-left: 0.75rem;
      border-left: 3px solid #3a4459;
    }
    .content {
      white-space: pre-wrap;
      margin: 0 0 0.5rem;
    }
    .meta {
      font-size: 0.8rem;
      color: #6f7d9a;
    }
    .actions {
      display: flex;
      gap: 0.75rem;
      margin-top: 0.35rem;
    }
    h2 {
      font-size: 1.05rem;
      margin: 1.25rem 0 0.75rem;
    }
  `;

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const s = this.state ?? {};
    if (s.notFound) {
      return html`<h2>Comment not found</h2>`;
    }

    return html`
      <p class="crumb">
        <a href="/c/${s.communityName}">/c/${s.communityName}</a>
        · <a href="/c/${s.communityName}/topics/${s.topicId}">${s.topicTitle}</a>
      </p>

      <article>
        <p class="content">${s.content}</p>
        <div class="meta">${s.authorUserName} · ${s.createdAt}</div>
        ${s.canEdit || s.canDelete
          ? html`
              <div class="actions">
                ${s.canEdit
                  ? html`<acc-button variant="link" size="sm" @acc-click=${() => this._emit('start-edit')}>Edit</acc-button>`
                  : null}
                ${s.canDelete
                  ? html`<acc-button variant="link" size="sm" @acc-click=${() => this._emit('delete-comment')}>Delete</acc-button>`
                  : null}
              </div>
            `
          : null}
      </article>

      ${s.editing
        ? html`
            <acc-field multiline rows="4" .value=${s.editContent ?? ''} @acc-input=${(e) => this._emit('edit-input', e.detail.value)}></acc-field>
            <acc-button size="sm" @acc-click=${() => this._emit('save-comment')}>Save</acc-button>
            <acc-button variant="ghost" size="sm" @acc-click=${() => this._emit('cancel-edit')}>Cancel</acc-button>
          `
        : null}

      <h2>Replies</h2>
      ${s.isSignedIn
        ? html`
            <acc-field multiline rows="3" placeholder="Reply" .value=${s.replyContent ?? ''} @acc-input=${(e) => this._emit('reply-input', e.detail.value)}></acc-field>
            <acc-button size="sm" @acc-click=${() => this._emit('post-reply')}>Reply</acc-button>
          `
        : null}

      <acc-comment-list
        community-name=${s.communityName}
        topic-id=${s.topicId}
        .comments=${s.replies ?? []}
        ?can-reply=${false}
        ?show-actions=${false}
      ></acc-comment-list>
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

customElements.define('acc-comment-view', AccCommentView);