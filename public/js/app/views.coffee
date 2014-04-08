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
