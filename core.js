$(document).ready(Init);
function Init()
{
  $(".docviewer").googleViewer();
}

// Плагин просмотра документов
(function( $ )
{
  $.fn.googleViewer = function(options)
  {
    // Создаём настройки по-умолчанию
    var settings = $.extend(
    {
      'close'         : 'Закрыть',  // Надпись "Закрыть"
      'download' : 'Скачать'  // Надпись "Скачать"
    }, options);

    return this.each(function()
    {
      var $this = $(this);
      var modalId="docModal-"+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 20);
      var href=$this.attr("href");

      // Узнаем размер файла
      var request = new XMLHttpRequest();
      request.open("HEAD", href, false);
      request.send(null);
      var headerText = request.getAllResponseHeaders();
      var re = /Content\-Length\s*:\s*(\d+)/i;
      re.exec(headerText);
      var size = parseInt(RegExp.$1)/1000;
      size=(""+size).substring(0,5);

      $this.before('<a href="'+href+'" style="text-decoration:none;"><span class="label label-primary"><span class="glyphicon glyphicon-floppy-save"></span> '+size+' Kb</span></a>&nbsp;');
      $this.removeAttr("href").css("cursor","pointer").attr({"data-toggle":"modal", "data-target":"#"+modalId});
      $this.click(function()
      {

        // Создаем модал
        $("body").append('<div class="modal fade" id="'+modalId+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
        <div class="modal-dialog modal-lg">\
        <div class="modal-content">\
        <div class="modal-body">\
        <span style="position:absolute;top:25px;left:30px;color:#000;cursor:pointer;" data-dismiss="modal"><span class="glyphicon glyphicon-remove-circle"></span> '+settings.close+'</span>\
        <a style="position:absolute;top:25px;left:120px;color:#000;text-decoration:none;" href="'+href+'"><span class="glyphicon glyphicon-floppy-save"></span> '+settings.download+' ('+size+' Kb)</a>\
        <iframe src="https://docs.google.com/viewer?url='+href+'&amp;embedded=true" height="600" width="100%" border=0></iframe></div>\
        </div>\
        </div>\
        </div>');

        // Удаляем модал
        $("#"+modalId).on('hidden.bs.modal', function (e)
        {
          $("#"+modalId).remove();
        });
      });
    });
  };
})( jQuery );
