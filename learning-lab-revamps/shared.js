'use strict';
const games = Object.create(null);
function el(tag, attributes, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes || {})) {
    if (value == null || value === false) continue;
    if (key === 'class') node.className = value;
    else if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2), value);
    else if (key in node && !key.startsWith('aria') && key !== 'list') node[key] = value;
    else node.setAttribute(key, value === true ? '' : value);
  }
  node.append(...children.flat(Infinity).filter(value => value != null && value !== false));
  return node;
}
function button(label, action, options = {}) {
  const {primary, pressed, ...attributes} = options;
  return el('button', {
    type: 'button', onclick: action, class: primary ? 'primary' : '',
    'aria-pressed': pressed == null ? null : String(pressed), ...attributes
  }, label);
}
function section(title, ...children) {
  return el('section', {class: 'panel'}, title ? el('h2', {}, title) : null, children);
}
function toolbar(...children) {
  return el('div', {class: 'toolbar'}, children);
}
function art(name, alt = '', className = '') {
  return el('img', {class: 'art ' + className, src: 'art/' + name + '.webp', alt, width: 760, height: 500});
}
function feedback(initial = '') {
  return el('p', {class: 'feedback', role: 'status', 'aria-live': 'polite'}, initial);
}
function tell(node, message, result = '') {
  node.textContent = message;
  node.dataset.result = result;
}
function title(entry, instruction = entry.description) {
  return el('div', {class: 'game-title'}, el('span', {class: 'eyebrow'}, entry.group), el('h1', {}, entry.title), el('p', {}, instruction));
}
function split(visual, controls) {
  return el('div', {class: 'split'}, visual, controls);
}
function store(key, data) {
  try { localStorage.setItem('learning-lab-review:' + key, JSON.stringify(data)); } catch {}
}
function read(key, fallback) {
  try { return JSON.parse(localStorage.getItem('learning-lab-review:' + key)) ?? fallback; } catch { return fallback; }
}
function shuffle(values) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}
function download(filename, content, type = 'text/plain;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([content], {type}));
  const link = el('a', {href: url, download: filename});
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function field(label, attributes = {}, multiline = false) {
  const input = el(multiline ? 'textarea' : 'input', attributes);
  return [el('label', {class: 'field'}, el('span', {}, label), input), input];
}
function restoreFocus(parent, key) {
  parent.querySelector('[data-focus="' + CSS.escape(key) + '"]')?.focus({preventScroll: true});
}
