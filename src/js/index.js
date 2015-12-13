import $ from 'jquery'
import GameUI from './ui'

$(document).ready(() => {
  return new GameUI($('#app'))
})
