/*! tresor - v1.0.1 - 2013-10-23 */function isMoney(a){return/^(\d*\.\d{1,2}|\d+)$/.test(a)}var objId;Dropzone.options.myDropzone={paramName:"images",maxFilesize:4,addRemoveLinks:!0,dictRemoveFile:"移除",dictFileTooBig:"檔案上限為4MB",parallelUploads:10,autoProcessQueue:!1,acceptedFiles:"image/*"},Dropzone.autoDiscover=!1,$(function(){var a=new Dropzone("#my-dropzone");$("#p-type").change(function(){var a=["accessories","cosmeceutical","electronics","book","textbook","others"],b=$("#p-type").val();-1==a.indexOf(b)?"shoes"===b?($("#only-shoes").show(),$("#p-size").hide(),$(".sizeChart").colorbox()):($("#p-size").show(),$("#only-shoes").hide()):($("#p-size").hide(),$("#only-shoes").hide())}),$("#submit").click(function(){var b=a.getAcceptedFiles(),c=$("#p-name").val(),d=$("#p-gender").val(),e=$("#p-type").val();if($("#p-shoes-size").val())var f=$("#p-shoes-size").val();else var f=$("#p-size").val();var g=$("#p-status").val(),h=$("#p-des").val(),i=parseInt($("#p-bought").val(),10),j=parseInt($("#p-sold").val(),10),k="";if(b&&0!=b.length||(k+="至少需上傳一張圖片哦\n"),c||(k+="商品名稱為必填\n"),g||(k+="商品狀態為必填\n"),g.length>15&&(k+="商品狀態超過字數上限\n"),j?isMoney(j)||(k+="欲售價格格式錯誤\n"):k+="欲售價格為必填\n",k&&alert(k),""==k){var l=confirm("是否確定發佈？\n注意：商品發佈後便無法更改內容"),m=JSON.stringify({bought:i,des:h,gender:d,title:c,status:g,size:f,sold:j,type:e});1==l&&$.ajax({url:"/create",type:"POST",contentType:"application/json",data:m,dataType:"json",success:function(b){b.status&&b.id&&(objId=b.id,console.log(b),console.log(objId),a.processQueue())},error:function(a){window.alert("failure\n"+a)}})}}),a.on("sending",function(a,b,c){c.append("ObjectId",objId)}),a.on("error",function(a,b){alert("something goes wrong:\n"+b)}),a.on("success",function(){alert("新增成功"),window.location="/"})}),$(document).ready(function(){$("#p-name").focus(),$("#p-name").tooltip({html:!0,title:'<p style="font-weight:bold;font-size:14px;margin:4px;">LOHA!!<br>此欄為必填</p>',placement:"right"}),$("#p-status").tooltip({html:!0,title:'<p style="font-weight:bold; font-size:14px; margin:4px;">此欄為必填，限15字</p>',placement:"right"}),$("#p-sold").tooltip({html:!0,title:'<p style="font-weight:bold; font-size:14px; margin:4px;">此欄為必填</p>',placement:"right"}),$("#p-shoes-size").tooltip({html:!0,title:'<p style="margin: 4px; font-size: 14px;font-weight: bold">為便於搜尋，請統一使用歐碼</p>',placement:"right"}),$("#p-des").tooltip({html:!0,title:'<p style="font-weight:bold; font-size:14px; margin:4px;">此為備註欄</p><p>若是有額外的說明都可在此欄填寫</p>',placement:"right"})});