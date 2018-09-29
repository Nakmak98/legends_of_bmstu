$('#close').click(function(){
	$(".popup").fadeOut(400);
});

$('#prompt').click(function(){
	$('#popup_text').replaceWith("Эта задачка не так сложна, как ты думаешь");
	$(".popup").fadeIn(400);
});

$('#close1').click(function(){
	$("#popup").fadeOut(400);
});


 $('.task-form').submit(function(e) {
 	//отмена действия по умолчанию для кнопки submit
 		e.preventDefault();
        var $form = $(this);
        $.ajax({
          type: $form.attr('method'),
          url: $form.attr('action'),
          data: $form.serialize(),
          success: function(data){
          	if (data == 'False') {
          		$('#popup_text').replaceWith("Ответ неверный! Попробуйте снова");
          		$('.after-timer-form').attr('method','GET');
          		$(".popup").fadeIn(400)
          	}
          	else if (data=='True') {
          		$('#close').replaceWith("<button id='close' name='answer' class='button'>Ок</button>");
				$('#close').attr('value', data);
				$('#popup_text').replaceWith("Ответ верный! Для продолжения нажмите ОК");
				$(".popup").fadeIn(400)
          	}
          	else {
				$('#close').replaceWith("<button id='close' name='answer' class='button'>Ок</button>");
				$('#close').attr('value', data);
				$('#popup_text').replaceWith("Ответ верный! "+data);
				$(".popup").fadeIn(400)
	        }     	
        }
      });
    });

// timer 
started = $.cookie('started');
duration = $.cookie('duration');
timer = duration - (moment().unix() - started);  
var duration = moment.duration(timer, 'seconds');
var timestamp = new Date(0, 0, 0, 2, 10, 30);
var interval = 1;
var timer = setInterval(function() {
  timestamp = new Date(timestamp.getTime() + interval * 1000);

  duration = moment.duration(duration.asSeconds() - interval, 'seconds');
  var min = duration.minutes();
  var sec = duration.seconds();

  sec -= 1;
  if (min < 0) return clearInterval(timer);
  if (min < 10 && min.length != 2) min = '0' + min;
  if (sec < 0 && min != 0) {
    min -= 1;
    sec = 59;
  } else if (sec < 10 && length.sec != 2) sec = '0' + sec;

  $('.timer').text(min + ':' + sec);
  if (min == 0 && sec == 0){
  	clearInterval(timer);
		$.ajax({
  	  url: 'task',
  	  success: function(){
		$('#popup_text').replaceWith("К сожалению, время истекло. Переходите к следующему заданию");
		$(".popup").fadeIn(400);
  	}
  });
}
}, 1000);

