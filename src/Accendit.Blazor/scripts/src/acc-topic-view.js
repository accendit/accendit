import { LitElement, css, html } from 'lit';

export class AccTopicView extends LitElement {
  static properties = {
    state: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
    }
    .crumb a {
      color: #7aa4f5;
      text-decoration: none;
      font-size: 0.9rem;
    }
    .crumb a:hover {
      text-decoration: underline;
    }
    h1 {
      font-size: 2.25rem;
      line-height: 1.15;
      margin: 0.75rem 0 1rem;
      letter-spacing: -0.03em;
    }
    .body {
      white-space: pre-wrap;
      margin-bottom: 1.25rem;
      color: #d4ddef;
    }
    .toolbar {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 2rem;
    }
    h2 {
      font-size: 1.15rem;
      margin: 0 0 1rem;
    }
    .reply-banner {
      font-size: 0.85rem;
      color: #6f7d9a;
      margin-bottom: 0.5rem;
    }
    .divider {
      border: none;
      border-top: 1px solid #1e2433;
      margin: 1.5rem 0;
    }
  `;

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const s = this.state ?? {};
    if (s.notFound) {
      return html`<h2>Topic not found</h2>`;
    }

    if (s.editing) {
      return html`
        <h1>Edit topic</h1>
        <acc-field name="title" maxlength="50" .value=${s.editTitle ?? ''} @acc-input=${(e) => this._emit('edit-title', e.detail.value)}></acc-field>
        <acc-field multiline rows="8" name="content" .value=${s.editContent ?? ''} @acc-input=${(e) => this._emit('edit-content', e.detail.value)}></acc-field>
        <acc-button size="sm" @acc-click=${() => this._emit('save-topic')}>Save</acc-button>
        <acc-button variant="ghost" size="sm" @acc-click=${() => this._emit('cancel-edit')}>Cancel</acc-button>
      `;
    }

    const commentPlaceholder = s.replyToId ? 'Write a reply' : 'Add a comment';

    return html`
      <p class="crumb"><a href="/c/${s.communityName}">/c/${s.communityName}</a></p>
      <h1>${s.title}</h1>
      <p class="body">${s.content}</p>
      ${s.canModifyTopic
        ? html`
            <div class="toolbar">
              <acc-button variant="ghost" size="sm" @acc-click=${() => this._emit('start-edit')}>Edit</acc-button>
              <acc-button variant="danger" size="sm" @acc-click=${() => this._emit('delete-topic')}>Delete</acc-button>
            </div>
          `
        : null}

      <h2>Comments</h2>
      ${s.isSignedIn
        ? html`
            ${s.replyToId
              ? html`<p class="reply-banner">
                  Replying to a comment.
                  <acc-button variant="link" size="sm" @acc-click=${() => this._emit('cancel-reply')}>Cancel reply</acc-button>
                </p>`
              : null}
            <acc-field
              multiline
              rows="3"
              name="comment"
              placeholder=${commentPlaceholder}
              .value=${s.newComment ?? ''}
              @acc-input=${(e) => this._emit('comment-input', e.detail.value)}
            ></acc-field>
            <acc-button size="sm" @acc-click=${() => this._emit('post-comment')}>${s.replyToId ? 'Reply' : 'Comment'}</acc-button>
          `
        : null}

      <acc-comment-list
        community-name=${s.communityName}
        topic-id=${s.topicId}
        .comments=${s.comments ?? []}
        ?can-reply=${s.isSignedIn}
        show-actions
        @acc-comment-action=${this._onCommentAction}
      ></acc-comment-list>

      ${s.editingCommentId
        ? html`
            <hr class="divider" />
            <h2>Edit comment</h2>
            <acc-field
              multiline
              rows="3"
              .value=${s.editCommentContent ?? ''}
              @acc-input=${(e) => this._emit('edit-comment-input', e.detail.value)}
            ></acc-field>
            <acc-button size="sm" @acc-click=${() => this._emit('save-comment')}>Save</acc-button>
            <acc-button variant="ghost" size="sm" @acc-click=${() => this._emit('cancel-comment-edit')}>Cancel</acc-button>
          `
        : null}
    `;
  }

  _onCommentAction(e) {
    const { action, commentId } = e.detail;
    this._emit(action, commentId);
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

customElements.define('acc-topic-view', AccTopicView);