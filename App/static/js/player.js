$(document).ready(function(){
  $("#popup_next").fadeIn(400);
})

$('#close').click(function(){
	$(".popup").fadeOut(400);
});
$('html').on('click', '#close', function(){
  $(".popup").fadeOut(400);
});

$('#prompt').click(function(){
	$('#popup_text').replaceWith("Эта задачка не так сложна, как ты думаешь");
	$(".popup").fadeIn(400);
});

$('#close1').click(function(){
	$("#popup").fadeOut(400);
});


 $('#task-form').submit(function(e) {
 	//отмена действия по умолчанию для кнопки submit
 		e.preventDefault();
        var $form = $(this);
        $.ajax({
          type: $form.attr('method'),
          url: $form.attr('action'),
          data: $form.serialize(),
          success: function(data){
            console.log(typeof(data))
            console.log(data.status)
            console.log(data.task_type)
          	if (data.status == 'False' && data.task_type == 'FINAL') {
          		$('#popup_text').replaceWith("<p id='popup_text'>Ответ неверный! Попробуйте снова<br></p>");
          		$('.after-timer-form').replaceWith("<button id='close' class='button'>OK<button");
          		$(".popup").fadeIn(400)
          	}
          	else if (data.status == 'True' && data.task_type == 'FINAL') {
          		$('.popup-block').replaceWith("<div class='popup-block'><p id='popup_text'>Ответ верный!<br>Для продолжения нажмите ОК</p><form method='GET' action='task' class='after-timer-form'><button id='close' name='next' value='True' class='button'>Ок</button></form></div> ");
				      $(".popup").fadeIn(400)
          	}
            else if (data.status == 'True' && data.task_type == 'PHOTO') {
              $('.popup-block').replaceWith("<div class='popup-block'><p id='popup_text'>Ответ верный!<br>Для продолжения нажмите ОК</p><form method='GET' action='task' class='after-timer-form'><button id='close' name='submit' value='True' class='button'>Ок</button></form></div> ");
              $(".popup").fadeIn(400)
            }
            else if (data.status == 'False' && data.task_type == 'PHOTO') {
              $('#popup_text').replaceWith("<p id='popup_text'>Ответ неверный! Попробуйте снова<br></p>");
              $('.after-timer-form').replaceWith("<button id='close' class='button'>OK<button");
              $(".popup").fadeIn(400)
            }
             else if (data.status == 'True' && data.task_type == 'EXTRA') {
              $('.popup-block').replaceWith("<div class='popup-block'><p id='popup_text'>Ответ верный!<br>" + data.tooltip + "</p><form method='GET' action='task' class='after-timer-form'><button id='close' name='submit' value='True' class='button'>Ок</button></form></div> ");
              $(".popup").fadeIn(400)
            }
            else if (data.status == 'False' && data.task_type == 'EXTRA') {
              $('#popup_text').replaceWith("<p id='popup_text'>Ответ неверный! Попробуйте снова<br></p>");
              $('.after-timer-form').replaceWith("<button id='close' class='button'>OK<button");
              $(".popup").fadeIn(400)
            }
          	else {
				      $('#close').replaceWith("<button id='close' name='answer' class='button'>Ок</button>");
				      $('#close').attr('value', data);
				      $('#popup_text').replaceWith(data);
				      $(".popup").fadeIn(400)
	        }     	
        }
      });
    });

// timer 
var started = document.getElementById('started').textContent;
var duration = document.getElementById('duration').textContent;
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
    $('#block-timer').replaceWith("<div class='popup-block'><p id='popup_text'>К сожалению, время истекло<br>Для продолжения нажмите ОК</p><form method='GET' action='task' class='after-timer-form'><button id='close' name='next' value='True' class='button'>Ок</button></form></div> ");  
		$('#popup_next').fadeIn(400);
		$("#popup-timer").fadeIn(400);
}
}, 1000);

