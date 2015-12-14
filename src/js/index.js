import GameUI from './ui'
import '../scss/app.scss'

function init () {
  let app = document.querySelector('#app')
  return new GameUI(app)
}

document.body.onload = init
