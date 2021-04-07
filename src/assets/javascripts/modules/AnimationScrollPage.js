
const internals = {
  /**
   * Variable
   */
  $elems: $('.animation'),
  winH: window.innerHeight,
  winW: window.innerWidth,
  offset: window.innerHeight,
  wintop: null,
  topcoords: null,
  /**
   * Function
   */
  animationEle() {
    this.$elems = $('.animation')
    this.winH = window.innerHeight
    this.winW = window.innerWidth
    this.offset = this.winH
    if (this.winW > 1024 && !$('body').hasClass('no-animation')) {
      this.wintop = $(window).scrollTop()
      this.$elems.each((index, ele) => {
        const $elm = $(ele)
        if ($elm.hasClass('set-animation')) {
          return true
        }
        this.topcoords = $elm.offset().top
        if (this.wintop > (this.topcoords - this.offset)) {
          $elm.addClass('set-animation')
        }
        return true
      })
    }
  }
}

const AnimationScrollPage = (() => {
  internals.animationEle()
})()

export default AnimationScrollPage
