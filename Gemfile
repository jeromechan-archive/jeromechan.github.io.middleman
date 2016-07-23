# If you have OpenSSL installed, we recommend updating
# the following line to use "https"
source 'http://rubygems.org'

ruby "2.2.4"

# gem 'middleman-cli'
# gem 'middleman-core', '~> 4.1', '>= 4.1.10'
gem 'middleman', '~> 4.1.9'
gem 'middleman-blog', '~> 4.0.1'
gem 'middleman-gh-pages'
gem 'middleman-syntax'

#########################################################################################################
# upgrade to middleman-v4, but can not be resolved because of middleman-slim structures changed.
#########################################################################################################
# gem 'middleman-slim', '~> 0.2.2'
gem 'middleman-slim', :github => 'yterajima/middleman-slim', :branch => 'v4'

gem 'middleman-deploy'
gem 'middleman-title'
gem 'middleman-meta-tags'
gem 'middleman-search_engine_sitemap' # for sitemap
gem 'middleman-minify-html'

#########################################################################################################
## upgrade to middleman-v4
#########################################################################################################
gem "middleman-sprockets", "~> 4.0.0.rc"

gem 'rack-contrib'
gem 'rack-rewrite'
gem 'puma'

gem 'nokogiri' # for article.summary

gem 'middleman-autoprefixer'
gem 'sass-media_query_combiner' # for combine media query

gem 'redcarpet'

###
# Front-end assets
###
gem 'bourbon', '~> 4.2', '>= 4.2.6'
gem 'neat', '~> 1.7', '>= 1.7.4'
gem 'sass', '~> 3.4', :require => false

###
# Development environment
###
group :development do
  gem 'foreman'
end

# For feed.xml.builder
gem 'builder', '~> 3.0'
