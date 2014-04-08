#
#* debouncedresize: special jQuery event that happens once after a window resize
#*
#* latest version and complete README available on Github:
#* https://github.com/louisremi/jquery-smartresize/blob/master/jquery.debouncedresize.js
#*
#* Copyright 2011 @louis_remi
#* Licensed under the MIT license.
#
$event = $.event
$special = undefined
resizeTimeout = undefined
$special = $event.special.debouncedresize =
  setup: ->
    $(this).on "resize", $special.handler
    return

  teardown: ->
    $(this).off "resize", $special.handler
    return

  handler: (event, execAsap) ->
    
    # Save the context
    context = this
    args = arguments_
    dispatch = ->
      
      # set correct event type
      event.type = "debouncedresize"
      $event.dispatch.apply context, args
      return

    clearTimeout resizeTimeout  if resizeTimeout
    (if execAsap then dispatch() else resizeTimeout = setTimeout(dispatch, $special.threshold))
    return

  threshold: 250


# ======================= imagesLoaded Plugin ===============================
# https://github.com/desandro/imagesloaded

# $('#my-container').imagesLoaded(myFunction)
# execute a callback when all images have loaded.
# needed because .load() doesn't work on cached images

# callback function gets image collection as argument
#  this is the container

# original: MIT license. Paul Irish. 2010.
# contributors: Oren Solomianik, David DeSandro, Yiannis Chatzikonstantinou

# blank image data-uri bypasses webkit log warning (thx doug jones)
BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
$.fn.imagesLoaded = (callback) ->
  
  # Register deferred callbacks
  doneLoading = ->
    $proper = $(proper)
    $broken = $(broken)
    if deferred
      if broken.length
        deferred.reject $images, $proper, $broken
      else
        deferred.resolve $images
    callback.call $this, $images, $proper, $broken  if $.isFunction(callback)
    return
  imgLoaded = (img, isBroken) ->
    
    # don't proceed if BLANK image, or image is already loaded
    return  if img.src is BLANK or $.inArray(img, loaded) isnt -1
    
    # store element in loaded images array
    loaded.push img
    
    # keep track of broken and properly loaded images
    if isBroken
      broken.push img
    else
      proper.push img
    
    # cache image and its state for future calls
    $.data img, "imagesLoaded",
      isBroken: isBroken
      src: img.src

    
    # trigger deferred progress method if present
    if hasNotify
      deferred.notifyWith $(img), [
        isBroken
        $images
        $(proper)
        $(broken)
      ]
    
    # call doneLoading and clean listeners if all images are loaded
    if $images.length is loaded.length
      setTimeout doneLoading
      $images.unbind ".imagesLoaded"
    return
  $this = this
  deferred = (if $.isFunction($.Deferred) then $.Deferred() else 0)
  hasNotify = $.isFunction(deferred.notify)
  $images = $this.find("img").add($this.filter("img"))
  loaded = []
  proper = []
  broken = []
  if $.isPlainObject(callback)
    $.each callback, (key, value) ->
      if key is "callback"
        callback = value
      else deferred[key] value  if deferred
      return

  
  # if no images, trigger immediately
  unless $images.length
    doneLoading()
  else
    
    # trigger imgLoaded
    $images.bind("load.imagesLoaded error.imagesLoaded", (event) ->
      imgLoaded event.target, event.type is "error"
      return
    ).each (i, el) ->
      src = el.src
      
      # find out if this image has been already checked for status
      # if it was, and src has not changed, call imgLoaded on it
      cached = $.data(el, "imagesLoaded")
      if cached and cached.src is src
        imgLoaded el, cached.isBroken
        return
      
      # if complete is true and browser supports natural sizes, try
      # to check for image status manually
      if el.complete and el.naturalWidth isnt `undefined`
        imgLoaded el, el.naturalWidth is 0 or el.naturalHeight is 0
        return
      
      # cached images don't fire load sometimes, so we reset src, but only when
      # dealing with IE, or image is complete (loaded) and failed manual check
      # webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
      if el.readyState or el.complete
        el.src = BLANK
        el.src = src
      return

  (if deferred then deferred.promise($this) else $this)

