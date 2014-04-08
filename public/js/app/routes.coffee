App.ProductsRoute = Ember.Route.extend(model: ->
  if window.location.host.split(":")[0] is "localhost"
    # load fake data
    Fixtures.Posts
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
