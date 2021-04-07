const internals = {
  /**
   * Variable
   */
  html: $('html'),
  /**
   * Function
   */
  convertHeight() {
    let tmp = 0
    return this.each((index, el) => {
      const element = el
      $(element).height('auto')
      const $itemss = $(element)
      // console.log(element.offset().top)
      const innerHeights = $itemss.map((i, ele) => {
        return $(ele).height()
      })
      const maxHeight = Math.max(...innerHeights)
      if (maxHeight > tmp) {
        tmp = maxHeight
      }
      element.height(tmp)
    })
  }
}

const ConvertHeight = (() => {
  $.fn.convertHeight = internals.convertHeight
})()

export default ConvertHeight