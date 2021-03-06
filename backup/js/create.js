var objId ;

Dropzone.options.myDropzone = {
	paramName: "images",
	maxFilesize: 4, // MB
	addRemoveLinks: true,
	dictRemoveFile: '移除',
	dictFileTooBig: '檔案上限為4MB',
	parallelUploads: 10,
	autoProcessQueue: false,
	acceptedFiles: 'image/*'
};

Dropzone.autoDiscover = false;

$(function() {
	
	var myDropzone = new Dropzone("#my-dropzone");

	$('#p-type').change(function(){
		var noSize = ['accessories', 'cosmeceutical', 'electronics', 'book', 'textbook', 'others']
		var whichType = $('#p-type').val();
		if(noSize.indexOf(whichType) == -1) {
			if(whichType === 'shoes') {
				$('#only-shoes').show();
				$('#p-size').hide();
				$('.sizeChart').colorbox();
			} else {
				$('#p-size').show();
				$('#only-shoes').hide();
			}
		} else {
			$('#p-size').hide();
			$('#only-shoes').hide();
		}
	});
	
	$('#submit').click(function(){
	
		var file = myDropzone.getAcceptedFiles();
		var name = $('#p-name').val();
		var gender = $('#p-gender').val();
		var type = $('#p-type').val();
		
		if($('#p-shoes-size').val()) {
			var size = $('#p-shoes-size').val();
		} else {
			var size = $('#p-size').val();
		}

		var status = $('#p-status').val();
		var description = $('#p-des').val();
		var buy = parseInt($('#p-bought').val(), 10);
		var sell = parseInt($('#p-sold').val(), 10);
		var err = '';

		if(!file || file.length == 0){
			err += '至少需上傳一張圖片哦\n';
		}
		if(!name) {
			err += '商品名稱為必填\n';
		}
		if(!status) {
			err += '商品狀態為必填\n';
		} 
		if(status.length > 15) {
			err += '商品狀態超過字數上限\n';
		}
		if(sell) {
			if(!isMoney(sell))
				err += '欲售價格格式錯誤\n';	
		} else {
			err += '欲售價格為必填\n';
		}

		if(err) {
			alert(err);
		};

		if(err == '') {

			var r = confirm("是否確定發佈？\n注意：商品發佈後便無法更改內容");

			var data = JSON.stringify({
				bought: buy,
				des: description,
				gender: gender,
				title: name,
				status: status,
				size: size,
				sold: sell,
				type: type
			});

			if(r == true) {
				$.ajax({
					url: '/create',
					type: 'POST',
					contentType: 'application/json',
					data: data,
					dataType: 'json',
					success: function(data){
						if(data.status && data.id) {
							objId = data.id;
							myDropzone.processQueue();
						}
					},
					error: function(res){
						window.alert('failure\n'+res);
					}
				});
			}
		}
	});

	myDropzone.on("sending", function(file, xhr, formData) {
		formData.append('ObjectId', objId);
	});
	myDropzone.on("error", function(file, err){
    alert('failure:\n'+err);
	});
	myDropzone.on("success", function(file) {
    alert('新增成功');
    window.location = '/';
	});

});

$(document).ready(function(){
	$("#p-name").focus();
	$("#p-name").tooltip({
		html: true,
		title: '<p style="font-weight:bold;font-size:14px;margin:4px;">LOHA!!<br>此欄為必填</p>',
		placement: 'right'
	});
	$("#p-status").tooltip({
		html: true,
		title: '<p style="font-weight:bold; font-size:14px; margin:4px;">此欄為必填，限15字</p>',
		placement: 'right'
	});
	$("#p-sold").tooltip({
		html: true,
		title: '<p style="font-weight:bold; font-size:14px; margin:4px;">此欄為必填</p>',
		placement: 'right'
	});
	$("#p-shoes-size").tooltip({
		html: true,
		title: '<p style="margin: 4px; font-size: 14px;font-weight: bold">為便於搜尋，請統一使用歐碼</p>',
		placement: 'right'
	});
	$("#p-des").tooltip({
		html: true,
		title: '<p style="font-weight:bold; font-size:14px; margin:4px;">此為備註欄</p><p>若是有額外的說明都可在此欄填寫</p>',
		placement: 'right'
	});
});
function isMoney(str){
	return /^(\d*\.\d{1,2}|\d+)$/.test(str);
}
	
