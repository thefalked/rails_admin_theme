RailsAdmin Rollincode Theme
--------------------

[![Gem Version](https://badge.fury.io/rb/rails_admin_rollincode.svg)](https://badge.fury.io/rb/rails_admin_rollincode)

A modern override of default bootstrap 3 rails_admin theme.

It provides news colors, adjustments and a brand new tree view menu.

The JS is not needed to be added anymore, it has been fixed.

It was set the sidebar for mobile devices but the theme is not responsive, but now it's better.

### Desktop Image
![Desktop Image](https://github.com/thefalked/rails_admin_theme/blob/master/images/desktop.png)

### Mobile Images
![Desktop Image](https://github.com/thefalked/rails_admin_theme/blob/master/images/mobile.png)
![Desktop Image](https://github.com/thefalked/rails_admin_theme/blob/master/images/mobile-navbar.png)

You can fork it and change `variables.scss` as you want !

Gemfile

```ruby
gem 'rails_admin_rollincode', git: 'https://github.com/thefalked/rails_admin_theme'
```

Inside `config/application.rb`, just after `Bundler.require`

```ruby
ENV['RAILS_ADMIN_THEME'] = 'rollincode'
```

You'll have to run theses commands for changes to take effect

`rake assets:clean && rake assets:precompile`

or

`rm -rf tmp/cache/assets/development/`

You also can set in `config/initializers/rails_admin.rb`

```ruby
config.show_gravatar = false
```

to remove the avatar image in the dashboard (Is usually already in the file but commented)

In case the JS file in the theme dosn't work set/create the file in `app/assets/javascripts/rails_admin/custom/ui.js`

If you already have stuff in this document, just put in the end

```javascript
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
  .prepend('<div class="hamburguer"><span></span></div>');


  $(".hamburguer").on("click", function () {
    $(".sidebar-nav").toggleClass("active");
    $("#sidebar-overlay").toggleClass("active");
  });

  function sidebarOverlay() {
    $("body > .container-fluid").append('<div id="sidebar-overlay"></div>');
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
```
