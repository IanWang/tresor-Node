/*! tresor - v0.0.3 - 2013-10-11 */function changePluginUrl(a){var b='<fb:comments href="http://tresor.tw/product/'+a+'/" num_posts="20" width="100%"></fb:comments>';$("#comments").html(b),FB.XFBML.parse($("#comments").get(0),function(){$(".FB_Loader").remove()})}function Ajax(a,b,c){$.ajax({url:a,type:"GET",data:b,dataType:"json",success:c})}var getUrl=$(location).attr("href").split("/"),lastStr=getUrl[getUrl.length-1],apiUrl="/action",query={},count,id=""===lastStr?getUrl[getUrl.length-2]:lastStr;query.bQueue={action:"queue",id:id},query.bDequeue={action:"dequeue",id:id},query.bConfirm={action:"confirm",id:id},query.bUnconfirm={action:"unconfirm",id:id},query.sConfirm={action:"confirm",id:id},query.sUnconfirm={action:"unconfirm",id:id},$(".picbar img").mouseenter(function(){$(".imgContainer").empty();var a=$(this).attr("rel");$(".imgContainer").append('<img src="'+a+'" style="display: none;"/>'),$(".imgContainer img").fadeIn("slow")}),$(".listBlock li .sCon").click(function(){$(this).hide(),$(this).parent().find(".sUncon").show();var a=$(this).parent().attr("data-id");query.sConfirm.buyer=a,Ajax(apiUrl,query.sConfirm,function(a){"ok"===a.msg?(alert("雙方均送出確認\n交易結束"),window.location="/"):"failure"===a.msg?alert("一次只能向一位買家確認哦！"):alert("已確認此筆交易\n等候買家回覆中...")})}),$(".listBlock li .sUncon").click(function(){$(this).hide(),$(this).parent().find(".sCon").show();var a=$(this).parent().attr("data-id");query.sUnconfirm.buyer=a,Ajax(apiUrl,query.sUnconfirm,function(){})}),$(".C .confirm").click(function(){$(".C .tranBtn").hide(),$(".C .unconfirm").show(),Ajax(apiUrl,query.bConfirm,function(a){"ok"===a.msg?(alert("雙方均送出確認\n交易結束"),window.location="/"):(console.log(a),alert("已確認此筆交易\n等待賣家回覆中"))})}),$(".C .unconfirm").click(function(){$(".C .tranBtn").hide(),$(".C .dequeue").show(),$(".C .confirm").show(),Ajax(apiUrl,query.bUnconfirm,function(a){console.log(a)})}),$(".C .buy").click(function(){$(".C .tranBtn").hide(),$(".C .dequeue").show(),$(".C .confirm").show(),Ajax(apiUrl,query.bQueue,function(a){console.log(a),alert("已將您排入商品\n請主動聯絡賣家")})}),$(".C .dequeue").click(function(){$(".C .tranBtn").hide(),$(".C .buy").show(),Ajax(apiUrl,query.bDequeue,function(a){console.log(a)})}),$(".lightBuyerSendMsg").click(function(){var a=$("#seller-fb").val(),b=$("#seller-name").val(),c="https://www.facebook.com/messages/"+a,d=confirm("您即將與"+b+"對談\n提醒您，多加留意交易細節及人身安全");1==d&&window.open(c,"_blank")}),$(".lightSendMsg").click(function(){var a=$(this).parent().attr("data-fb"),b=$(".buyerName").html(),c="https://www.facebook.com/messages/"+a,d=confirm("您即將與"+b+"對談\n提醒您，多加留意交易細節及人身安全");1==d&&window.open(c,"_blank")}),$(".listBlock .SsendMsg").click(function(){var a=$(this).parent().attr("data-fb"),b=$(".buyerName").html(),c="https://www.facebook.com/messages/"+a;$(".msgTarget").html(b),$(".modal-footer a").attr("href",c)}),$("#myModal .modal-footer a button").click(function(){$("#myModal").modal("toggle")}),$("#comments").length>0&&changePluginUrl(id);var types={clothes:"上衣",coat:"外套",pantskirt:"褲裙",dress:"連身裝",shoes:"鞋類",accessories:"飾品",cosmeceutical:"藥妝",electronics:"3C產品",book:"一般書籍",textbook:"**教科書**",others:"其他"},cType=$("#category").html(),newType=types[cType];$("#category").html(newType);