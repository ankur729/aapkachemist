(function($){
  $add.version.Accordion = "1.0.0";
  $add.Accordion = function(selector, settings){
    $(selector).each(function(i, el){
      var $el = $(el);
      if($el.hasClass("addui-Accordion")) return;
      $el.addClass("addui-Accordion");
      var S = $.extend({
        initial: 0,
        change: "click",
        maxOpened: 1
      }, $el.data(), settings);

      if(S.change == "hover"){
        S.change = "mouseover";
      }
      if(typeof(S.inital) == "string" && S.initial.indexOf(",")){
        S.initial = S.initial.split(",");
      }
      var $headers = $el.find("[role=header]").addClass("addui-Accordion-header");
      var $contents = $el.find("[role=content]").addClass("addui-Accordion-content").hide();

      $headers.eq(0).addClass("addui-Accordion-first");
      $contents.eq(0).addClass("addui-Accordion-first");
      $headers.last().addClass("addui-Accordion-last");
      $contents.last().addClass("addui-Accordion-last");

      function countOpen(){
        var count = 0;
        $headers.each(function(i, header){
          if($(header).hasClass("addui-Accordion-open")){
            count++;
          }
        });
        return count;
      }
      function open(index){
        if(S.maxOpened && countOpen() >= S.maxOpened){
          closeLastOpen();
        }
        $headers.eq(index).addClass("addui-Accordion-open");
        $contents.eq(index).addClass("addui-Accordion-open").slideDown();
      }
      function close(index){
        $headers.eq(index).removeClass("addui-Accordion-open");
        $contents.eq(index).removeClass("addui-Accordion-open").slideUp();
      }
      function closeAll(){
        $headers.removeClass("addui-Accordion-open");
        $content.removeClass("addui-Accordion-open").slideUp();
      }
      function closeLastOpen(){
        var lastOpenIndex = 0;
        $headers.each(function(i, header){
          if($(header).hasClass("addui-Accordion-open")){
            lastOpenIndex = i;
          }
        });
        close(lastOpenIndex);
      }
      function toggle(index){
        if($headers.eq(index).hasClass("addui-Accordion-open")){
          close(index);
        } else {
          open(index);
        }
      }

      $headers.each(function(i, header){
        var $header = $(header);
        $header.on(S.change, function(){
          if(S.change == "mouseover"){
            if(!$header.hasClass("addui-Accordion-open")){
              open(i);
            }
          } else {
            toggle(i);
          }
        });
      })

      if(S.initial instanceof Array){
        for(var i=0 ;i<S.initial.length; i++){
          $contents.eq(S.initial[i]).show();
          open(S.initial[i]);
        }
      } else {
        $contents.eq(S.initial).show();
        open(S.initial);
      }
    });
  };
  $.fn.addAccordion = function(settings){
    $add.Accordion(this, settings);
  };
  $add.auto.Accordion = function(){
    if(!$add.auto.disabled){
      $("[data-addui=accordion]").addAccordion();
    }
  };
})(jQuery);
