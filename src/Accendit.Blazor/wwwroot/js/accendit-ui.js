// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t3, e4, o5) {
    if (this._$cssResult$ = true, o5 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3, this.t = e4;
  }
  get styleSheet() {
    let t3 = this.o;
    const s4 = this.t;
    if (e && void 0 === t3) {
      const e4 = void 0 !== s4 && 1 === s4.length;
      e4 && (t3 = o.get(s4)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e4 && o.set(s4, t3));
    }
    return t3;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t3) => new n("string" == typeof t3 ? t3 : t3 + "", void 0, s);
var i = (t3, ...e4) => {
  const o5 = 1 === t3.length ? t3[0] : e4.reduce((e5, s4, o6) => e5 + ((t4) => {
    if (true === t4._$cssResult$) return t4.cssText;
    if ("number" == typeof t4) return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s4) + t3[o6 + 1], t3[0]);
  return new n(o5, t3, s);
};
var S = (s4, o5) => {
  if (e) s4.adoptedStyleSheets = o5.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet);
  else for (const e4 of o5) {
    const o6 = document.createElement("style"), n4 = t.litNonce;
    void 0 !== n4 && o6.setAttribute("nonce", n4), o6.textContent = e4.cssText, s4.appendChild(o6);
  }
};
var c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e4 = "";
  for (const s4 of t4.cssRules) e4 += s4.cssText;
  return r(e4);
})(t3) : t3;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t3, s4) => t3;
var u = { toAttribute(t3, s4) {
  switch (s4) {
    case Boolean:
      t3 = t3 ? l : null;
      break;
    case Object:
    case Array:
      t3 = null == t3 ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, s4) {
  let i5 = t3;
  switch (s4) {
    case Boolean:
      i5 = null !== t3;
      break;
    case Number:
      i5 = null === t3 ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        i5 = JSON.parse(t3);
      } catch (t4) {
        i5 = null;
      }
  }
  return i5;
} };
var f = (t3, s4) => !i2(t3, s4);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var y = class extends HTMLElement {
  static addInitializer(t3) {
    this._$Ei(), (this.l ??= []).push(t3);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t3, s4 = b) {
    if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t3) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t3, s4), !s4.noAccessor) {
      const i5 = Symbol(), h3 = this.getPropertyDescriptor(t3, i5, s4);
      void 0 !== h3 && e2(this.prototype, t3, h3);
    }
  }
  static getPropertyDescriptor(t3, s4, i5) {
    const { get: e4, set: r4 } = h(this.prototype, t3) ?? { get() {
      return this[s4];
    }, set(t4) {
      this[s4] = t4;
    } };
    return { get: e4, set(s5) {
      const h3 = e4?.call(this);
      r4?.call(this, s5), this.requestUpdate(t3, h3, i5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t3 = n2(this);
    t3.finalize(), void 0 !== t3.l && (this.l = [...t3.l]), this.elementProperties = new Map(t3.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t4 = this.properties, s4 = [...r2(t4), ...o2(t4)];
      for (const i5 of s4) this.createProperty(i5, t4[i5]);
    }
    const t3 = this[Symbol.metadata];
    if (null !== t3) {
      const s4 = litPropertyMetadata.get(t3);
      if (void 0 !== s4) for (const [t4, i5] of s4) this.elementProperties.set(t4, i5);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t4, s4] of this.elementProperties) {
      const i5 = this._$Eu(t4, s4);
      void 0 !== i5 && this._$Eh.set(i5, t4);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s4) {
    const i5 = [];
    if (Array.isArray(s4)) {
      const e4 = new Set(s4.flat(1 / 0).reverse());
      for (const s5 of e4) i5.unshift(c(s5));
    } else void 0 !== s4 && i5.push(c(s4));
    return i5;
  }
  static _$Eu(t3, s4) {
    const i5 = s4.attribute;
    return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t3) => t3(this));
  }
  addController(t3) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t3), void 0 !== this.renderRoot && this.isConnected && t3.hostConnected?.();
  }
  removeController(t3) {
    this._$EO?.delete(t3);
  }
  _$E_() {
    const t3 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
    for (const i5 of s4.keys()) this.hasOwnProperty(i5) && (t3.set(i5, this[i5]), delete this[i5]);
    t3.size > 0 && (this._$Ep = t3);
  }
  createRenderRoot() {
    const t3 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t3, this.constructor.elementStyles), t3;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t3) => t3.hostConnected?.());
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t3) => t3.hostDisconnected?.());
  }
  attributeChangedCallback(t3, s4, i5) {
    this._$AK(t3, i5);
  }
  _$ET(t3, s4) {
    const i5 = this.constructor.elementProperties.get(t3), e4 = this.constructor._$Eu(t3, i5);
    if (void 0 !== e4 && true === i5.reflect) {
      const h3 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s4, i5.type);
      this._$Em = t3, null == h3 ? this.removeAttribute(e4) : this.setAttribute(e4, h3), this._$Em = null;
    }
  }
  _$AK(t3, s4) {
    const i5 = this.constructor, e4 = i5._$Eh.get(t3);
    if (void 0 !== e4 && this._$Em !== e4) {
      const t4 = i5.getPropertyOptions(e4), h3 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== t4.converter?.fromAttribute ? t4.converter : u;
      this._$Em = e4;
      const r4 = h3.fromAttribute(s4, t4.type);
      this[e4] = r4 ?? this._$Ej?.get(e4) ?? r4, this._$Em = null;
    }
  }
  requestUpdate(t3, s4, i5, e4 = false, h3) {
    if (void 0 !== t3) {
      const r4 = this.constructor;
      if (false === e4 && (h3 = this[t3]), i5 ??= r4.getPropertyOptions(t3), !((i5.hasChanged ?? f)(h3, s4) || i5.useDefault && i5.reflect && h3 === this._$Ej?.get(t3) && !this.hasAttribute(r4._$Eu(t3, i5)))) return;
      this.C(t3, s4, i5);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t3, s4, { useDefault: i5, reflect: e4, wrapped: h3 }, r4) {
    i5 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t3) && (this._$Ej.set(t3, r4 ?? s4 ?? this[t3]), true !== h3 || void 0 !== r4) || (this._$AL.has(t3) || (this.hasUpdated || i5 || (s4 = void 0), this._$AL.set(t3, s4)), true === e4 && this._$Em !== t3 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t3));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return null != t3 && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t5, s5] of this._$Ep) this[t5] = s5;
        this._$Ep = void 0;
      }
      const t4 = this.constructor.elementProperties;
      if (t4.size > 0) for (const [s5, i5] of t4) {
        const { wrapped: t5 } = i5, e4 = this[s5];
        true !== t5 || this._$AL.has(s5) || void 0 === e4 || this.C(s5, void 0, i5, e4);
      }
    }
    let t3 = false;
    const s4 = this._$AL;
    try {
      t3 = this.shouldUpdate(s4), t3 ? (this.willUpdate(s4), this._$EO?.forEach((t4) => t4.hostUpdate?.()), this.update(s4)) : this._$EM();
    } catch (s5) {
      throw t3 = false, this._$EM(), s5;
    }
    t3 && this._$AE(s4);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    this._$EO?.forEach((t4) => t4.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    this._$Eq &&= this._$Eq.forEach((t4) => this._$ET(t4, this[t4])), this._$EM();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.2");

// node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = (t3) => t3;
var s2 = t2.trustedTypes;
var e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
var h2 = "$lit$";
var o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n3 = "?" + o3;
var r3 = `<${n3}>`;
var l2 = document;
var c3 = () => l2.createComment("");
var a2 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
var u2 = Array.isArray;
var d2 = (t3) => u2(t3) || "function" == typeof t3?.[Symbol.iterator];
var f2 = "[ 	\n\f\r]";
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y2 = /^(?:script|style|textarea|title)$/i;
var x = (t3) => (i5, ...s4) => ({ _$litType$: t3, strings: i5, values: s4 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = Symbol.for("lit-noChange");
var A = Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t3, i5) {
  if (!u2(t3) || !t3.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i5) : i5;
}
var N = (t3, i5) => {
  const s4 = t3.length - 1, e4 = [];
  let n4, l3 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c4 = v;
  for (let i6 = 0; i6 < s4; i6++) {
    const s5 = t3[i6];
    let a3, u3, d3 = -1, f3 = 0;
    for (; f3 < s5.length && (c4.lastIndex = f3, u3 = c4.exec(s5), null !== u3); ) f3 = c4.lastIndex, c4 === v ? "!--" === u3[1] ? c4 = _ : void 0 !== u3[1] ? c4 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n4 = RegExp("</" + u3[2], "g")), c4 = p2) : void 0 !== u3[3] && (c4 = p2) : c4 === p2 ? ">" === u3[0] ? (c4 = n4 ?? v, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n4 = void 0);
    const x2 = c4 === p2 && t3[i6 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === v ? s5 + r3 : d3 >= 0 ? (e4.push(a3), s5.slice(0, d3) + h2 + s5.slice(d3) + o3 + x2) : s5 + o3 + (-2 === d3 ? i6 : x2);
  }
  return [V(t3, l3 + (t3[s4] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), e4];
};
var S2 = class _S {
  constructor({ strings: t3, _$litType$: i5 }, e4) {
    let r4;
    this.parts = [];
    let l3 = 0, a3 = 0;
    const u3 = t3.length - 1, d3 = this.parts, [f3, v2] = N(t3, i5);
    if (this.el = _S.createElement(f3, e4), P.currentNode = this.el.content, 2 === i5 || 3 === i5) {
      const t4 = this.el.content.firstChild;
      t4.replaceWith(...t4.childNodes);
    }
    for (; null !== (r4 = P.nextNode()) && d3.length < u3; ) {
      if (1 === r4.nodeType) {
        if (r4.hasAttributes()) for (const t4 of r4.getAttributeNames()) if (t4.endsWith(h2)) {
          const i6 = v2[a3++], s4 = r4.getAttribute(t4).split(o3), e5 = /([.?@])?(.*)/.exec(i6);
          d3.push({ type: 1, index: l3, name: e5[2], strings: s4, ctor: "." === e5[1] ? I : "?" === e5[1] ? L : "@" === e5[1] ? z : H }), r4.removeAttribute(t4);
        } else t4.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r4.removeAttribute(t4));
        if (y2.test(r4.tagName)) {
          const t4 = r4.textContent.split(o3), i6 = t4.length - 1;
          if (i6 > 0) {
            r4.textContent = s2 ? s2.emptyScript : "";
            for (let s4 = 0; s4 < i6; s4++) r4.append(t4[s4], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
            r4.append(t4[i6], c3());
          }
        }
      } else if (8 === r4.nodeType) if (r4.data === n3) d3.push({ type: 2, index: l3 });
      else {
        let t4 = -1;
        for (; -1 !== (t4 = r4.data.indexOf(o3, t4 + 1)); ) d3.push({ type: 7, index: l3 }), t4 += o3.length - 1;
      }
      l3++;
    }
  }
  static createElement(t3, i5) {
    const s4 = l2.createElement("template");
    return s4.innerHTML = t3, s4;
  }
};
function M(t3, i5, s4 = t3, e4) {
  if (i5 === E) return i5;
  let h3 = void 0 !== e4 ? s4._$Co?.[e4] : s4._$Cl;
  const o5 = a2(i5) ? void 0 : i5._$litDirective$;
  return h3?.constructor !== o5 && (h3?._$AO?.(false), void 0 === o5 ? h3 = void 0 : (h3 = new o5(t3), h3._$AT(t3, s4, e4)), void 0 !== e4 ? (s4._$Co ??= [])[e4] = h3 : s4._$Cl = h3), void 0 !== h3 && (i5 = M(t3, h3._$AS(t3, i5.values), h3, e4)), i5;
}
var R = class {
  constructor(t3, i5) {
    this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i5;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t3) {
    const { el: { content: i5 }, parts: s4 } = this._$AD, e4 = (t3?.creationScope ?? l2).importNode(i5, true);
    P.currentNode = e4;
    let h3 = P.nextNode(), o5 = 0, n4 = 0, r4 = s4[0];
    for (; void 0 !== r4; ) {
      if (o5 === r4.index) {
        let i6;
        2 === r4.type ? i6 = new k(h3, h3.nextSibling, this, t3) : 1 === r4.type ? i6 = new r4.ctor(h3, r4.name, r4.strings, this, t3) : 6 === r4.type && (i6 = new Z(h3, this, t3)), this._$AV.push(i6), r4 = s4[++n4];
      }
      o5 !== r4?.index && (h3 = P.nextNode(), o5++);
    }
    return P.currentNode = l2, e4;
  }
  p(t3) {
    let i5 = 0;
    for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t3, s4, i5), i5 += s4.strings.length - 2) : s4._$AI(t3[i5])), i5++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t3, i5, s4, e4) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t3, this._$AB = i5, this._$AM = s4, this.options = e4, this._$Cv = e4?.isConnected ?? true;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i5 = this._$AM;
    return void 0 !== i5 && 11 === t3?.nodeType && (t3 = i5.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i5 = this) {
    t3 = M(this, t3, i5), a2(t3) ? t3 === A || null == t3 || "" === t3 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== E && this._(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : d2(t3) ? this.k(t3) : this._(t3);
  }
  O(t3) {
    return this._$AA.parentNode.insertBefore(t3, this._$AB);
  }
  T(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.O(t3));
  }
  _(t3) {
    this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(l2.createTextNode(t3)), this._$AH = t3;
  }
  $(t3) {
    const { values: i5, _$litType$: s4 } = t3, e4 = "number" == typeof s4 ? this._$AC(t3) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
    if (this._$AH?._$AD === e4) this._$AH.p(i5);
    else {
      const t4 = new R(e4, this), s5 = t4.u(this.options);
      t4.p(i5), this.T(s5), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i5 = C.get(t3.strings);
    return void 0 === i5 && C.set(t3.strings, i5 = new S2(t3)), i5;
  }
  k(t3) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i5 = this._$AH;
    let s4, e4 = 0;
    for (const h3 of t3) e4 === i5.length ? i5.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i5[e4], s4._$AI(h3), e4++;
    e4 < i5.length && (this._$AR(s4 && s4._$AB.nextSibling, e4), i5.length = e4);
  }
  _$AR(t3 = this._$AA.nextSibling, s4) {
    for (this._$AP?.(false, true, s4); t3 !== this._$AB; ) {
      const s5 = i3(t3).nextSibling;
      i3(t3).remove(), t3 = s5;
    }
  }
  setConnected(t3) {
    void 0 === this._$AM && (this._$Cv = t3, this._$AP?.(t3));
  }
};
var H = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t3, i5, s4, e4, h3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t3, this.name = i5, this._$AM = e4, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
  }
  _$AI(t3, i5 = this, s4, e4) {
    const h3 = this.strings;
    let o5 = false;
    if (void 0 === h3) t3 = M(this, t3, i5, 0), o5 = !a2(t3) || t3 !== this._$AH && t3 !== E, o5 && (this._$AH = t3);
    else {
      const e5 = t3;
      let n4, r4;
      for (t3 = h3[0], n4 = 0; n4 < h3.length - 1; n4++) r4 = M(this, e5[s4 + n4], i5, n4), r4 === E && (r4 = this._$AH[n4]), o5 ||= !a2(r4) || r4 !== this._$AH[n4], r4 === A ? t3 = A : t3 !== A && (t3 += (r4 ?? "") + h3[n4 + 1]), this._$AH[n4] = r4;
    }
    o5 && !e4 && this.j(t3);
  }
  j(t3) {
    t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 ?? "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t3) {
    this.element[this.name] = t3 === A ? void 0 : t3;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t3) {
    this.element.toggleAttribute(this.name, !!t3 && t3 !== A);
  }
};
var z = class extends H {
  constructor(t3, i5, s4, e4, h3) {
    super(t3, i5, s4, e4, h3), this.type = 5;
  }
  _$AI(t3, i5 = this) {
    if ((t3 = M(this, t3, i5, 0) ?? A) === E) return;
    const s4 = this._$AH, e4 = t3 === A && s4 !== A || t3.capture !== s4.capture || t3.once !== s4.once || t3.passive !== s4.passive, h3 = t3 !== A && (s4 === A || e4);
    e4 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t3) : this._$AH.handleEvent(t3);
  }
};
var Z = class {
  constructor(t3, i5, s4) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    M(this, t3);
  }
};
var B = t2.litHtmlPolyfillSupport;
B?.(S2, k), (t2.litHtmlVersions ??= []).push("3.3.3");
var D = (t3, i5, s4) => {
  const e4 = s4?.renderBefore ?? i5;
  let h3 = e4._$litPart$;
  if (void 0 === h3) {
    const t4 = s4?.renderBefore ?? null;
    e4._$litPart$ = h3 = new k(i5.insertBefore(c3(), t4), t4, void 0, s4 ?? {});
  }
  return h3._$AI(t3), h3;
};

