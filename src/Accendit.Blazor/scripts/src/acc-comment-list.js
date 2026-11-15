import { LitElement, css, html } from 'lit';

class AccCommentList extends LitElement {
  static properties = {
    communityName: { type: String, attribute: 'community-name' },
    topicId: { type: String, attribute: 'topic-id' },
    comments: { type: Array },
    depth: { type: Number },
    showActions: { type: Boolean, attribute: 'show-actions' },
    canReply: { type: Boolean, attribute: 'can-reply' },
  };

  static styles = css`
    :host {
      display: block;
    }
    .empty {
      color: #6f7d9a;
      font-style: italic;
    }
    .comment {
      margin-top: 0.75rem;
      padding-left: var(--indent, 0);
      border-left: 1px solid #252b3a;
    }
    .content {
      margin: 0 0 0.35rem;
      white-space: pre-wrap;
    }
    .meta {
      font-size: 0.8rem;
      color: #6f7d9a;
    }
    .meta a {
      color: #7aa4f5;
      text-decoration: none;
    }
    .meta a:hover {
      text-decoration: underline;
    }
    .actions {
      display: inline-flex;
      gap: 0.5rem;
      margin-left: 0.5rem;
    }
    .action {
      font: inherit;
      font-size: 0.8rem;
      background: none;
      border: none;
      padding: 0;
      color: #7aa4f5;
      cursor: pointer;
    }
    .action:hover {
      text-decoration: underline;
    }
    .action.danger {
      color: #f29a9a;
    }
  `;

  constructor() {
    super();
    this.comments = [];
    this.depth = 0;
    this.showActions = true;
    this.canReply = true;
  }

  render() {
    if (!this.comments?.length) {
      return this.depth === 0 ? html`<p class="empty">No comments yet.</p>` : null;
    }

    return html`${this.comments.map((c) => this._renderComment(c))}`;
  }

  _renderComment(comment) {
    const permalink = `/c/${this.communityName}/${this.topicId}/comments/${comment.id}`;
    const style = `--indent: ${this.depth * 1.25}rem`;

    return html`
      <article class="comment" style=${style}>
        <p class="content">${comment.content}</p>
        <div class="meta">
          <span>${comment.authorUserName} · ${comment.createdAt}</span>
          · <a href=${permalink}>permalink</a>
          <span class="actions">
            ${this.canReply
              ? html`<button class="action" data-action="reply" data-id=${comment.id}>Reply</button>`
              : null}
            ${this.showActions && comment.canEdit
              ? html`<button class="action" data-action="edit" data-id=${comment.id}>Edit</button>`
              : null}
            ${this.showActions && comment.canDelete
              ? html`<button class="action danger" data-action="delete" data-id=${comment.id}>Delete</button>`
              : null}
          </span>
        </div>
        ${comment.replies?.length
          ? html`<acc-comment-list
              community-name=${this.communityName}
              topic-id=${this.topicId}
              .comments=${comment.replies}
              depth=${this.depth + 1}
              ?show-actions=${this.showActions}
              ?can-reply=${this.canReply}
            ></acc-comment-list>`
          : null}
      </article>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._onClick);
  }

  _onClick(e) {
    const btn = e.target.closest('button.action');
    if (!btn) return;
    const { action, id } = btn.dataset;
    this.dispatchEvent(
      new CustomEvent('acc-comment-action', {
        bubbles: true,
        composed: true,
        detail: { action, commentId: id },
      }),
    );
  }
}

customElements.define('acc-comment-list', AccCommentList);