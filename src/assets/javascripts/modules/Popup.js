/**
* popup-js 2.0 by @thien.ho
* License: MIT
*/

import { call } from './CallBackLazy'

const internals = {
  /**
   * Variable
   */
  $html: $('html'),
  $modPop: '.mod-popup',
  $ClosePopup: '.popup-is-close',
  $openPopup: '.popup-is-open',
  closeContent: '<span class="icomoon icon-close"></span><span class="sr-only">Close Popup</span>',
  closeLink: `<a href="javascript:;" class="popup-is-close text-decoration-none">
  <span class="icomoon icon-close"></span>
  <span class="sr-only">Close Popup</span>
  </a>`,
  contentInner: `<div class="popup-inner">
  <h3>The requested content cannot be loaded. <br> Please try again later.</h3>
  </div>`,
  widthContent: 'container',
  widthContentTmp: 'container',
  popupstatic: 'popup-static',
  popcontent: '.popup-content',
  popShow: 'popup-show',
  popinner: '.popup-inner',
  noelement: 'no-element',
  iframe: '',
  /**
   * Function
   */
  renderPopup() {
    const html = `<div class="mod-popup ${this.popShow}">
    <div class="popup-container ps-as">
    <div class="popup-content ${this.widthContent}">
    <div class="mask-pop-overlay"></div>
    </div>
    </div>
    </div>`
    $(document.body).append(html)
  },
  loadLazyOnLoad() {
    const $hasLazy = $('.popup-inner .lazy')
    if ($hasLazy.length) {
      $hasLazy.each((index, el) => {
        const element = el
        const elementTmp = $(element)[0].tagName
        call(elementTmp, element)
      })
    }
  },
  convertToEmbed(url) {
    const urlYoutube = 'https://www.youtube.com/embed/'
    if (url.toLowerCase().indexOf('youtube.com') !== -1 && url.toLowerCase().indexOf('youtube.com/embed') === -1) {
      const tempV = url.split('?v=')[1]
      const v = tempV.split('&')[0]
      return urlYoutube + v + '?autoplay=1&rel=0&showinfo=0'
    }
    if (url.toLowerCase().indexOf('vimeo.com') !== -1 && url.toLowerCase().indexOf('player.vimeo.com/video') === -1) {
      const parts = url.split('/')
      const v2 = parts.pop()
      return `https://player.vimeo.com/video/${v2}?autoplay=1&muted=0`
    }
    if (url.toLowerCase().indexOf('youtu.be') !== -1) {
      const parts2 = url.split('/')
      const v3 = parts2.pop()
      return urlYoutube + v3 + '?autoplay=1&rel=0&showinfo=0'
    }

    return url
  },
  addMutedVideo(url) {
    if (url.toLowerCase().indexOf('youtube.com') === -1) {
      if (url.toLowerCase().indexOf('?') === -1) {
        return url + '?muted=0'
      } else {
        return url + '&muted=0'
      }
    }
    return url
  },
  popupVideo(ele) {
    let srcVideo = $(ele).attr('href')
    srcVideo = this.convertToEmbed(srcVideo)
    srcVideo = this.addMutedVideo(srcVideo)
    this.iframe = `<div class="popup-inner popup-video ">
              <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="${srcVideo}" frameborder="0"></iframe>
              </div>
            </div>`
    this.renderPopup()
    const $popupContent = $(this.$modPop).find(this.popcontent)
    $popupContent.append(this.iframe)
    $popupContent.find(this.popinner).append(this.closeLink)
  },
  popupContent(tmpContent) {
    let cloneTmp = ''
    cloneTmp = $(tmpContent).find(this.popinner).clone()
    this.renderPopup()
    const $popupContent = $(this.$modPop).find(this.popcontent)
    if ($(tmpContent).length) {
      $popupContent.append(cloneTmp)
    } else {
      $popupContent.addClass(this.noelement).append(this.contentInner)
    }
    $popupContent.find(this.popinner).append(this.closeLink)
  },
  openPopupGallery() {
    this.$html.on('click', this.$openPopup, (e) => {
      // cal lazy img into popup
      const ele = e.currentTarget
      const htmlClass = $(ele).data('htmlclass')
      const tmpContent = $(ele).data('id')
      const tmpPopup = $(ele).data('popup')
      const tmpWidthContent = $(tmpContent).data('content')
      $(ele).addClass('is-click')
      this.loadLazyOnLoad()
      if ($(tmpContent).hasClass('mod-popup-static')) {
        $(tmpContent).addClass(this.popupstatic)
      } else {
        if (typeof tmpWidthContent !== 'undefined') {
          this.widthContent = tmpWidthContent
        }
        if (tmpPopup === 'video') {
          this.popupVideo(ele)
        } else {
          this.popupContent(tmpContent)
        }
      }

      if ($(tmpContent).hasClass(this.popupstatic)) {
        $(tmpContent).addClass(this.popShow)
      } else {
        $(this.$modPop).addClass(this.popShow)
      }
      this.$html.addClass(htmlClass).addClass('popup-open')

      setTimeout(() => {
        this.$html.addClass('popup-animation')
      }, 100)
      // callBack()
      return false
    })
  },
  closePopup() {
    const classHtml = this.$html.find('.is-click').data('htmlclass')
    this.$html.removeClass('popup-open popup-animation ' + classHtml)
    if (this.$html.find('.' + this.popShow).hasClass(this.popupstatic)) {
      this.$html.find('.' + this.popupstatic).removeClass(this.popShow)
    } else {
      $(this.$modPop).remove()
    }
    this.$html.find('.is-click').removeClass('is-click')
    this.widthContent = this.widthContentTmp
  },
  clickClosePopup() {
    this.$html.on('click', this.$ClosePopup, () => {
      this.closePopup()
    })
  },
  clickOutSite() {
    this.$html.on('click', '.mask-pop-overlay', () => {
      this.closePopup()
    })
    $(window).keydown((e) => {
      if ((e.keyCode === 27 && $('.mod-popup').length) || (e.keyCode === 13 && $(e.target).hasClass('popup-is-close'))) {
        this.closePopup()
      }
    })
  }
}

const Popup = (() => {
  if ($(internals.$openPopup).length) {
    internals.openPopupGallery()
    internals.clickOutSite()
    internals.clickClosePopup()
  }
})()

export default Popup