// node_modules/lit-element/lit-element.js
var s3 = globalThis;
var i4 = class extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t3 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t3.firstChild, t3;
  }
  update(t3) {
    const r4 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = D(r4, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return E;
  }
};
i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
var o4 = s3.litElementPolyfillSupport;
o4?.({ LitElement: i4 });
(s3.litElementVersions ??= []).push("4.2.2");

// src/primitives/acc-button.js
var AccButton = class extends i4 {
  static properties = {
    variant: { type: String },
    size: { type: String },
    buttonType: { type: String, attribute: "button-type" },
    disabled: { type: Boolean, reflect: true }
  };
  static styles = i`
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
    this.variant = "primary";
    this.size = "md";
    this.buttonType = "button";
    this.disabled = false;
  }
  render() {
    return b2`
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
  _onClick(e4) {
    this.dispatchEvent(
      new CustomEvent("acc-click", { bubbles: true, composed: true, detail: { originalEvent: e4 } })
    );
  }
};
customElements.define("acc-button", AccButton);

// src/primitives/acc-field.js
var AccField = class extends i4 {
  static properties = {
    label: { type: String },
    name: { type: String },
    type: { type: String },
    multiline: { type: Boolean },
    rows: { type: Number },
    value: { type: String },
    placeholder: { type: String },
    hint: { type: String },
    maxlength: { type: Number }
  };
  static styles = i`
    :host {
      display: block;
      margin-bottom: 0.85rem;
    }
    label {
      display: block;
      font-size: 0.85rem;
      color: #9aa8c4;
      margin-bottom: 0.35rem;
    }
    input,
    textarea {
      width: 100%;
      box-sizing: border-box;
      font: inherit;
      color: #e8eefc;
      background: #151922;
      border: 1px solid #2c3447;
      border-radius: 8px;
      padding: 0.55rem 0.75rem;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    input:focus,
    textarea:focus {
      border-color: #5b8def;
      box-shadow: 0 0 0 3px rgba(91, 141, 239, 0.2);
    }
    textarea {
      resize: vertical;
      min-height: 4.5rem;
    }
    .hint {
      margin-top: 0.35rem;
      font-size: 0.8rem;
      color: #6f7d9a;
    }
  `;
  constructor() {
    super();
    this.type = "text";
    this.multiline = false;
    this.rows = 4;
    this.value = "";
  }
  render() {
    const control = this.multiline ? b2`<textarea
          id="input"
          name=${this.name || ""}
          rows=${this.rows}
          placeholder=${this.placeholder || ""}
          .value=${this.value}
          maxlength=${this.maxlength || nothing}
          @input=${this._onInput}
        ></textarea>` : b2`<input
          id="input"
          name=${this.name || ""}
          type=${this.type}
          placeholder=${this.placeholder || ""}
          .value=${this.value}
          maxlength=${this.maxlength || nothing}
          @input=${this._onInput}
        />`;
    return b2`
      ${this.label ? b2`<label for="input">${this.label}</label>` : null}
      ${control}
      ${this.hint ? b2`<p class="hint">${this.hint}</p>` : null}
    `;
  }
  _onInput(e4) {
    this.value = e4.target.value;
    this.dispatchEvent(
      new CustomEvent("acc-input", {
        bubbles: true,
        composed: true,
        detail: { name: this.name, value: this.value }
      })
    );
  }
};
var nothing = void 0;
customElements.define("acc-field", AccField);

