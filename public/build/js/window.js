/*! tresor - v1.0.1 - 2013-10-23 */$(function(){function a(){a=Function(""),f(d,h)}var b=$(".masonry"),c=!1,d={},e=!1,f=function(a){return e=!0,c?void 0:$.ajax({url:"/allProduct",type:"GET",contentType:"application/json",data:a,dataType:"json",success:function(b){a.page=b.meta.next,a.type="",h(b),null==a.page&&(c=!0,$(".end").fadeIn("slow"))}})},g=doT.template('<div class="item"><a href="#inline_content" data-id="{{=it.id}}" class="ajax-href"><img src="{{=it.image[0].w236.relative_path}}" title="{{=it.title}}" style="height: {{=it.image[0].w236.height}}px" class="imgFade"></a><div class="info"></a><div class="title"><a href="#inline_content" data-id="{{=it.id}}" class="ajax-href">{{=it.title}}</a></div><div class="seller"><a href="#">{{=it.seller.facebook_name}}</a></div><div class="price">${{=it.sold_price}}</div></div></div>'),h=function(a){a.objects.forEach(function(a){try{b.append(g(a))}catch(c){console.log("no img")}}),b.masonry("reload"),e=!1,$(".ajax-href").click(function(){$("#inline_content").empty();var a=$(this).attr("data-id"),b="/product/"+a,c=$("#inline_content"),d=b;history.pushState(b,"",b),$.ajax({url:d,type:"GET",data:{light:!0},dataType:"html",success:function(a){c.empty(),c.append(a)},error:function(){}})}),$(".ajax-href").colorbox({inline:!0,fixed:!0,width:"1050",height:"98%",onCleanup:function(){history.pushState("/","","/")}})},i={};i.cookie={set:function(a,b,c){if(c){var d=new Date;d.setTime(d.getTime()+1e3*60*60*24*c);var e="";e=""+d.toGMTString()}else var e="";document.cookie=a+"="+b+"; expires="+e},get:function(a){for(var b=a+"=",c=b.length,d=document.cookie.length,e=0;d>e;){var f=e+c;if(document.cookie.substring(e,f)==b)return this.getVal(f);if(e=document.cookie.indexOf(" ",e)+1,0==e)break}return null},"delete":function(a){this.set(a,"",-1)}},$(window).load(function(){b.masonry({itemSelector:".item",columnWidth:250,isFitWidth:!0}),$(window).scroll(function(){$(window).scrollTop()>=$(document).height()-$(window).height()-300&&(e||f(d,h)),$(window).width()>=1650&&(e||a())}),$(window).trigger("scroll"),i.cookie.get("guide")?alert("has cookie"):($("#initGuide").click(),i.cookie.set("guide","true",7))}),$(window).resize(function(){b.masonry("reload")}),$("#filter .dropdown-menu li").click(function(){$(".masonry").empty();var a=$(this).find("a"),b=a.attr("data-type");d.type=b,c=!1,f(d,h)}),$("#initGuide").click(function(){var a='<div id="guide"><div class="wrapper"><h3 style="color: #666;">快速導覽</h3><hr><ul><li>如何購買一個商品？<p class="step">步驟一：</p><p>打開欲購買的商品，選擇</p><p><strong>「加入排」</strong>便會將您加進購買佇列中</p><p class="step">步驟二：</p><p>接著就可以使用<strong>「訊息」</strong>功能</p><p>藉由Facebook訊息與賣家聯絡！</p><p class="step">步驟三：</p><p>經過交談後若是成功購得商品</p><p>點選<strong>「完成」</strong>表示你已經購得商品</p><p>而此時若是買賣雙方都有點選<strong>「完成」</strong></p><p>此商品則立即下架，並進入使用者的記錄中</p></li></ul><div class="remove btn btn-primary">關閉</div></div></div>';$("html").append(a),$("#guide .remove").click(function(){$("#guide").remove()})})});