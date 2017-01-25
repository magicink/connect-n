import GameUI from './ui'

function init () {
  let app = document.querySelector('#app')
  return new GameUI(app)
}
document.addEventListener('DOMContentLoaded', init)