// src/primitives/acc-badge.js
var AccBadge = class extends i4 {
  static styles = i`
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
    return b2`<span><slot></slot></span>`;
  }
};
customElements.define("acc-badge", AccBadge);

// src/acc-app-shell.js
var AccAppShell = class extends i4 {
  static styles = i`
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
    return b2`
      <div class="wrap">
        <slot></slot>
      </div>
    `;
  }
};
customElements.define("acc-app-shell", AccAppShell);

// src/acc-comment-list.js
var AccCommentList = class extends i4 {
  static properties = {
    communityName: { type: String, attribute: "community-name" },
    topicId: { type: String, attribute: "topic-id" },
    comments: { type: Array },
    depth: { type: Number },
    showActions: { type: Boolean, attribute: "show-actions" },
    canReply: { type: Boolean, attribute: "can-reply" }
  };
  static styles = i`
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
      return this.depth === 0 ? b2`<p class="empty">No comments yet.</p>` : null;
    }
    return b2`${this.comments.map((c4) => this._renderComment(c4))}`;
  }
  _renderComment(comment) {
    const permalink = `/c/${this.communityName}/${this.topicId}/comments/${comment.id}`;
    const style = `--indent: ${this.depth * 1.25}rem`;
    return b2`
      <article class="comment" style=${style}>
        <p class="content">${comment.content}</p>
        <div class="meta">
          <span>${comment.authorUserName} · ${comment.createdAt}</span>
          · <a href=${permalink}>permalink</a>
          <span class="actions">
            ${this.canReply ? b2`<button class="action" data-action="reply" data-id=${comment.id}>Reply</button>` : null}
            ${this.showActions && comment.canEdit ? b2`<button class="action" data-action="edit" data-id=${comment.id}>Edit</button>` : null}
            ${this.showActions && comment.canDelete ? b2`<button class="action danger" data-action="delete" data-id=${comment.id}>Delete</button>` : null}
          </span>
        </div>
        ${comment.replies?.length ? b2`<acc-comment-list
              community-name=${this.communityName}
              topic-id=${this.topicId}
              .comments=${comment.replies}
              depth=${this.depth + 1}
              ?show-actions=${this.showActions}
              ?can-reply=${this.canReply}
            ></acc-comment-list>` : null}
      </article>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this._onClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._onClick);
  }
  _onClick(e4) {
    const btn = e4.target.closest("button.action");
    if (!btn) return;
    const { action, id } = btn.dataset;
    this.dispatchEvent(
      new CustomEvent("acc-comment-action", {
        bubbles: true,
        composed: true,
        detail: { action, commentId: id }
      })
    );
  }
};
customElements.define("acc-comment-list", AccCommentList);

