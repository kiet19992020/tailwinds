const internals = {
  /**
   * Variable
   */
  winW: window.innerWidth,
  $head: $('head'),
  /**
   * Function
   */
  init() {
    if ($('.select-c8').length) {
      window.modules.push(window.pathJS + 'core/SelectC8.js')
    }

    if ($('.has-popup').length) {
      this.$head.append(`<link rel="stylesheet" media="screen" href="${window.pathCSS}popup.css">`)
      window.modules.push(window.pathJS + 'core/Popup.js')
    }

    if ($('.form-ani').length) {
      window.modules.push(window.pathJS + 'core/FormAnimation.js')
    }
    if ($('.has-slider').length) {
      this.$head.append(`<link rel="stylesheet" media="screen" href="${window.pathCSS}app-slider.css">`)
      window.modules.push(window.pathJS + 'app-slider.js')
    }

    if ($('.fix-height').length && this.winW > 767) {
      window.modules.push(window.pathJS + 'core/FixHeight.js')
    }

    window.$script(window.modules)
  }
}

const CallModule = (() => {
  internals.init()
})()

export default CallModule