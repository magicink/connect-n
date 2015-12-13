import $ from 'jquery'
import expect from 'expect'
import GameUI from '../../src/js/ui'

describe('UI', () => {
  describe('Ecosystem', () => {
    it('should have the proper elements', () => {
      expect($('body').length).toBe(1)
      expect($('#app').length).toBe(1)
      expect($('#menu').length).toBe(1)
    })
  })
  describe('Construction', () => {
    let ui = new GameUI($('#app'))
    it('should render the default UI elements', () => {
      expect($('.column').length).toBe(7)
      expect($('.player').length).toBe(2)
    })
    it('should properly reconfigure board', () => {
      ui.configure(10, 20, 30, 5)
      expect($('.player').length).toBe(10)
      expect($('.column').length).toBe(20)
    })
  })
})
