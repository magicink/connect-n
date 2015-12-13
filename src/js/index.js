import $ from 'jquery'
import GameUI from './ui'
import '../scss/app.scss'

$(document).ready(() => {
  return new GameUI($('#app'))
})
