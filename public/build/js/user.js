/*! tresor - v0.0.3 - 2013-10-02 */function getProduct(a,b){$.ajax({url:apiUrl,type:"GET",data:a,dataType:"json",success:function(a){console.log(a),a.forEach(function(a){var c={img_path:a.img,status:a.status,name:a.title,date:a.date,count:a.waiting,id:a.id};$(b).append(render_from_tpl(c))}),initLightBox(),filter()},error:function(a){console.log(a)}})}function initLightBox(){$(".ajax-href").click(function(){var a=$(this).attr("data-id"),b="/product/"+a,c=$("#inline_content"),d=b;history.pushState(b,"",b),$.ajax({url:d,type:"GET",data:{light:!0},dataType:"html",success:function(a){c.empty(),c.append(a)},error:function(){}})}),$(".ajax-href").colorbox({inline:!0,fixed:!0,width:"80%",height:"95%",onCleanup:function(){history.pushState("/user","","/user")}})}function filter(){$("#filter-group a").click(function(){var a=$(this).attr("data-value"),b=$(".item"),c=$(".tran-on"),d=$(".tran-closed");$("#filter-group").removeClass("inUsed"),$(this).addClass("inUsed"),"all"===a?b.show():"on"===a?(b.hide(),c.show()):"closed"===a&&(b.hide(),d.show())})}var apiUrl="/userProduct",query={},render_from_tpl=doT.template('<div class="item tran-{{=it.status}}"><a href="#inline_content" data-id="{{=it.id}}" class="ajax-href"><img class="imgFade" src="{{=it.img_path}}"></a><div class="myproduct-info"><div class="mer_title"><span>{{=it.name}}</span></div><div class="mer_date"><span>{{=it.date}}</span></div><div class="mer_count"><span>{{=it.count}}</span></div></div></div>');query.sell={type:"&seller_username="},query.owned={type:"&buyer_username="},query.follow={type:"&bidder_username="},$("#a").click(function(){$("#my-follow").hide(),$("#my-history").hide(),$("#my-item").show()}),$("#b").click(function(){$("#my-item").hide(),$("#my-history").hide(),$("#my-follow").show()}),$("#c").click(function(){$("#my-item").hide(),$("#my-follow").hide(),$("#my-history").show()}),$("#myTab a:first").tab("show"),$("#my-follow").hide(),$("#my-history").hide(),getProduct(query.owned,"#my-history"),getProduct(query.sell,"#my-item"),getProduct(query.follow,"#my-follow");