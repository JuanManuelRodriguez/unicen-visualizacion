$(document).ready(function() {
  $('.home-button').on('click', function () {
    $(window).scrollTop(0, 0);
  });
  
  $(window).scroll(function () {
    var hmbgAppTop = $('#hmbg-app-box').offset().top;
    var wScroll = $(this).scrollTop();
    if (wScroll > hmbgAppTop - ($(window).height() / 1.5) && wScroll <= hmbgAppTop) {
      //pan de arriba
      $('.bread-top').css({
        'transform': 'translate(0px, ' + wScroll / 12 + '%)'
      });
      //hamburguesa con queso
      $('.hamb').css({
        'transform': 'translate(0px, ' + wScroll / 6 + '%)'
      });
      //pan de abajo
      $('.bread-bottom').css({
        'transform': 'translate(0px, -' + wScroll / 30 + '%)'
      });
      //mensaje
      $('.message, .message-background').css({
        'transform': 'translate(' + wScroll / 6 + '%, 0px)'
      });
    }

    // Landing Elements
    if (wScroll > $('.hmbg-pics').offset().top - ($(window).height() / 1.2)) {
      $('.hmbg-pics figure').each(function (i) {
        setTimeout(function () {
          $('.hmbg-pics figure').eq(i).addClass('is-showing');
        }, (700 * (Math.exp(i * 0.14))) - 700);
      });
    }

    // Breadcrumb
    if (wScroll > $('#container-background').offset().top ) { // Home
      $(".home").css({"display": "inline"});
      $(".hmbg-app").css({"display": "none"});
      $(".menu").css({"display": "none"});
      $(".promos").css({"display": "none"});
      $(".contact").css({"display": "none"});
    }
    if (wScroll > $('#hmbg-app-box').offset().top - ($(window).height() / 1.3)) { // HMBG app
      $(".home").css({"display": "none"});
      $(".hmbg-app").css({"display": "inline"});
      $(".menu").css({"display": "none"});
      $(".promos").css({"display": "none"});
      $(".contact").css({"display": "none"});
    }
    if (wScroll > $('#content-menu').offset().top - ($(window).height() / 1.3)) {
      $(".home").css({"display": "none"});
      $(".hmbg-app").css({"display": "none"});
      $(".menu").css({"display": "inline"});
      $(".promos").css({"display": "none"});
      $(".contact").css({"display": "none"});
    }
    if (wScroll > $('#content-promos').offset().top - ($(window).height() / 1.3)) {
      $(".home").css({"display": "noene"});
      $(".hmbg-app").css({"display": "none"});
      $(".menu").css({"display": "none"});
      $(".promos").css({"display": "inline"});
      $(".contact").css({"display": "none"});
    }
    if (wScroll > $('#contact').offset().top - ($(window).height() / 0.8)) {
      $(".home").css({"display": "none"});
      $(".hmbg-app").css({"display": "none"});
      $(".menu").css({"display": "none"});
      $(".promos").css({"display": "none"});
      $(".contact").css({"display": "inline"});
    }
  });

  // when opening the sidebar
  $('#sidebarCollapse').on('click', function () {
    // open sidebar
    $('#sidebar').removeClass('active');
    // fade in the overlay
    $('.overlay').fadeIn();
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });

  // if dismiss or overlay was clicked
  $('#dismiss, .overlay, ul.list-unstyled li').on('click', function () {
    // hide the sidebar
    $('#sidebar').addClass('active');
    // fade out the overlay
    $('.overlay').fadeOut();
  });
});