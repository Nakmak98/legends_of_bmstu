$(document ).ready(function() {
  $("#popup").fadeIn(400);
});

$('#prompt').click(function(){
	$('#popup_text').replaceWith("Эта задачка не так сложна, как ты думаешь");
	$(".popup").fadeIn(400);
});

$('#close').click(function(){
	$(".popup").fadeOut(400);
});

$('#close1').click(function(){
	$("#popup").fadeOut(400);
});


