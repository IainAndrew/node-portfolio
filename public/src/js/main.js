import "../../../public/src/scss/main.scss";

import "jquery";

$(document).ready(function() {
  const $body = $("body");
  $body.addClass("loading");
  setTimeout(function() {
    $body.removeClass("loading").addClass("loaded");
  }, 500);

  $("a[data-direction]").on("click", function(e) {
    e.preventDefault();
    const color = $(this).data("color");
    const direction = $(this).data("direction") || "forward";
    const href = $(this).attr("href");
    $body.addClass("transition-out " + direction || "");
    $(".transition-overlay").attr("data-color", color || "");
    setTimeout(function() {
      window.location = href;
    }, 500);
  });

  const $headerElements = $(".page-header [data-speed]");
  $(window).on("scroll", function() {
    $headerElements.each((index, item) => {
      const $item = $(item);
      const yPos = $(window).scrollTop() * $item.data("speed");
      $item.css({
        "-webkit-transform": "translateY(" + yPos + "px)",
        transform: "translateY(" + yPos + "px)"
      });
    });
    setScrolledClass()
  });

  const setScrolledClass = () => {
    const scrolledY = $(window).scrollTop();
    $(".page-header .image").css("top", scrolledY / 2 + "px");
    if (scrolledY >= 150) {
      $body.addClass("scrolled");
    } else {
      $body.removeClass("scrolled");
    }
  }
  setScrolledClass()

  const checkIfInView = () => {
    $(".scroll-to-me").each(function(index, item) {
      let $item = $(item);
      if (
        $(window).scrollTop() >=
        $item.offset().top - window.innerHeight + 50
      ) {
        $item.addClass("in-view");
      } else {
        $item.removeClass("in-view");
      }
    });
  };
  checkIfInView();

  // var isInViewport = function(el) {
  //   var elementTop = $(`#${el}`).offset().top;
  //   var elementBottom = elementTop + $(`#${el}`).outerHeight();
  //   var viewportTop = $(window).scrollTop();
  //   var viewportBottom = viewportTop + $(window).height();
  //   return elementBottom > viewportTop && elementTop < viewportBottom;
  // };

  $(window).on("scroll", function() {
    checkIfInView();
    // setActiveNavItems();
  });

  // const setActiveNavItems = () => {
  //   const scrollPos = $(window).scrollTop()
  //   $('.main-nav ul a.anchor').each(function() {
  //     const currentLink = $(this)
  //     const element = $(currentLink.attr('href'))
  //     if (element.length) {
  //       if (element.position().top <= scrollPos && element.position().top + element.height() > scrollPos) {
  //         $('.main-nav ul a.anchor').removeClass('active');
  //         currentLink.addClass('active');
  //       } else {
  //         currentLink.removeClass('active');
  //       }
  //     }
  //   });
  // } 

  // $('a[href^="#"]').on('click', function(e) {
  //     e.preventDefault();
  //     $('.main-nav ul a.anchor').each(function() {
  //       $(this).removeClass('active');
  //     })
  //     $(this).addClass('active');
  //     const target = this.hash
  //     const $target = $(this.hash);
  //     $('html, body').stop().animate({
  //       'scrollTop': $target.offset().top + 2
  //     }, 500, 'swing', function() {
  //       window.location.hash = target;
  //       $(window).on('scroll', setActiveNavItems);
  //     });
  // });
});
