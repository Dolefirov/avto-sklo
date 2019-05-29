$(document).ready(function() {

  // SHOW OR HIDE MAIN MENU IN HEADER
  $('#btnShowMenu').on('click', function(event) {
    tooggleMenu()
  })

  // SCROLL TO SECTION AFTER CLICK ON ANCHOR IN MAIN MANU IN HEADRE
  $('.header-nav li a').click( function(event) {
    var goTo = $(this).attr('href')
      if ($(goTo).length != 0) {
        $('html, body').animate({ scrollTop: $(goTo).offset().top }, 500);
        tooggleMenu()
        return false;
      }
  })  
})


// function for show or hide main menu in header and all his children
function tooggleMenu() {
  var btnShowMenu = $('#btnShowMenu')

  $('.header-nav').slideToggle(300)
  btnShowMenu.toggleClass('menuOpen')

  // hide Submenus
  $('.header-nav .nav-drop').removeClass('isOpen')
  $('.header-nav .nav-drop ul').slideUp(0)
}

$(function($){
    $(document).mouseup(function (event){
        var navContainer = $('.header-nav')
        var btnShowMenu = $('.menu')

        // Hide only if menu open
        if( $('.menu').hasClass('menuOpen') ) {

          // Listen cleck on menu container
          if ( !navContainer.is(event.target)
            && navContainer.has(event.target).length === 0 ) {

            // Listen cleck on button show, hide main menu
            if ( !btnShowMenu.is(event.target)
              && btnShowMenu.has(event.target).length === 0 ) {
                tooggleMenu()
            }
          }
          if ( btnShowMenu.is(event.target)) {
                tooggleMenu()
          }
        }
    })
})

