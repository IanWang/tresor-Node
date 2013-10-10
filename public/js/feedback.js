$('.feedback').colorbox({
  inline: true, 
  fixed: true,
  width: '320',
  height: '440',
  onCleanup: function(){
    history.pushState('/', '', '/');
  }
});

$('#feedbackForm .submit').click(function(){
  var t = $('#fbTitle').val();
  var c = $('#fbContent').val();
  var who = saysWho();
  var form = {
    title: t,
    content: c,
    info: who
  }
  
  $.ajax({
    type: 'POST',
    url: '/feedback', 
    data: form,
    dataType: 'json',
    success: function(res) {
      if(res.msg === 'ok') {
        alert('感謝您的寶貴意見\n讓tresor能夠持續進步:D');
        $('feedback').colorbox.close();
      }
    },
    error: function(res) {
      alert('fail');
    }
  });

  function saysWho() {
    var N= navigator.appName, i,
      ua= navigator.userAgent, tem,
      M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    var OSName="Unknown OS";
    if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
    if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
    if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
    M= M? [OSName, M[1], M[2]]: [N, navigator.appVersion,'-?'];
    return M;
  }

});


