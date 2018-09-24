$('.menu-icon').click(function(){
    $(".menu-hidden").animate({left: '0'}, 400);
	$(".menu-close").fadeIn(400);
	$(".menu-icon").fadeOut(400);
	$(".menu-bg").fadeIn(400);
	$(".grid").fadeOut(400);
});

$('.menu-bg, .nav, .menu-close').click(function(){
    $(".menu-hidden").animate({left: '-320px'},400);
	$(".menu-close").fadeOut(400);
	$(".menu-icon").fadeIn(400);
	$(".grid").fadeIn(400);
	$(".menu-bg").fadeOut(400);
});

$(function() {
  $(".menu-bg, .nav, .menu-close").swipe( {
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
          if(direction == 'left') {
      	      $(".menu-hidden").animate({left: '-320px'},400);
	          $(".menu-close").fadeOut(400);
	          $(".menu-icon").fadeIn(400);
	          $(".grid").fadeIn(400);
	          $(".menu-bg").fadeOut(400);
          }   
    }
  });
});