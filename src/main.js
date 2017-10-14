var $, Highcharts, ScrollReveal;

$ = require('jquery');

ScrollReveal = require('scrollreveal');

require('velocity-animate');

Highcharts = require('highcharts');

$(function() {
  if ($(window).scrollTop() > $('.c-jumbotron').height()) {
    $(".c-header").addClass('opaque');
  }
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
      top: $(".c-header").height(),
      right: 0,
      bottom: 0,
      left: 0
    }
  });
  sr.reveal("#main-section *:not(.o-container_section):not(.o-grid):not(.c-blimp):not(.c-blimp_slideshow):not(.c-blimp_slideshow-slide):not(.nsr)");
  sr.reveal("footer *");
  $(".c-header_nav-button").on("click", function(event) {
    var eventTarget;
    event.preventDefault();
    eventTarget = $(".c-header_wrapper");
    return $(eventTarget).toggleClass("active");
  });
  $(".c-header_logo").on("click", function(event) {
    if ($(window).scrollTop() > ($("header").height() * 2)) {
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
  $(".c-blimp_menu-item").on("click", function() {
    var blimpContainer, blimpSlideshow;
    console.log("success!");
    console.log($(this).index());
    blimpContainer = $(this).parent().parent().parent();
    blimpSlideshow = blimpContainer.find(".c-blimp_slideshow");
    if (!$(this).is("[data-blimp='active']")) {
      blimpSlideshow.children().attr("data-blimp", "");
      blimpSlideshow.children().eq($(this).index()).attr("data-blimp", "active");
      if ($(this).is(":first-child")) {
        blimpSlideshow.children().last().attr("data-blimp", "prev");
        return blimpSlideshow.children().eq($(this).next().index()).attr("data-blimp", "next");
      } else if ($(this).is(":last-child")) {
        console.log($(this).prev().index());
        blimpSlideshow.children().eq($(this).prev().index()).attr("data-blimp", "prev");
        return blimpSlideshow.children().first().attr("data-blimp", "next");
      } else {
        blimpSlideshow.children().eq($(this).prev().index()).attr("data-blimp", "prev");
        blimpSlideshow.children().eq($(this).next().index()).attr("data-blimp", "next");
        return console.log("normal");
      }
    }
  });
  $(".c-blimp_menu-control").on("click", function() {
    var activeIndex, activeSlide, controlIndex, controlItem, slides, slideshow;
    controlItem = $(this);
    controlIndex = controlItem.index();
    slideshow = controlItem.parents().filter(".c-blimp_container").find(".c-blimp_slideshow");
    slides = slideshow.children();
    if (slides.is("[data-blimp='active']")) {
      activeSlide = slides.filter("[data-blimp='active']");
      activeIndex = activeSlide.index();
      slides.attr("data-blimp", "");
      console.log(activeIndex);
      if (controlIndex === 0) {
        if (activeSlide.is(":first-child")) {
          slides.last().prev().attr("data-blimp", "prev");
          slides.last().attr("data-blimp", "active");
          return slides.first().attr("data-blimp", "next");
        } else if (activeIndex === 1) {
          console.log('booya');
          slides.last().attr("data-blimp", "prev");
          activeSlide.prev().attr("data-blimp", "active");
          return activeSlide.attr("data-blimp", "next");
        } else {
          activeSlide.prev().prev().attr("data-blimp", "prev");
          activeSlide.prev().attr("data-blimp", "active");
          return activeSlide.attr("data-blimp", "next");
        }
      } else {
        if (activeSlide.is(":last-child")) {
          activeSlide.attr("data-blimp", "prev");
          slides.first().attr("data-blimp", "active");
          return slides.first().next().attr("data-blimp", "next");
        } else if (activeIndex === slides.length - 2) {
          console.log("booya");
          activeSlide.attr("data-blimp", "prev");
          activeSlide.next().attr("data-blimp", "active");
          return slides.first().attr("data-blimp", "next");
        } else {
          activeSlide.attr("data-blimp", "prev");
          activeSlide.next().attr("data-blimp", "active");
          return activeSlide.next().next().attr("data-blimp", "next");
        }
      }
    }
  });
  $('a[href*="#"]').on("click", function(e) {
    var target;
    e.preventDefault();
    e.stopPropagation();
    target = $(this).attr('href');
    return $(target).velocity('scroll', {
      duration: 700,
      offset: -100,
      easing: 'easeOutCubic'
    });
  });
  return Highcharts.chart('container', {
    chart: {
      type: 'area'
    },
    title: {
      text: 'US and USSR nuclear stockpiles'
    },
    subtitle: {
      text: 'Source: <a href="http://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' + 'thebulletin.metapress.com</a>'
    },
    xAxis: {
      allowDecimals: false,
      lineColor: "transparent",
      lineWidth: 0,
      gridLineColor: "transparent",
      gridLineWidth: 0,
      labels: {
        formatter: function() {
          return this.value;
        }
      }
    },
    yAxis: {
      title: {
        text: 'Nuclear weapon states'
      },
      labels: {
        formatter: function() {
          return this.value / 1000 + 'k';
        }
      }
    },
    tooltip: {
      pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
    },
    plotOptions: {
      area: {
        pointStart: 1940,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      }
    },
    series: [
      {
        name: 'USA',
        data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605, 24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
      }, {
        name: 'USSR/Russia',
        data: [null, null, null, null, null, null, null, null, null, null, 5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000, 35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000, 21000, 20000, 19000, 18000, 18000, 17000, 16000]
      }
    ]
  });
});
