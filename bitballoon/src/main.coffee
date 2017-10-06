$ = require 'jquery'
ScrollReveal = require 'scrollreveal'
require 'velocity-animate'
# import exec from 'script-loader!./jquery.scrollme.min.js';

$ ->
  $(window).on 'scroll', () ->
    buffer = $('.c-jumbotron').height() - $('.c-header').height()
    if $(window).scrollTop() > buffer
      # body...
      $(".c-header").addClass 'opaque'
    else
      $(".c-header").removeClass 'opaque'


  window.sr = ScrollReveal
    viewOffset:
      top: $(".c-header").height() + 20,
      right: 0,
      bottom: 0,
      left: 0
  sr.reveal "#main-section *"
  sr.reveal "footer *"
  $(".c-header_nav-button").on "click", (event) ->
    event.preventDefault()
    eventTarget = event.target
    $(eventTarget).parent().parent().toggleClass "active"

  $(".c-header_logo").on "click", (event) ->
    if $("body").scrollTop() > ($(".c-header").height() * 2)
      event.preventDefault()
      $("body").velocity 'scroll', {
        duration: 700,
        offset: -40,
        easing: 'easeOutCubic'
      }
      # body...
    else
      console.log 'no'

  $('a[href*="#"]').on "click", (e) ->
      e.preventDefault();
      e.stopPropagation();
      target = $(this).attr('href');

      $(target).velocity 'scroll', {
        duration: 700,
        offset: -40,
        easing: 'easeOutCubic'
      }