// src/acc-community-view.js
var AccCommunityView = class extends i4 {
  static properties = {
    state: { type: Object }
  };
  static styles = i`
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
    const s4 = this.state ?? {};
    if (!s4.loaded) {
      return b2``;
    }
    if (s4.notFound) {
      return b2`<h2>Community not found</h2>`;
    }
    const role = s4.membershipRole;
    return b2`
      <h1>/c/${s4.name}</h1>
      ${s4.description ? b2`<p class="lead">${s4.description}</p>` : null}

      ${s4.isSignedIn ? b2`
            <div class="membership">
              ${role == null ? b2`<acc-button variant="ghost" size="sm" @acc-click=${() => this._emit("follow")}>Follow</acc-button>` : b2`
                    <acc-badge>${role}</acc-badge>
                    ${role === "Follower" ? b2`<acc-button variant="ghost" size="sm" @acc-click=${() => this._emit("unfollow")}>Unfollow</acc-button>` : null}
                  `}
            </div>
            ${role === "Owner" ? b2`
                  <div class="moderator">
                    <acc-field
                      label="Add moderator (account email)"
                      name="moderatorEmail"
                      .value=${s4.moderatorEmail ?? ""}
                      @acc-input=${(e4) => this._emit("moderator-email", e4.detail.value)}
                    ></acc-field>
                    <div class="row">
                      <acc-button variant="ghost" size="sm" @acc-click=${() => this._emit("add-moderator")}>Add</acc-button>
                    </div>
                    ${s4.moderatorMessage ? b2`<p class="muted">${s4.moderatorMessage}</p>` : null}
                  </div>
                ` : null}
          ` : null}

      <h2>Topics</h2>
      ${!s4.topics?.length ? b2`<p class="muted"><em>No topics yet.</em></p>` : null}
      <ul>
        ${(s4.topics ?? []).map(
      (t3) => b2`
            <li>
              <a href="/c/${s4.name}/topics/${t3.id}">${t3.title}</a>
              <time>${t3.createdAt}</time>
            </li>
          `
    )}
      </ul>

      ${s4.isSignedIn ? b2`
            <hr class="divider" />
            <h2>New topic</h2>
            <acc-field
              name="title"
              placeholder="Title (max 50 characters)"
              maxlength="50"
              .value=${s4.newTopicTitle ?? ""}
              @acc-input=${(e4) => this._emit("topic-title", e4.detail.value)}
            ></acc-field>
            <acc-field
              multiline
              rows="5"
              name="content"
              placeholder="Content"
              .value=${s4.newTopicContent ?? ""}
              @acc-input=${(e4) => this._emit("topic-content", e4.detail.value)}
            ></acc-field>
            <acc-button size="sm" @acc-click=${() => this._emit("create-topic")}>Post topic</acc-button>
            ${s4.topicError ? b2`<p class="error">${s4.topicError}</p>` : null}
          ` : b2`<p class="signin"><a href="Account/Login">Sign in</a> to post or follow.</p>`}
    `;
  }
  _emit(action, value) {
    this.dispatchEvent(
      new CustomEvent("acc-action", {
        bubbles: true,
        composed: true,
        detail: { action, value }
      })
    );
  }
};
customElements.define("acc-community-view", AccCommunityView);

// src/acc-topic-view.js
var AccTopicView = class extends i4 {
  static properties = {
    state: { type: Object }
  };
  static styles = i`
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
    const s4 = this.state ?? {};
    if (s4.notFound) {
      return b2`<h2>Topic not found</h2>`;
    }
    if (s4.editing) {
      return b2`
        <h1>Edit topic</h1>
        <acc-field name="title" maxlength="50" .value=${s4.editTitle ?? ""} @acc-input=${(e4) => this._emit("edit-title", e4.detail.value)}></acc-field>
        <acc-field multiline rows="8" name="content" .value=${s4.editContent ?? ""} @acc-input=${(e4) => this._emit("edit-content", e4.detail.value)}></acc-field>
        <acc-button size="sm" @acc-click=${() => this._emit("save-topic")}>Save</acc-button>
        <acc-button variant="ghost" size="sm" @acc-click=${() => this._emit("cancel-edit")}>Cancel</acc-button>
      `;
    }
    const commentPlaceholder = s4.replyToId ? "Write a reply" : "Add a comment";
    return b2`
      <p class="crumb"><a href="/c/${s4.communityName}">/c/${s4.communityName}</a></p>
      <h1>${s4.title}</h1>
      <p class="body">${s4.content}</p>
      ${s4.canModifyTopic ? b2`
            <div class="toolbar">
              <acc-button variant="ghost" size="sm" @acc-click=${() => this._emit("start-edit")}>Edit</acc-button>
              <acc-button variant="danger" size="sm" @acc-click=${() => this._emit("delete-topic")}>Delete</acc-button>
            </div>
          ` : null}

      <h2>Comments</h2>
      ${s4.isSignedIn ? b2`
            ${s4.replyToId ? b2`<p class="reply-banner">
                  Replying to a comment.
                  <acc-button variant="link" size="sm" @acc-click=${() => this._emit("cancel-reply")}>Cancel reply</acc-button>
                </p>` : null}
            <acc-field
              multiline
              rows="3"
              name="comment"
              placeholder=${commentPlaceholder}
              .value=${s4.newComment ?? ""}
              @acc-input=${(e4) => this._emit("comment-input", e4.detail.value)}
            ></acc-field>
            <acc-button size="sm" @acc-click=${() => this._emit("post-comment")}>${s4.replyToId ? "Reply" : "Comment"}</acc-button>
          ` : null}

      <acc-comment-list
        community-name=${s4.communityName}
        topic-id=${s4.topicId}
        .comments=${s4.comments ?? []}
        ?can-reply=${s4.isSignedIn}
        show-actions
        @acc-comment-action=${this._onCommentAction}
      ></acc-comment-list>

      ${s4.editingCommentId ? b2`
            <hr class="divider" />
            <h2>Edit comment</h2>
            <acc-field
              multiline
              rows="3"
              .value=${s4.editCommentContent ?? ""}
              @acc-input=${(e4) => this._emit("edit-comment-input", e4.detail.value)}
            ></acc-field>
            <acc-button size="sm" @acc-click=${() => this._emit("save-comment")}>Save</acc-button>
            <acc-button variant="ghost" size="sm" @acc-click=${() => this._emit("cancel-comment-edit")}>Cancel</acc-button>
          ` : null}
    `;
  }
  _onCommentAction(e4) {
    const { action, commentId } = e4.detail;
    this._emit(action, commentId);
  }
  _emit(action, value) {
    this.dispatchEvent(
      new CustomEvent("acc-action", {
        bubbles: true,
        composed: true,
        detail: { action, value }
      })
    );
  }
};
customElements.define("acc-topic-view", AccTopicView);

