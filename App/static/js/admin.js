x = 3;
$('.burger').click(function(){
    $(".menu-hidden").animate({left: '0'}, 400);
	$(".menu-close").fadeIn(400);
	$(".menu-icon").fadeOut(400);
	$(".menu-bg").fadeIn(400);
});

$('.grid, .nav, .menu-close').click(function(){
    $(".menu-hidden").animate({left: '-100%'},400);
	$(".menu-close").fadeOut(400);
	$(".menu-icon").fadeIn(400);
	$(".menu-bg").fadeOut(400);
});

{	
	var second_name ='memberSecondName';
	var first_name = 'memberFirstName';
	var second_name_id = 'second-name';
	var first_name_id = 'first-name';
	var delete_id = 'delete';
	var member = 'member';
	$('html').on('click', '#add', function(){
	x++;
	console.log(x);
	$("<div id='memberx' class='member-inputs'><div class='member-inputs-title'>Участник</div><div class='delete_member'><i class='fas fa-times'></i></div><label class='form-label' for='memberSecondName'>Фамилия</label><input required class='member-second-name form' id='second-name' name='memberSecondName' type='text'><label class='form-label' for='memberFirstName'>Имя</label><input required class='member-first-name form' id='first-name' name='memberFirstName' type='text'></div>").insertBefore($(".add-member"));
	$('#' + delete_id).attr('id', delete_id	+x);
	$('#memberx').attr('id', member+x);
	$('#' + second_name_id).attr('id', second_name_id+x);
	$('#' + first_name_id).attr('id', first_name_id+x);
	$('#' + second_name_id+x).attr('name', second_name+x);
	$('#' + first_name_id+x).attr('name', first_name+x);
	$('.team-inputs').css("grid-template-rows", function(i,val){
	var arr = val.split(' ');	
	arr.splice(-2, 0, '169.375px');
	var str = arr.join(' ');
	return str;
   	});

	if(x == 7) { 
		$('.add-member').css({'display': 'none'});
	 }
 });

	$('html').on('click', '.delete_member', function(){
		$('#member'+x).remove();
		x-=1;
		if (x == 6) {
		$('#add').fadeIn('fast');
		}	
		console.log(x);
		$('.team-inputs').css("grid-template-rows", function(i,val){
		var arr = val.split(' ');	
		arr.splice(1, 1);
		var str = arr.join(' ');
		return str;
   	});
});

	
}
	


