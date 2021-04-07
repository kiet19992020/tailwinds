const internals = {
  /**
   * Variable
   */
  $html: $('html'),
  /**
   * Function
   */
  checkDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.$html.addClass('touch')
    } else {
      this.$html.addClass('no-touch')
    }
  }
}

const CheckDevice = (() => {
  internals.checkDevice()
})()

export default CheckDevice