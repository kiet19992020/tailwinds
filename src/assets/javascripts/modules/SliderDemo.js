const internals = {
  /**
   * Variable
   */
  $this: $('.mod-slider'),
  /**
   * Function
   */
  addSlick(){
    this.$this.find('.slider').slick({
      rows: 0,
      adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev arrows"><span class="icomoon h1 icon-chevron-left"></span></button>',
      nextArrow: '<button type="button" class="slick-next arrows"><span class="icomoon h1 icon-chevron-right"></span></button>'
    })
  }
}

const SliderDemo = (() => {
  if (internals.$this.length) {
    internals.addSlick()
  }
})()
export default SliderDemo