// src/acc-comment-view.js
var AccCommentView = class extends i4 {
  static properties = {
    state: { type: Object }
  };
  static styles = i`
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
    const s4 = this.state ?? {};
    if (s4.notFound) {
      return b2`<h2>Comment not found</h2>`;
    }
    return b2`
      <p class="crumb">
        <a href="/c/${s4.communityName}">/c/${s4.communityName}</a>
        · <a href="/c/${s4.communityName}/topics/${s4.topicId}">${s4.topicTitle}</a>
      </p>

      <article>
        <p class="content">${s4.content}</p>
        <div class="meta">${s4.authorUserName} · ${s4.createdAt}</div>
        ${s4.canEdit || s4.canDelete ? b2`
              <div class="actions">
                ${s4.canEdit ? b2`<acc-button variant="link" size="sm" @acc-click=${() => this._emit("start-edit")}>Edit</acc-button>` : null}
                ${s4.canDelete ? b2`<acc-button variant="link" size="sm" @acc-click=${() => this._emit("delete-comment")}>Delete</acc-button>` : null}
              </div>
            ` : null}
      </article>

      ${s4.editing ? b2`
            <acc-field multiline rows="4" .value=${s4.editContent ?? ""} @acc-input=${(e4) => this._emit("edit-input", e4.detail.value)}></acc-field>
            <acc-button size="sm" @acc-click=${() => this._emit("save-comment")}>Save</acc-button>
            <acc-button variant="ghost" size="sm" @acc-click=${() => this._emit("cancel-edit")}>Cancel</acc-button>
          ` : null}

      <h2>Replies</h2>
      ${s4.isSignedIn ? b2`
            <acc-field multiline rows="3" placeholder="Reply" .value=${s4.replyContent ?? ""} @acc-input=${(e4) => this._emit("reply-input", e4.detail.value)}></acc-field>
            <acc-button size="sm" @acc-click=${() => this._emit("post-reply")}>Reply</acc-button>
          ` : null}

      <acc-comment-list
        community-name=${s4.communityName}
        topic-id=${s4.topicId}
        .comments=${s4.replies ?? []}
        ?can-reply=${false}
        ?show-actions=${false}
      ></acc-comment-list>
    `;
  }
  _emit(action, value) {
    this.dispatchEvent(
      new CustomEvent("acc-action", {
        bubbles: true,
        composed: true,
        detail: { action, value }
      })
    );
  }
};
customElements.define("acc-comment-view", AccCommentView);

// src/acc-create-community-view.js
var AccCreateCommunityView = class extends i4 {
  static properties = {
    state: { type: Object }
  };
  static styles = i`
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
    const s4 = this.state ?? {};
    return b2`
      <h1>Create a community</h1>
      <acc-field
        label="Name"
        name="name"
        hint="Lowercase URL segment, e.g. puppies → /c/puppies"
        .value=${s4.name ?? ""}
        @acc-input=${(e4) => this._emit("name", e4.detail.value)}
      ></acc-field>
      <acc-field
        label="Description"
        multiline
        rows="4"
        name="description"
        .value=${s4.description ?? ""}
        @acc-input=${(e4) => this._emit("description", e4.detail.value)}
      ></acc-field>
      <button type="button" class="create-btn" @click=${() => this._emit("create")}>Create</button>
      ${s4.error ? b2`<p class="error">${s4.error}</p>` : null}
    `;
  }
  _emit(action, value) {
    this.dispatchEvent(
      new CustomEvent("acc-action", {
        bubbles: true,
        composed: true,
        detail: { action, value }
      })
    );
  }
};
customElements.define("acc-create-community-view", AccCreateCommunityView);

