App = Ember.Application.create(
  LOG_TRANSITIONS: true
  LOG_BINDINGS: true
  LOG_VIEW_LOOKUPS: true
  LOG_STACKTRACE_ON_DEPRECATION: true
  LOG_VERSION: true
  debugMode: true
)

###
With `didInsertElement` event,
we can ensure elements drawn by Ember.JS woule be
initialized by Zurb Foundation

Reference:
https://ferritedog.wordpress.com/2013/08/11/javascript-development-workflow-the-new-norm/
###
App.ApplicationView = Ember.View.extend(didInsertElement: ->
  $(document).foundation()
  $ ->
    Grid.init()
    return

  return
)
App.Router.map ->
  @resource "settings", ->
    @route "others"
    @route "profile"
    @route "social_media"
    @route "sign_out"
    return

  
  #
  #  this.resource('', function() {
  #  	this.resource('profile', function() {
  #  			this.route('upload_avatar');
  #  	});
  #  });
  #  
  @resource "create"
  @route "message"
  @route "products",
    path: "/"

  @route "product",
    path: "/product/:product_id"

  @route "user",
    path: "/user/:user_name"

  @route "missing",
    path: "/*path"

  return

App.CreateController = Ember.Controller.extend(
  current_product_type: "textbook"
  product_types: [
    {
      value: "textbook"
      label: "**教科書**"
    }
    {
      value: "clothes"
      label: "上衣"
    }
    {
      value: "coat"
      label: "外套"
    }
    {
      value: "pantskirt"
      label: "褲裙"
    }
    {
      value: "dress"
      label: "連身裝"
    }
    {
      value: "shoes"
      label: "鞋類"
    }
    {
      value: "accessories"
      label: "飾品"
    }
    {
      value: "cosmeceutical"
      label: "藥妝"
    }
    {
      value: "electronics"
      label: "3C產品"
    }
    {
      value: "book"
      label: "一般書籍"
    }
    {
      value: "others"
      label: "其他"
    }
  ]
  
  # for clothes, coat, pantskirt, and dress
  typeIsClothes: (->
    types = "clothes,coat,pantskirt,dress".split(",")
    -1 isnt types.indexOf(@get("current_product_type"))
  ).property("current_product_type")
  
  # for shoes
  typeIsShoes: (->
    @get("current_product_type") is "shoes"
  ).property("current_product_type")
  cloth_sizes: "Free size,XS,S,M,L,XL,XXL".split(",")
)
App.ProductsRoute = Ember.Route.extend(model: ->
  if window.location.host.split(":")[0] is "localhost"
    
    # load fake data
    posts
  else
    
    # load from production site
    $.getJSON("http://pa4373.ribosome.com.tw:8000/static/js/app/api.json").then (data) ->
      data.objects.map (post) ->
        post.large_path = post.image[0].w960.relative_path
        post.small_path = post.image[0].w236.relative_path
        console.log post
        post


)
App.MissingRoute = Em.Route.extend(redirect: ->
  @transitionTo "products"
  return
)
posts = [
  {
    title: "product1"
    href: "http://google.com"
    image: [
      w236:
        path: "http://tresor.tw/media/images/products/52fccd99f7500bf86be39921-265070213617344679693853873725059812355_w236.jpg"

      w960:
        path: "http://tresor.tw/media/images/products/52fccd99f7500bf86be39921-264740143546338878464935538079883512835_w960.jpg"
    ]
    description: "description111111"
    price: "1111"
  }
  {
    title: "product2"
    href: "http://tresor.tw"
    image: [
      w236:
        path: "http://tresor.tw/media/images/products/52fccd22f7500bf864e39922-170836755275061519848860560972856609795_w236.jpg"

      w960:
        path: "http://tresor.tw/media/images/products/52fccd22f7500bf864e39922-170493218000991543967838074727002196995_w960.jpg"
    ]
    description: "description2222"
    price: "2222"
  }
]
