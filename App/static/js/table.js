var allTeams = [];

var arrAlgSort = ['team_id', 'name', 'leader_name', 
                  'number_of_tasks', 'start_time', 'finish_time', 
                  'fails_count', 'score', 'is_active'];

var currSort = 'team_id';
var currSortIndex = 0;

var sortReverse = 1;

var isCheckbox = $('.tableCheckbox').is(':checked');

$(document).ready(function(){
    for(var i = 1; i<10;i++){
        $('.table_teams_head').children('.table_teams_stroke').children('#' + i).mousedown(function(eventObject){
            currSortIndex = $(this).attr('id');

            $('.table_teams_head').children('.table_teams_stroke').children('.sortUp').removeClass('sortUp');
            $('.table_teams_head').children('.table_teams_stroke').children('.sortDown').removeClass('sortDown');

            if(currSort != arrAlgSort[currSortIndex-1]){
                sortReverse = 1;

                $('.table_teams_head').children('.table_teams_stroke').children('[id = ' + currSortIndex +']').addClass('sortUp');
            }else{
                sortReverse*=-1;

                if(sortReverse == 1){
                    $('.table_teams_head').children('.table_teams_stroke').children('[id = ' + currSortIndex +']').addClass('sortUp');
                }else{
                    $('.table_teams_head').children('.table_teams_stroke').children('[id = ' + currSortIndex +']').addClass('sortDown');
                }
            }

            sortDATA(arrAlgSort[currSortIndex - 1]);
            /*console.log($(this).attr('id'));*/
            outputDATA();
        });
    }

    $('.tableCheckbox-custom').mouseup(function(eventObject){//принудительный вызов обновления данных при клике по chekbox
        if(eventObject.which == 1){//только левая кнопка
            isCheckbox = !isCheckbox;
            updateDATA();
        }
    });

    //console.log($('.table_teams_body').children('.table_teams_stroke'));

    updateDATA();

    var timerId = setTimeout(function tick() {
        //console.log('tic');
        updateDATA();
        timerId = setTimeout(tick, 10000);
    }, 10000);

    //console.log($('.tableCheckbox').is(':checked'));
});

function updateDATA(){
	$(function(){
    	$.getJSON('score_table', {'isCheckbox': isCheckbox}, function(data) { //сюда URL json'а (надо добавить передачу галки из чекбокса на сервер)$.getJSON('exp.json', {{data}}, function(data) {});
            for(var j=0;j<allTeams.length;j++){
                var flag = 0;
                for(var i=0;i<data.teams.length;i++){
                    if(allTeams[j].team_id == data.teams[i].team_id){
                        flag = 1;
                        break;
                    }
                }
    
                if(!flag){
                    allTeams.splice(j, 1);
                }
            }
    
            for(var i=0;i<data.teams.length;i++){
                var flag = 0;
                for(var j=0;j<allTeams.length;j++){
                    if(data.teams[i].team_id == allTeams[j].team_id){
                        flag = 1;
                        break;
                    }
                }
    
                if(!flag){
                    allTeams.push(data.teams[i]);
                }
            }

            sortDATA(currSort);

            outputDATA();
    	});
	});
    //console.log(isCheckbox);
    //console.log('update');
}

function outputDATA(){
    $('.table_teams_body').children().remove();
    for(var i=0;i<allTeams.length;i++){
        if(allTeams[i].is_active || isCheckbox){//вывод всех или только не финишировших
            $('.table_teams_body').append('<div class="table_teams_stroke">' +
                  '<p>' +
                      allTeams[i].team_id
                  + '</p>'
        
                  + '<p>' +
                      allTeams[i].name
                  + '</p>'
        
                  + '<p>' +   
                      allTeams[i].leader_name
                  + '</p>'
        
                  + '<p>' +
                      allTeams[i].number_of_tasks
                  + '</p>'
        
                  + '<p>' +
                      UNIXTimeToNormalTime(allTeams[i].start_time)
                  + '</p>'
        
                  + '<p>' +
                      UNIXTimeToNormalTime(allTeams[i].finish_time)
                  + '</p>'
        
                  + '<p>' +
                      allTeams[i].fails_count
                  + '</p>'
        
                  + '<p>' +
                      allTeams[i].score
                  + '</p>'
        
                  + '<p' + 
                    coloredStatus(allTeams[i].is_active)//возвращает кусок <p> с классом и назание состояния
                        //allTeams[i].is_active == "true"? 'finished':'unfinished'
                  + '</p>'
            + '</div>');/*клон снизу*/
        }
    }

    /*отправка id команды на которую кликнули*/
    $('.table_teams_body').children('.table_teams_stroke').mousedown(function(eventObject){
        if(eventObject.which == 1){//только левая кнопка
            //console.log($(this).children().eq(0).text());
            $("#formId").children([name="team_id"]).attr({"value":$(this).children().eq(0).text()});
            $("#formId").children([name="team_id"]).click();/*клик по input для отправки*/
        }
    });
}