// src/acc-home-promo.js
var AccHomePromo = class extends i4 {
  static styles = i`
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
    return b2`
      <h1>Hello, world!</h1>
      <p>Welcome to your new app.</p>
      <a href="/c/create">Create a community</a>
    `;
  }
};
customElements.define("acc-home-promo", AccHomePromo);

// src/bridge.js
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
  view.addEventListener("acc-action", (e4) => {
    const { action, value } = e4.detail ?? {};
    dotNetRef.invokeMethodAsync("OnLitAction", action, value ?? null).catch(() => {
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
var CREATE_VIEW = "acc-create-community-view";
var COMMUNITY_VIEW = "acc-community-view";
var TOPIC_VIEW = "acc-topic-view";
var COMMENT_VIEW = "acc-comment-view";
async function attachCommunityView(element, dotNetRef, state) {
  await attach(element, dotNetRef, state, COMMUNITY_VIEW);
}
async function updateCommunityView(element, state) {
  await update(element, state, COMMUNITY_VIEW);
}
async function syncCommunityView(element, dotNetRef, state) {
  await sync(element, dotNetRef, state, COMMUNITY_VIEW);
}
async function attachTopicView(element, dotNetRef, state) {
  await attach(element, dotNetRef, state, TOPIC_VIEW);
}
async function updateTopicView(element, state) {
  await update(element, state, TOPIC_VIEW);
}
async function syncTopicView(element, dotNetRef, state) {
  await sync(element, dotNetRef, state, TOPIC_VIEW);
}
async function attachCommentView(element, dotNetRef, state) {
  await attach(element, dotNetRef, state, COMMENT_VIEW);
}
async function updateCommentView(element, state) {
  await update(element, state, COMMENT_VIEW);
}
async function syncCommentView(element, dotNetRef, state) {
  await sync(element, dotNetRef, state, COMMENT_VIEW);
}
async function attachCreateCommunityView(element, dotNetRef, state) {
  await attach(element, dotNetRef, state, CREATE_VIEW);
}
async function updateCreateCommunityView(element, state) {
  await update(element, state, CREATE_VIEW);
}
async function syncCreateCommunityView(element, dotNetRef, state) {
  await sync(element, dotNetRef, state, CREATE_VIEW);
}
export {
  attachCommentView,
  attachCommunityView,
  attachCreateCommunityView,
  attachTopicView,
  syncCommentView,
  syncCommunityView,
  syncCreateCommunityView,
  syncTopicView,
  updateCommentView,
  updateCommunityView,
  updateCreateCommunityView,
  updateTopicView
};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
