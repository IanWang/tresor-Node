$(function() {
	var selector = $(".masonry");
	var isEnd = false;
	var next = {};
	var getProductRunning = false;
	var getProduct = function(callback) {
		getProductRunning = true;
		console.log(isEnd);
		if (isEnd)
			return console.log(0);
		else
			return $.ajax({
				url : '/allProduct',
				type : 'GET',
				contentType : 'application/json',
				data: next,
				dataType : 'json',
				success : function(data) {
					next.page = data.meta.next;
					ajaxCallback(data);
					if (next.page != null) {
						return ;
					} else {
						isEnd = true;
						$('.end').fadeIn('slow');
					}
				},
			});
	};

	var WindowItemTpl = doT.template('<div class="item"><a href="#inline_content" data-id="{{=it.id}}" class="ajax-href"><img src="{{=it.image[0].w236.relative_path}}" style="height: {{=it.image[0].w236.height}}px" class="imgFade"></a><div class="info"></a><div class="title"><a href="#">{{=it.title}}</a></div><div class="seller"><a href="#">{{=it.seller.facebook_name}}</a></div><div class="price">${{=it.sold_price}}</div></div></div>');

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
			var path = '/product/' + id;
			var $content = $('#inline_content');
			var ajaxUrl = path;
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
					getProduct(ajaxCallback);
				}
      }
    });
    $(window).trigger('scroll');
	});
	$(window).resize(function() {
		selector.masonry('reload');
	});

});


