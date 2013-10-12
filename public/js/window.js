$(function() {
	var selector = $(".masonry");
	var isEnd = false;
	var query = {};
	var getProductRunning = false;
	var getProduct = function(q, callback) {
		getProductRunning = true;
    if(!isEnd) {
			return $.ajax({
				url : '/allProduct',
				type : 'GET',
				contentType : 'application/json',
				data: q,
				dataType : 'json',
				success : function(data) {
					q.page = data.meta.next;
          q.type = '';
					ajaxCallback(data);
					if (q.page != null) {
						return ;
					} else {
						isEnd = true;
						$('.end').fadeIn('slow');
					}
				},
			});
    }
	};

	var WindowItemTpl = doT.template('<div class="item"><a href="#inline_content" data-id="{{=it.id}}" class="ajax-href"><img src="{{=it.image[0].w236.relative_path}}" title="{{=it.title}}" style="height: {{=it.image[0].w236.height}}px" class="imgFade"></a><div class="info"></a><div class="title"><a href="#inline_content" data-id="{{=it.id}}" class="ajax-href">{{=it.title}}</a></div><div class="seller"><a href="#">{{=it.seller.facebook_name}}</a></div><div class="price">${{=it.sold_price}}</div></div></div>');

	var ajaxCallback = function(data) {
		data.objects.forEach(function(element, index, array) {
			try {	
				selector.append(WindowItemTpl(element));
			} catch(err) {
				console.log('no img');
			}
		});
		selector.masonry('reload');
		getProductRunning = false;

		$(".ajax-href").click(function(e){
			$('#inline_content').empty();
			var id = $(this).attr('data-id');
			var path = '/product/' + id ;
			var $content = $('#inline_content');
			var ajaxUrl = path ;
			history.pushState(path, '', path);
			$.ajax({
				url: ajaxUrl,
				type: 'GET',
				data: {light: true},
				dataType: 'html',
				success: function(data) {
					$content.empty();
					$content.append(data);
				},
				error: function(data) {
					//alert('failed');
				}
			});
		});
		$('.ajax-href').colorbox({
			inline: true, 
			fixed: true,
			width: '1050',
			height: '98%',
			onCleanup: function(){
				history.pushState('/', '', '/');
			}
		});

	};

	$(window).load(function() {
		selector.masonry({
			itemSelector : '.item',
			columnWidth : 250,
			isFitWidth : true
		});
		$(window).scroll(function() {
    	if ($(window).scrollTop() >= $(document).height() - $(window).height() - 300) {
      	if(!getProductRunning) {
					getProduct(query, ajaxCallback);
				}
      };
			if($(window).width() >= 1650) {
      	if(!getProductRunning) {
					loadOnce(); 
				}
			};
    });
    $(window).trigger('scroll');
	});
	$(window).resize(function() {
		selector.masonry('reload');
	});

	$('#filter .dropdown-menu li').click(function(){
		$('.masonry').empty();
		var anchor = $(this).find('a');
		var thisType = anchor.attr('data-type');
		query.type = thisType;
		isEnd = false;
		getProduct(query, ajaxCallback);
	});

	function loadOnce() {
		loadOnce = Function("");
		getProduct(query, ajaxCallback);
	}

});


