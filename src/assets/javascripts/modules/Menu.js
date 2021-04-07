const internals = {
  /**
   * Variable
   */
  $this: $('#main-menu'),
  elementItem: '.hamburger-menu, html, #main-menu, #header',
  $header: $('#header, #main-menu-mobile'),
  // liLeve2: this.$this.find('.main-menu-ul .main-menu-dropdown li>a'),
  isopenmenu: 'is-open-menu',
  isopenmenuchild: 'open-menu-child',
  isopenchild: 'is-open-child',
  /**
   * Function
   */
  /* micro function */
  microOpenCloseLevel1(currentElement, openClass, isLiLv1 = false) {
    const ele = currentElement.currentTarget
    const eleParent = $(ele).parent()
    if ($(window).width() < 1025) {
      if (eleParent.find('ul').length && !eleParent.hasClass(openClass)) {
        this.$this.find('.main-menu-ul >li').removeClass(openClass)
        eleParent.addClass(openClass)
        if (isLiLv1) {
          return false
        }
      } else {
        eleParent.removeClass(openClass)
      }
    }
    return true
  },
  /* end micro */
  openMainMenu() {
    this.$header.on('click', '.hamburger-menu', (e) => {
      const ele = e.currentTarget

      if ($(ele).hasClass(this.isopenmenu)) {
        $(this.elementItem).removeClass(this.isopenmenu)
      } else {
        $(this.elementItem).addClass(this.isopenmenu)
      }
    })
  },
  clickArowOpenDropdownMenuLeve1() {
    this.$this.find('.main-menu-ul >li').on('click', '.arrows-lv1', (e) => {
      this.microOpenCloseLevel1(e, this.isopenchild)
    })
  },
  clickLiOpenDropdownMenuLeve1() {
    this.$this.find('.main-menu-ul >li>a').on('click', (e) => {
      return this.microOpenCloseLevel1(e, this.isopenchild, true)
    })
  },
  clickArowOpenDropdownMenuLeve2() {
    this.$this.find('.main-menu-ul').on('click', '.arrows-lv2', (e) => {
      const ele = e.currentTarget
      const eleParent = $(ele).parent()
      if ($(window).width() < 1025) {
        if (eleParent.find('.menu-child').length && !eleParent.hasClass(this.isopenmenuchild)) {
          eleParent.addClass(this.isopenmenuchild)
        } else {
          // eleParent.addClass(this.isopenmenuchild)
          eleParent.removeClass(this.isopenmenuchild)
        }
      }
    })
  },
  clickOutsite() {
    $(document).on('click', (event) => {
      if (!$(event.target).closest('#header.is-open-menu').length) {
        $(this.elementItem).removeClass(this.isopenmenu)
      }
    })
  },
  clickLiOpenDropdownMenuLeve2() {
    this.$this.find('.main-menu-ul .main-menu-dropdown li>a').on('click', (e) => {
      const ele = e.currentTarget
      const eleParent = $(ele).parent()
      if ($(window).width() < 1025 && eleParent.find('ul').length && !eleParent.hasClass(this.isopenmenuchild)) {
        this.$this.find('.main-menu-ul >li>a').removeClass(this.isopenmenuchild)
        eleParent.addClass(this.isopenmenuchild)
        return false
      }
      return true
    })
  }
}

const Menu = (() => {
  if (internals.$this.length) {
    internals.openMainMenu()
    internals.clickArowOpenDropdownMenuLeve1()
    internals.clickLiOpenDropdownMenuLeve1()
    internals.clickArowOpenDropdownMenuLeve2()
    internals.clickOutsite()
    internals.clickLiOpenDropdownMenuLeve2()
  }
})()

export default Menu
