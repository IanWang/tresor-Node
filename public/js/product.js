	
	var getUrl = $(location).attr('href').split('/');
  var lastStr = getUrl[getUrl.length-1];
	var apiUrl = '/action';
	var query = {};
	var count;
	
  var id = (lastStr === '') ? getUrl[getUrl.length-2] : lastStr;
	query.bQueue = { action: 'queue', id: id };
	query.bDequeue   = { action: 'dequeue', id: id };
	query.bConfirm   = { action: 'confirm', id: id };
	query.bUnconfirm = { action: 'unconfirm', id: id };
	query.sConfirm   = { action: 'confirm', id: id };
	query.sUnconfirm = { action: 'unconfirm', id: id };

	$('.picbar img').mouseenter(function(){
		$('.imgContainer').empty();
		var url = $(this).attr('rel');
		$('.imgContainer').append('<img src="' + url + '" style="display: none;"/>');
		$('.imgContainer img').fadeIn('slow');
	});

	// seller actions
	$('.listBlock li .sCon').click(function(){
		$(this).hide();
		$(this).parent().find('.sUncon').show();
		var bId = $(this).parent().attr('data-id');
		query.sConfirm.buyer = bId;
		Ajax(apiUrl, query.sConfirm, function(res){
			if(res.msg === 'ok') {
				alert('雙方均送出確認\n交易結束');
				window.location = '/';
			} else if(res.msg === 'failure') {	
				alert('一次只能向一位買家確認哦！');
			} else {
				alert('已確認此筆交易\n等候買家回覆中...');
			}
		});
	});

	$('.listBlock li .sUncon').click(function(){
		$(this).hide();
		$(this).parent().find('.sCon').show();
		var bId = $(this).parent().attr('data-id');
		query.sUnconfirm.buyer = bId;
		Ajax(apiUrl, query.sUnconfirm, function(res){
		});
	});

	// buyer actions
	$('.C .confirm').click(function(){
		$('.C .tranBtn').hide();
		$('.C .unconfirm').show();
		Ajax(apiUrl, query.bConfirm, function(res){
			if(res.msg === 'ok') {
				alert('雙方均送出確認\n交易結束');
				window.location = '/';
			} else {	
	console.log(res);
				alert('已確認此筆交易\n等待賣家回覆中');
			}
		});
	});
		
	$('.C .unconfirm').click(function(){
		$('.C .tranBtn').hide();
		$('.C .dequeue').show();
		$('.C .confirm').show();
		Ajax(apiUrl, query.bUnconfirm, function(res){
	console.log(res);
		});
	});

	$('.C .buy').click(function(){
		$('.C .tranBtn').hide();
		$('.C .dequeue').show();
		$('.C .confirm').show();
		Ajax(apiUrl, query.bQueue, function(res){
	console.log(res);
			alert('已將您排入商品\n請主動聯絡賣家');
		});
	});

	$('.C .dequeue').click(function(){
		$('.C .tranBtn').hide();
		$('.C .buy').show();
		Ajax(apiUrl, query.bDequeue, function(res){
	console.log(res);
		});
	});


	$('.lightBuyerSendMsg').click(function(){
		var fb = $('#seller-fb').val();
		var name = $('#seller-name').val();
		var link = 'https://www.facebook.com/messages/' + fb;

		var r = confirm("您即將與"+name+"對談\n提醒您，多加留意交易細節及人身安全");
		
		if (r==true) {
			window.open(link, '_blank');
		} else {
			return;
		}
	});

	$('.lightSendMsg').click(function(){
		var fb = $(this).parent().attr('data-fb');
		var name = $('.buyerName').html();
		var link = 'https://www.facebook.com/messages/' + fb;

		var r = confirm("您即將與"+name+"對談\n提醒您，多加留意交易細節及人身安全");
		
		if (r==true) {
			window.open(link, '_blank');
		} else {
			return;
		}
	});

	$('.listBlock .SsendMsg').click(function(){
		var fb = $(this).parent().attr('data-fb');
		var name = $('.buyerName').html();
		var link = 'https://www.facebook.com/messages/' + fb;

		$('.msgTarget').html(name);
		$('.modal-footer a').attr('href', link);
	});

	$('#myModal .modal-footer a button').click(function(){
		$('#myModal').modal('toggle');	
	});

	if($('#comments').length > 0) {
		function changePluginUrl(value) {
			var newVal = '<fb:comments href="http://tresor.tw/product/' + value + '/" num_posts="20" width="100%"></fb:comments>';
			$('#comments').html(newVal);
			FB.XFBML.parse($('#comments').get(0),function(){
				$(".FB_Loader").remove();
			});
		}
		changePluginUrl(id);

	}
	function Ajax(url, query, cb){
		$.ajax({
			url: url,
			type: "GET",
			data: query,
			dataType: "json",
			success: cb
		});
	}

	var types = {
		'clothes': '上衣',
		'coat': '外套',
		'pantskirt': '褲裙',
		'dress': '連身裝',
		'shoes': '鞋類',
		'accessories': '飾品',
		'cosmeceutical': '藥妝',
		'electronics': '3C產品',
		'book': '一般書籍',
		'textbook': '**教科書**',
		'others': '其他'
	}

	var cType = $('#category').html();
  var cSize = $('#size').html();
	var newType = types[cType];
	$('#category').html(newType);
  if(cSize === 'F') {
    $('#size').html('Free Size');
  }
	

