require('../../../public/src/scss/main.scss')

import 'jquery'

$(document).ready(function() {
  const $body = $('body')
  setTimeout(function() {
    $body.addClass('loaded')
    const headerHeight = $('.page-header').outerHeight()
    $('.transition-overlay').css({
      transform: 'translateY(' + headerHeight + 'px)'
    }).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function() {
      $(this).addClass('fade')
      setTimeout(() => {
        $(this).css({
          transform: 'translate(100%, 0)'
        })
        $(this).attr('data-color', '')
      }, 300)
      setTimeout(() => {
        $(this).removeClass('fade')
      }, 800)
    })
  }, 500)

  $('a').on('click', function(e) {
    e.preventDefault()
    const color = $(this).data('color')
    const direction = $(this).data('direction')
    const href = $(this).attr('href')
    $body.addClass(('transition-out ' + direction || ''))
    $('.transition-overlay').attr('data-color', color || '')
    setTimeout(function() {
      window.location = href
    }, 500)
  })

  const $headerElements = $('.page-header [data-speed]')
  $(window).on('scroll', function() {
    $headerElements.each((index, item) => {
      const $item = $(item)
      const yPos = ($(window).scrollTop() * $item.data('speed'))
      $item.css({
        '-webkit-transform': 'translateY(' + yPos + 'px)',
        'transform': 'translateY(' + yPos + 'px)'
      })
    })
    const scrolledY = $(window).scrollTop()
    $('.page-header .image').css('top', (scrolledY / 2) + 'px')
    if (scrolledY >= 200) {
      $body.addClass('scrolled')
    } else {
      $body.removeClass('scrolled')
    }
  })
})
