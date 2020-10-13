$(document).on('ready pjax:success', function() {
  handleActiveNav();

  function handleActiveNav() {
    $('.sub-menu').each(function () {
      if ($(this).hasClass('active')) {
        $(this).parent().prev().addClass('active');
        $(this).parent().prev().addClass('open');
        $(this).parent().slideDown();
      }
    });
  }
});

$(function () {
  $('.navbar-brand small').remove();

  var width = $('.sidebar-nav').width();
  $('.navbar-header').width(width);
  $('.navbar-brand').width(width - 30);

  var array_menu = [];
  var lvl_1 = null;
  var count = 0;

  $('.sidebar-nav li').each(function (index, item) {
    if ($(item).hasClass('dropdown-header')) {
      lvl_1 = count++;
      array_menu[lvl_1] = []
    } else {
      $(item).addClass('sub-menu sub-menu-' + lvl_1);
    }
  });

  for (var i = 0; i <= array_menu.length; i++) {
    $('.sub-menu-' + i).wrapAll("<div class='sub-menu-container' />");
  }

  $('.sub-menu-container').hide();

  $('.sub-menu').on("click", function () {
    $('.sub-menu').removeClass("active")
    $(this).addClass("active")
    $(".sub-menu-container").prev().removeClass("open")
    $(this).parents(".sub-menu-container").prev().addClass("open");
  });

  $('.dropdown-header').on('click', function () {
    $('.dropdown-header').removeClass('open');
    $(this).addClass('open');

    $('.dropdown-header').removeClass('active');
    $('.sub-menu-container').stop().slideUp();
    $(this).toggleClass('active');
    $(this).next('.sub-menu-container').stop().slideDown();
  });

  // Sidebar Mobile
  $(".navbar-fixed-top > .container-fluid")
  .prepend(`<div class="hamburguer"><span></span></div>`);


  $(".hamburguer").on("click", function () {
    $(".sidebar-nav").toggleClass("active");
    $("#sidebar-overlay").toggleClass("active");
  });

  function sidebarOverlay() {
    $("body > .container-fluid").append(`<div id="sidebar-overlay"></div>`);
    // $("#sidebar-overlay").css("width", $(document).width()-$(".sidebar-nav").width());
    $("#sidebar-overlay").css("top", $(".navbar-header").height());

    $("#sidebar-overlay").on("click", function () {
      $(".sidebar-nav").toggleClass("active");
      $("#sidebar-overlay").toggleClass("active");
    });
  }

  sidebarOverlay();

  $(".content").parent().removeClass("col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2");
  $(".content").parent().addClass("col-12 col-md-10 col-md-offset-2")

  function sideMenu() {
    if ($(this).width() >= 1024) {
      $(".hamburguer").css("display", "none");
      $(".sidebar-nav").addClass("active");
    } else {
      $(".hamburguer").css("display", "flex");
      $(".sidebar-nav").removeClass("active");
      $("#sidebar-overlay").removeClass("active");
    }
  }

  sideMenu();

  $(window).on("resize", function () {
    sideMenu();    
  });
});