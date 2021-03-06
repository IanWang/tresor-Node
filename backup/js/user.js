

var apiUrl = '/userProduct';
var query = {};
var isEnd = false;
var render_from_tpl = doT.template('<div class="item tran-{{=it.status}}"><a href="#inline_content" data-id="{{=it.id}}" class="ajax-href"><img class="imgFade" title="{{=it.name}}" src="{{=it.img_path}}"></a><div class="myproduct-info"><div class="mer_title"><span>{{=it.name}}</span></div><div class="mer_date"><span>{{=it.date}}</span></div><div class="mer_count"><span>{{=it.count}}</span></div></div></div>');

query.sell = {type: '&seller_username='};
query.owned = {type: '&buyer_username='};
query.follow = {type: '&bidder_username='};

$('#a').click(function(){
	$('#my-follow').hide();
	$('#my-history').hide();
	$('#my-item').show();
});	

$('#b').click(function(){
	$('#my-item').hide();
	$('#my-history').hide();
	$('#my-follow').show();
});

$('#c').click(function(){
	$('#my-item').hide();
	$('#my-follow').hide();
	$('#my-history').show();
});
	
$('#myTab a:first').tab('show');
$('#my-follow').hide();
$('#my-history').hide();

getProduct(query.owned, '#my-history');
getProduct(query.sell, '#my-item');
getProduct(query.follow, '#my-follow');

function addDeleteBtn() {
	$('#my-item .item').each(function(){
		var temp = '<span class="btn deleteProduct" tite="刪除此商品">刪除</span>'
		$(this).append(temp);
	});
	$('.deleteProduct').click(function(){
		var id = $(this).parent().find('.ajax-href').attr('data-id');
		var who = $(this).parent().find('.mer_title span').html();
		var path = '/product/' + id + '/delete';
		var r = confirm("您確定要永久刪除商品「" + who + "」？\n(提醒：刪除後便無法復原)");
		if(r == true) {
			$.ajax({
				type: 'GET',
				url: path,
				success: function(res) {
					if(res.msg === 'ok') {
						alert('刪除成功');
						window.location.reload();
					} else {
						alert(res.msg);
					}
				},
				error: function(res) {
					alert('fail');
				}
			});
		}
	});
}

function getProduct(q, whereToAppend) {
	$.ajax({
			url: apiUrl,
			type: 'GET',
			data: q, 
			dataType: 'json',
			success: function(data) {
				data.forEach(function(ele) {
					var obj = {
						'img_path': ele.img,
						'status': ele.status,
						'name': ele.title,
						'date': ele.date,
						'count': ele.waiting,
						'id': ele.id
					};
					$(whereToAppend).append(render_from_tpl(obj));
				});
				initLightBox();
				filter();
				if(q.type === query.sell.type) {
					addDeleteBtn();
				}
			},
			error: function(er) {
				console.log(er);
			}
	});
}

function initLightBox(){
	$(".ajax-href").click(function(e){
		var id = $(this).attr('data-id');
		var path = '/product/' + id;
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
		width: '80%',
		height: '95%',
		onCleanup: function(){
			history.pushState('/user', '', '/user');
		}
	});
}

function filter() {
	$('#filter-group a').click(function(){
		var value = $(this).attr('data-value');
		var all = $('.item');
		var on = $('.tran-on');
		var closed = $('.tran-closed');
		
		$('#filter-group a').removeClass('inUsed');
		$(this).addClass('inUsed');
		
		if(value === 'all') {
			all.show();
		} else if (value === 'on') {
			all.hide();
			on.show();
		} else if (value === 'closed') {
			all.hide();
			closed.show();
		}
	});
}
