function resolveView(host, tagName) {
  if (!host) {
    return null;
  }

  const normalized = tagName.toUpperCase();
  if (host.tagName === normalized) {
    return host;
  }

  return host.querySelector?.(tagName) ?? null;
}

function setState(view, state) {
  if (view) {
    view.state = state;
  }
}

function attachListeners(view, dotNetRef) {
  if (!view || view._accBridgeAttached) {
    return;
  }

  view._accBridgeAttached = true;
  view._dotNetRef = dotNetRef;

  view.addEventListener('acc-action', (e) => {
    const { action, value } = e.detail ?? {};
    dotNetRef
      .invokeMethodAsync('OnLitAction', action, value ?? null)
      .catch(() => {
        /* circuit disconnected */
      });
  });
}

async function prepareView(host, tagName) {
  await customElements.whenDefined(tagName);
  return resolveView(host, tagName);
}

async function attach(host, dotNetRef, state, tagName) {
  const view = await prepareView(host, tagName);
  if (!view) {
    return;
  }

  attachListeners(view, dotNetRef);
  setState(view, state);
}

async function update(host, state, tagName) {
  const view = await prepareView(host, tagName);
  setState(view, state);
}

async function sync(host, dotNetRef, state, tagName) {
  const view = await prepareView(host, tagName);
  if (!view) {
    return;
  }

  if (dotNetRef) {
    attachListeners(view, dotNetRef);
  }

  setState(view, state);
}

const CREATE_VIEW = 'acc-create-community-view';
const COMMUNITY_VIEW = 'acc-community-view';
const TOPIC_VIEW = 'acc-topic-view';
const COMMENT_VIEW = 'acc-comment-view';

export async function attachCommunityView(element, dotNetRef, state) {
  await attach(element, dotNetRef, state, COMMUNITY_VIEW);
}

export async function updateCommunityView(element, state) {
  await update(element, state, COMMUNITY_VIEW);
}

export async function syncCommunityView(element, dotNetRef, state) {
  await sync(element, dotNetRef, state, COMMUNITY_VIEW);
}

export async function attachTopicView(element, dotNetRef, state) {
  await attach(element, dotNetRef, state, TOPIC_VIEW);
}

export async function updateTopicView(element, state) {
  await update(element, state, TOPIC_VIEW);
}

export async function syncTopicView(element, dotNetRef, state) {
  await sync(element, dotNetRef, state, TOPIC_VIEW);
}

export async function attachCommentView(element, dotNetRef, state) {
  await attach(element, dotNetRef, state, COMMENT_VIEW);
}

export async function updateCommentView(element, state) {
  await update(element, state, COMMENT_VIEW);
}

export async function syncCommentView(element, dotNetRef, state) {
  await sync(element, dotNetRef, state, COMMENT_VIEW);
}

export async function attachCreateCommunityView(element, dotNetRef, state) {
  await attach(element, dotNetRef, state, CREATE_VIEW);
}

export async function updateCreateCommunityView(element, state) {
  await update(element, state, CREATE_VIEW);
}

export async function syncCreateCommunityView(element, dotNetRef, state) {
  await sync(element, dotNetRef, state, CREATE_VIEW);
}