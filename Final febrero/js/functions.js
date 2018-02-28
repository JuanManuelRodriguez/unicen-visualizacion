$(document).ready(function() {
  $('.home-button').on('click', function () {
    $(window).scrollTop(0, 0);
  })

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
      $('.message').css({
        'transform': 'translate(' + wScroll / 6 + '%, 0px)'
      });
      $('.message-background').css({
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