function sortDATA(param){
    var fnstring = 'algSort_' + param;
        
    // find object
    var fn = window[fnstring];
        
    // is object a function?
    if (typeof fn === "function"){
        allTeams.sort(fn);
        currSort = param;
    }
}

/*Условия сортировок*/
function algSort_team_id(a, b){
    if (a.team_id > b.team_id) return 1*sortReverse;
    if (a.team_id < b.team_id) return -1*sortReverse;
}

function algSort_name(a, b){
    if (a.name > b.name) return 1*sortReverse;
    if (a.name < b.name) return -1*sortReverse;
}

function algSort_leader_name(a, b){
    if (a.leader_name > b.leader_name) return 1*sortReverse;
    if (a.leader_name < b.leader_name) return -1*sortReverse;
}

function algSort_number_of_tasks(a, b){
    if (a.number_of_tasks > b.number_of_tasks) return 1*sortReverse;
    if (a.number_of_tasks < b.number_of_tasks) return -1*sortReverse;
}

function algSort_start_time(a, b){
    if (UNIXTimeToNormalTime(a.start_time) > UNIXTimeToNormalTime(b.start_time)) return 1*sortReverse;
    if (UNIXTimeToNormalTime(a.start_time) < UNIXTimeToNormalTime(b.start_time)) return -1*sortReverse;
}

function algSort_finish_time(a, b){
    if (UNIXTimeToNormalTime(a.finish_time) > UNIXTimeToNormalTime(b.finish_time)) return 1*sortReverse;
    if (UNIXTimeToNormalTime(a.finish_time) < UNIXTimeToNormalTime(b.finish_time)) return -1*sortReverse;
}

function algSort_fails_count(a, b){
    if (a.fails_count > b.fails_count) return 1*sortReverse;
    if (a.fails_count < b.fails_count) return -1*sortReverse;
}

function algSort_score(a, b){
    if (a.score > b.score) return 1*sortReverse;
    if (a.score < b.score) return -1*sortReverse;
}

function algSort_is_active(a, b){
    if (a.is_active > b.is_active) return 1*sortReverse;
    if (a.is_active < b.is_active) return -1*sortReverse;
}

function UNIXTimeToNormalTime(a){
	time = Math.round(new Date(a*1000).getHours()) + ':';

	if(Math.round(new Date(a*1000).getMinutes()) < 10){
		time = time + '0';
	}

	time = time + Math.round(new Date(a*1000).getMinutes());

	return time;
}

function coloredStatus(status){
    //console.log(status)
    if(status == false){
        return ' class = "finishedStatus">' + 'finished'
    }else{
        return ' class = "unfinishedStatus">' + 'unfinished'
    }
}

/*$("#formId").submit({team_id: 3}, function(eventObject){
    $("#formId").children([type="submit"]).attr({"value":eventObject.data.team_id});
    var externalData = "team_id=" + eventObject.data.team_id;
    console.log(externalData);
    //eventObject.preventDefault();
});*/

//$("#formId").children([type="submit"]).click();
//$('.table_teams_body').children('.table_teams_stroke').submit();
//$("#formId").submit();
//console.log($("#formId").children([type="submit"]).attr('value'));
//alert($('.table_teams_body').children('.table_teams_stroke').eq(0));

