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
