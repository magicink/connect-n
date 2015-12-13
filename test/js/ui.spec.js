import $ from 'jquery'
import expect from 'expect'
import GameUI from '../../src/js/ui'

describe('UI', () => {
  describe('UI Environment', () => {
    it('should find a the root element', () => {
      expect($('#app').length).toBe(1)
    })
  })
  describe('Construction', () => {
    const ui = new GameUI($('#app'))
    it('should pass the correct context', () => {
      expect(ui.ctx).toEqual($('#app'))
    })
    it('should build interface', () => {
      expect($('#game-board').length).toEqual(1)
    })
  })
})
