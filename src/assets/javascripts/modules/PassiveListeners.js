const internals = {
  /**
   * Function
   */
  init() {
    if (typeof EventTarget !== 'undefined') {
      const func = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function (type, fn, capture) {
        this.func = func;
        let tmpCapture = capture
        if (typeof capture !== 'boolean') {
          tmpCapture = capture || {};
          tmpCapture.passive = false;
        }
        this.func(type, fn, tmpCapture);
      };
    }
  }
}

const PassiveListeners = (() => {
  internals.init()
})()

export default PassiveListeners
