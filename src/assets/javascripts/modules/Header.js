const internals = {
  /**
   * Variable
   */
  $header: $('#header'),
  _numberScrol: 0,
  scrollTop: 0,
  class: 'pin-header',
  /**
   * Function
   */
  scrollPinHeader() {
    this.settingPin()
    $(window).on('scroll resize orientationchange', () => {
      this.settingPin()
    })
  },
  settingPin() {
    this.scrollTop = $(window).scrollTop()
    if (this.scrollTop > this._numberScrol) {
      this.$header.addClass(this.class)
    } else {
      this.$header.removeClass(this.class)
    }
  }
}

const Header = (() => {
  if (internals.$header.length) {
    internals.scrollPinHeader()
  }
})()

export default Header