Grid = (->
  
  # list of items
  
  # the items
  
  # current expanded item's index
  
  # position (top) of the expanded item
  # used to know if the preview will expand in a different row
  
  # extra amount of pixels to scroll the window
  
  # extra margin when expanded (between preview overlay and the next items)
  
  # transitionend events
  
  # support for csstransitions
  
  # default settings
  init = (config) ->
    
    # the settings..
    settings = $.extend(true, {}, settings, config)
    
    # preload all images
    $grid.imagesLoaded ->
      
      # save item´s size and offset
      saveItemInfo true
      
      # get window´s size
      getWinSize()
      
      # initialize some events
      initEvents()
      return

    return
  
  # add more items to the grid.
  # the new items need to appended to the grid.
  # after that call Grid.addItems(theItems);
  addItems = ($newitems) ->
    $items = $items.add($newitems)
    $newitems.each ->
      $item = $(this)
      $item.data
        offsetTop: $item.offset().top
        height: $item.height()

      return

    initItemsEvents $newitems
    return
  
  # saves the item´s offset top and height (if saveheight is true)
  saveItemInfo = (saveheight) ->
    $items.each ->
      $item = $(this)
      $item.data "offsetTop", $item.offset().top
      $item.data "height", $item.height()  if saveheight
      return

    return
  initEvents = ->
    
    # when clicking an item, show the preview with the item´s info and large image.
    # close the item if already expanded.
    # also close if clicking on the item´s cross
    initItemsEvents $items
    
    # on window resize get the window´s size again
    # reset some values..
    $window.on "debouncedresize", ->
      scrollExtra = 0
      previewPos = -1
      
      # save item´s offset
      saveItemInfo()
      getWinSize()
      preview = $.data(this, "preview")
      hidePreview()  unless typeof preview is "undefined"
      return

    return
  initItemsEvents = ($items) ->
    $items.on("click", "span.ts-close", ->
      hidePreview()
      false
    ).children("a").on "click", (e) ->
      $item = $(this).parent()
      
      # check if item already opened
      (if current is $item.index() then hidePreview() else showPreview($item))
      false

    return
  getWinSize = ->
    winsize =
      width: $window.width()
      height: $window.height()

    return
  showPreview = ($item) ->
    preview = $.data(this, "preview")
    
    # item´s offset top
    position = $item.data("offsetTop")
    scrollExtra = 0
    
    # if a preview exists and previewPos is different (different row) from item´s top then close it
    unless typeof preview is "undefined"
      
      # not in the same row
      if previewPos isnt position
        
        # if position > previewPos then we need to take te current preview´s height in consideration when scrolling the window
        scrollExtra = preview.height  if position > previewPos
        hidePreview()
      
      # same row
      else
        preview.update $item
        return false
    
    # update previewPos
    previewPos = position
    
    # initialize new preview for the clicked item
    preview = $.data(this, "preview", new Preview($item))
    
    # expand preview overlay
    preview.open()
    return
  hidePreview = ->
    current = -1
    preview = $.data(this, "preview")
    preview.close()
    $.removeData this, "preview"
    return
  
  # the preview obj / overlay
  Preview = ($item) ->
    @$item = $item
    @expandedIdx = @$item.index()
    @create()
    @update()
    return
  $grid = $("#ts-grid")
  $items = $grid.children("li")
  current = -1
  previewPos = -1
  scrollExtra = 0
  marginExpanded = 10
  $window = $(window)
  winsize = undefined
  $body = $("html, body")
  transEndEventNames =
    WebkitTransition: "webkitTransitionEnd"
    MozTransition: "transitionend"
    OTransition: "oTransitionEnd"
    msTransition: "MSTransitionEnd"
    transition: "transitionend"

  transEndEventName = transEndEventNames[Modernizr.prefixed("transition")]
  support = Modernizr.csstransitions
  settings =
    minHeight: 500
    speed: 350
    easing: "ease"

  Preview:: =
    create: ->
      
      # create Preview structure:
      @$price = $("<h3 class=\"ts-price\"></h3>")
      @$school = $("<a class=\"ts-detail-attr\" href=\"#\"><img src=\"../images/icons/20.png\"></a>")
      @$category = $("<a class=\"ts-detail-attr\" href=\"#\"><img src=\"../images/icons/20.png\"></a>")
      @$status = $("<a class=\"ts-detail-attr\" href=\"#\"><img src=\"../images/icons/20.png\"></a>")
      @$title = $("<h3></h3>")
      @$description = $("<p></p>")
      @$href = $("<a class=\"button radius\" href=\"#\"><img src=\"../images/icons/11.png\">了解商品細節</a><a class=\"button radius success\" href=\"#\"><img src=\"../images/icons/13.png\">我要排</a>")
      @$attrs = $("<div class=\"ts-attrs\"></div>").append(@$school, @$category, @$status)
      @$details = $("<div class=\"ts-details\"></div>").append(@$title, @$price, @$attrs, @$description, @$href)
      @$loading = $("<div class=\"ts-loading\"></div>")
      @$fullimage = $("<div class=\"ts-fullimg\"></div>").append(@$loading)
      @$closePreview = $("<span class=\"ts-close\"></span>")
      @$previewInner = $("<div class=\"ts-expander-inner\"></div>").append(@$closePreview, @$fullimage, @$details)
      @$previewEl = $("<div class=\"ts-expander\"></div>").append(@$previewInner)
      
      # append preview element to the item
      @$item.append @getEl()
      
      # set the transitions for the preview and the item
      @setTransition()  if support
      return

    update: ($item) ->
      @$item = $item  if $item
      
      # if already expanded remove class "ts-expanded" from current item and add it to new item
      if current isnt -1
        $currentItem = $items.eq(current)
        $currentItem.removeClass "ts-expanded"
        @$item.addClass "ts-expanded"
        
        # position the preview correctly
        @positionPreview()
      
      # update current value
      current = @$item.index()
      
      # update preview´s content
      $itemEl = @$item.children("a")
      eldata =
        href: $itemEl.attr("href")
        largesrc: $itemEl.data("largesrc")
        title: $itemEl.data("title")
        price: $itemEl.data("price")
        school: $itemEl.data("school")
        category: $itemEl.data("category")
        status: $itemEl.data("status")
        description: $itemEl.data("description")

      @$title.html eldata.title
      @$description.html eldata.description
      @$href.attr "href", eldata.href
      self = this
      
      # remove the current image in the preview
      self.$largeImg.remove()  unless typeof self.$largeImg is "undefined"
      
      # preload large image and add it to the preview
      # for smaller screens we don´t display the large image (the media query will hide the fullimage wrapper)
      if self.$fullimage.is(":visible")
        @$loading.show()
        $("<img/>").load(->
          $img = $(this)
          if $img.attr("src") is self.$item.children("a").data("largesrc")
            self.$loading.hide()
            self.$fullimage.find("img").remove()
            self.$largeImg = $img.fadeIn(350)
            self.$fullimage.append self.$largeImg
          return
        ).attr "src", eldata.largesrc
      return

    open: ->
      setTimeout $.proxy(->
        
        # set the height for the preview and the item
        @setHeights()
        
        # scroll to position the preview in the right place
        @positionPreview()
        return
      , this), 25
      return

    close: ->
      self = this
      onEndFn = ->
        $(this).off transEndEventName  if support
        self.$item.removeClass "ts-expanded"
        self.$previewEl.remove()
        return

      setTimeout $.proxy(->
        @$largeImg.fadeOut "fast"  if typeof @$largeImg isnt "undefined"
        @$previewEl.css "height", 0
        
        # the current expanded item (might be different from this.$item)
        $expandedItem = $items.eq(@expandedIdx)
        $expandedItem.css("height", $expandedItem.data("height")).on transEndEventName, onEndFn
        onEndFn.call()  unless support
        return
      , this), 25
      false

    calcHeight: ->
      heightPreview = winsize.height - @$item.data("height") - marginExpanded
      itemHeight = winsize.height
      if heightPreview < settings.minHeight
        heightPreview = settings.minHeight
        itemHeight = settings.minHeight + @$item.data("height") + marginExpanded
      @height = heightPreview
      @itemHeight = itemHeight
      return

    setHeights: ->
      self = this
      onEndFn = ->
        self.$item.off transEndEventName  if support
        self.$item.addClass "ts-expanded"
        return

      @calcHeight()
      @$previewEl.css "height", @height
      @$item.css("height", @itemHeight).on transEndEventName, onEndFn
      onEndFn.call()  unless support
      return

    positionPreview: ->
      
      # scroll page
      # case 1 : preview height + item height fits in window´s height
      # case 2 : preview height + item height does not fit in window´s height and preview height is smaller than window´s height
      # case 3 : preview height + item height does not fit in window´s height and preview height is bigger than window´s height
      position = @$item.data("offsetTop")
      previewOffsetT = @$previewEl.offset().top - scrollExtra
      scrollVal = (if @height + @$item.data("height") + marginExpanded <= winsize.height then position else (if @height < winsize.height then previewOffsetT - (winsize.height - @height) else previewOffsetT))
      $body.animate
        scrollTop: scrollVal
      , settings.speed
      return

    setTransition: ->
      @$previewEl.css "transition", "height " + settings.speed + "ms " + settings.easing
      @$item.css "transition", "height " + settings.speed + "ms " + settings.easing
      return

    getEl: ->
      @$previewEl

  init: init
  addItems: addItems
)()
