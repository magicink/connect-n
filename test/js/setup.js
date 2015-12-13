import jsdom from 'node-jsdom'

let doc = jsdom.jsdom('<!doctype html><html><body><div id="app"></div></body></html>')
const win = doc.defaultView

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
