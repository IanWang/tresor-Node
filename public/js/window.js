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

	var e = {};
	e.cookie = {
		set: function(h, i, j) {
			if (j) {
				var g = new Date();
				g.setTime(g.getTime() + (j * 24 * 60 * 60 * 1000));
				var f = "";
				f = "" + g.toGMTString();
			} else {
				var f = "";
			}
			document.cookie = h + "=" + i + "; expires=" + f;
		},
		get: function(k) {
			var g = k + "=";
			var m = g.length;
			var f = document.cookie.length;
			var l = 0;
			while (l < f) {
				var h = l + m;
				if (document.cookie.substring(l, h) == g) {
					return this.getVal(h);
				}
				l = document.cookie.indexOf(" ", l) + 1;
				if (l == 0) {
					break;
				}
			}
			return null;
		},
		getVal: function(g) {
			var f = document.cookie.indexOf(";", g);
			if (f == -1) f = document.cookie.length;
			return unescape(document.cookie.substring(g, f));
		},
		delete2: function(f) {
			this.set(f, "", - 1);
		}
	}

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
		if(e.cookie.get('guide')) {
			return;
		} else {
			$('#initGuide').click();
			e.cookie.set('guide', 'true', 7);
		}
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
	$('#initGuide').click(function(){
		var w = '<div id="guide"><div class="wrapper"><h3 style="color: #666;">快速導覽</h3><hr><ul><li>如何購買一個商品？<p class="step">步驟一：</p><p>打開欲購買的商品，選擇</p><p><strong>「加入排」</strong>便會將您加進購買佇列中</p><p class="step">步驟二：</p><p>接著就可以使用<strong>「訊息」</strong>功能</p><p>藉由Facebook訊息與賣家聯絡！</p><p class="step">步驟三：</p><p>經過交談後若是成功購得商品</p><p>點選<strong>「完成」</strong>表示你已經購得商品</p><p>而此時若是買賣雙方都有點選<strong>「完成」</strong></p><p>此商品則立即下架，並進入使用者的記錄中</p></li></ul><div class="remove btn btn-primary">關閉</div></div></div>';
		$('html').append(w);
		$('#guide .remove').click(function(){
			$('#guide').remove();
		});
	});


});


