import 'animation.gsap'
import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min'

const AnimationPageGsap = (() => {
  window.controller = new ScrollMagic.Controller({
    refreshInterval: 0
  })
})()
export default AnimationPageGsap
