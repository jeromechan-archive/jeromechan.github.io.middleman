###
# Blog settings
###

# Time.zone = "UTC"
Time.zone = "UTC"

set :site_url, 'http://aboutcoder.com'
set :site_title, 'Jerome Chan | Web developer'
set :site_author, 'Jerome Chan'
set :site_description, 'Web developer'
set :site_keywords, 'html, css, css3, html5, javascript, js, front-end, developer, middleman, jekyll, wordpress, php, ruby'
set :twitter, '@jeromechan369'
set :site_author_image, 'avatar.png'
set :social_google, 'mailto:jerome.chan369@gmail.com'
set :social_weibo, 'http://weibo.com/5812529126'
set :social_twitter, 'https://twitter.com/jeromechan369'
set :social_github, 'https://github.com/jeromechan'
set :social_linkedin, 'https://br.linkedin.com/in/chenjinlong'
set :disqus_shortname, 'aboutcoder'

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  # blog.prefix = "blog"

  blog.permalink = "/{year}/{month}/{day}/{title}"
  # Matcher for blog source files
  blog.sources = "posts/{year}-{month}-{day}-{title}.html"
  blog.taglink = "tags/{tag}.html"

  blog.summary_separator = /(READMORE)/
  blog.summary_length = 250

  blog.year_link = "{year}.html"
  blog.month_link = "{year}/{month}.html"
  blog.day_link = "{year}/{month}/{day}.html"
  blog.default_extension = ".{markdown,md}"

  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"

  # Enable pagination
  blog.paginate = true
  blog.per_page = 10
  blog.page_link = "page/{num}"
end

# i18n
activate :i18n do |l|
  l.path = "/:locale/"
  l.mount_at_root = :en
  l.no_fallbacks = true
end

page "/feed.xml", layout: false
page "/sitemap.xml", layout: false
page "/blog.html", layout: "blog"
page "/tag.html", layout: "tag"
page "/posts/*.html", layout: "posts"

# Title
activate :title, site: 'Jerome Chan | Web developer', separator: ' — '

# Metatags
activate :meta_tags

# Sitemap
set :url_root, 'http://aboutcoder.com/'
activate :search_engine_sitemap, default_priority: 0.5,
                                 default_change_frequency: "always"

###
# Compass
###

# Change Compass configuration
compass_config do |config|
  config.output_style = :expanded
  config.line_comments = false
end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
  def local_path(path, options={})
    lang = options[:language] ? options[:language] : I18n.locale.to_s

    if lang != "en"
      "/#{lang}/#{path}"
    else
      "/#{path}"
    end
  end

  def other_langs
    langs - [I18n.locale]
  end

  def youtube(video_id, video_width= 560, video_height=420)
    video  = '<div class="responsive-video">'
    video += "<iframe width=\"#{video_width}\" height=\"#{video_height}\" src=\"//www.youtube.com/embed/#{video_id}?color=white&theme=light\"></iframe>"
    video += '</div>'
  end
end

set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'

activate :directory_indexes
set :index_file, "index.html"
page "/404.html", :directory_index => false

# syntax
activate :syntax
set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true,
               :autolink => true,
               :smartypants => true

# Reload the browser automatically whenever files change
configure :development do
  set :debug_assets, true
end

require 'sass-media_query_combiner'

activate :autoprefixer do |config|
  config.browsers = ['last 2 versions', 'Explorer >= 9']
  config.ignore   = ['source/assets/stylesheets/vendors/']
end

activate :deploy do |deploy|
  deploy.method = :git
  deploy.branch = 'master'
  deploy.build_before = true
end

# Build-specific configuration
configure :build do
  activate :minify_css
  activate :minify_html
  activate :minify_javascript
  activate :gzip
  activate :asset_hash
  activate :cache_buster
  activate :asset_host, :host => ''
  set :google_analytics_account, ''
  set :cnzz_analytics_account, '1252898702'

  # Automatic image dimensions on image_tag helper
  activate :automatic_image_sizes
  activate :automatic_alt_tags
end
