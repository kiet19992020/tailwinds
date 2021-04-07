const internals = {
  /**
   * Variable
   */
  formGroup: '.form-group-v2',
  formControl: 'input.form-control',
  activeFocus: 'active-focus',
  $hasFormAni: $('.form-ani'),
  /**
   * Function
   */
  checkValue() {
    this.$hasFormAni.find(this.formControl).each((index, el) => {
      const eleParent = $(el).parents(this.formGroup)
      if ($(el)[0].value.length) {
        eleParent.addClass(this.activeFocus)
      } else {
        eleParent.removeClass(this.activeFocus)
      }
    })
  },
  formFocus() {
    this.$hasFormAni.find(this.formGroup).on('focus', this.formControl, (e) => {
      const ele = e.currentTarget
      this.checkValue()
      $(ele).parents(this.formGroup).addClass(this.activeFocus)
    })
    this.$hasFormAni.find(this.formGroup).on('focusout', this.formControl, () => {
      this.checkValue()
    })
  },
  formChange() {
    this.$hasFormAni.find(this.formGroup).on('change', this.formControl, () => {
      this.checkValue()
    })
  },
  documentClick() {
    $(document).on('click focus', (e) => {
      const ele = e.target
      if (!$(ele).is('.form-group-v2 .form-control')) {
        this.checkValue()
      }
    })
  }
}

const FormAnimation = (() => {
  if (internals.$hasFormAni.length) {
    internals.formFocus()
    internals.formChange()
    internals.checkValue()
    internals.documentClick()
  }
})()

export default FormAnimation