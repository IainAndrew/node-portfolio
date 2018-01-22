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
    $(".transition-overlay").on("oanimationend animationend webkitAnimationEnd", function(event) {
      window.location = href;
    });
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
      if ($(window).scrollTop() >= ($item.offset().top - window.innerHeight + 45)) {
        $item.addClass("in-view");
      } else {
        $item.removeClass("in-view");
      }
    });
  };
  setTimeout(function() {
    checkIfInView();
  }, 1000);

  $(window).on("scroll", function() {
    checkIfInView();
  });
});
