import 'jquery-match-height'

const internals = {
  /**
   * Function
   */
  callFixHeight() {
    const $this = $('.fix-height')
    if ($this.length) {
      const $items = $this.find('.height-item').css('height', '')
      const $items2 = $this.find('.item-3column h3:first-child').css('height', '')
      $items.matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false
      })
      $items2.matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false
      })
    }
  }
}

const FixHeight = (() => {
  internals.callFixHeight()
})()

export default FixHeight