import jsdom from 'node-jsdom'

let doc = jsdom.jsdom('<!doctype html><html><body><div id="app"><section id="menu"></section></div></body></html>')
let win = doc.defaultView

global.document = doc
global.window = win

propagateToGlobal(win)

function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue
    if (key in global) continue

    global[key] = window[key]
  }
}
