

var apiUrl = '/userProduct';
var query = {};
var render_from_tpl = doT.template('<div class="item"><a href="#inline_content" data-id="{{=it.id}}" class="ajax-href"><img class="imgFade" src="{{=it.img_path}}"></a><div class="myproduct-info"><div class="mer_title"><span>{{=it.name}}</span></div><div class="mer_date"><span>{{=it.date}}</span></div><div class="mer_count"><span>{{=it.count}}</span></div></div></div>');

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
getProduct(query.sell, '#my-follow');


function getProduct(q, whereToAppend) {
	$.ajax({
			url: apiUrl,
			type: 'GET',
			data: q, 
			dataType: 'json',
			success: function(data) {
				console.log(data);
				data.forEach(function(ele) {
					var obj = {
						'img_path': ele.img,
						'name': ele.title,
						'date': ele.date,
						'count': ele.waiting,
						'id': ele.id
					};
					$(whereToAppend).append(render_from_tpl(obj));
				});
				initLightBox();
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
		height: '98%',
		onCleanup: function(){
			history.pushState('/', '', '/');
		}
	});
}




/*
$.ajax({
	url : apiUrl + '/api/product/user/'+uID+'/',
	type : 'GET',
	contentType : 'application/json',
	dataType : 'json',
	success : function(data) {
		$('#avatar').html('<img src='+data.profile_picture+'>');
		$('#avatar_name span').text(data.first_name+' '+data.last_name);
	}
});

$.ajax({
    url : apiUrl,
    type : 'GET',
    contentType : 'application/json',
    dataType : 'json',
    success : function(data) {
		data.objects.forEach(function(element, index, array) {
			var selector;
			if (element.transaction_set[0].product.onsale){
				selector = $('#merchandise_image_store2');
			}
			else{
				if(element.transaction_set[0].buyer != null){
					if(element.transaction_set[0].buyer.id = uID){
						selector = $('#merchandise_image_store3');
					}
				}
			}
			var obj = {
				'img_path': element.transaction_set[0].product.images[0].w236_path,
				2'name': element.transaction_set[0].product.name,
				'date': new Date(element.transaction_set[0].product.publishedDate).toLocaleString(),
				'count': element.transaction_set[0].matchingEntry.length,
				'url': '/product/'+element.transaction_set[0].product.id+'/',
			};
			selector.append(render_from_tpl(obj));
		});
	}
});
*/
