App.Router.map ->

  @resource "settings", ->
    @route "others"
    @route "profile"
    @route "social_media"
    @route "sign_out"
    return

  #
  #  this.resource('', function() {
  #   this.resource('profile', function() {
  #       this.route('upload_avatar');
  #   });
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
