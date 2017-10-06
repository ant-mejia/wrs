var $, ScrollReveal;

$ = require('jquery');

ScrollReveal = require('scrollreveal');

require('velocity-animate');

$(function() {
  $(window).on('scroll', function() {
    var buffer;
    buffer = $('.c-jumbotron').height() - $('.c-header').height();
    if ($(window).scrollTop() > buffer) {
      return $(".c-header").addClass('opaque');
    } else {
      return $(".c-header").removeClass('opaque');
    }
  });
  window.sr = ScrollReveal({
    viewOffset: {
      top: $(".c-header").height() + 20,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
  sr.reveal("#main-section *");
  sr.reveal("footer *");
  $(".c-header_nav-button").on("click", function(event) {
    var eventTarget;
    event.preventDefault();
    eventTarget = event.target;
    return $(eventTarget).parent().parent().toggleClass("active");
  });
  $(".c-header_logo").on("click", function(event) {
    if ($("body").scrollTop() > ($(".c-header").height() * 2)) {
      event.preventDefault();
      return $("body").velocity('scroll', {
        duration: 700,
        offset: -40,
        easing: 'easeOutCubic'
      });
    } else {
      return console.log('no');
    }
  });
  return $('a[href*="#"]').on("click", function(e) {
    var target;
    e.preventDefault();
    e.stopPropagation();
    target = $(this).attr('href');
    return $(target).velocity('scroll', {
      duration: 700,
      offset: -40,
      easing: 'easeOutCubic'
    });
  });
});
