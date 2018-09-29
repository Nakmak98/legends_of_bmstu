# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.template import RequestContext, loader
import requests, json
from django.core.cache import cache
from django.utils.crypto import get_random_string
from datetime import datetime, timedelta
# Create your views here.

def home(request):
	if request.user == 'MODERATOR':
		return HttpResponseRedirect('signup')
	if request.user == 'ADMIN':
		return HttpResponseRedirect('route')
	if request.user == 'PLAYER':
		return HttpResponseRedirect('task')
	if request.user is None:
		return HttpResponseRedirect('login')


def test(request):
	return HttpResponse(request.user)

def logout_view(request):
	key=request.COOKIES.get('sessid')
	response = HttpResponseRedirect('login')
	response.delete_cookie('sessid')
	response.delete_cookie('teamType')
	cache.delete('sessid')
	return response

def login_view(request):
	error = ''
	if request.method == 'POST':
		login = request.POST.get('login')
		password = request.POST.get('password')
		url = request.POST.get('continue', '/')
		sessid = do_login(login,password)
		if sessid['sessid'] is not None:
			response = HttpResponseRedirect(url)
			response.set_cookie('sessid', sessid['sessid'])
			response.set_cookie('teamType', sessid['teamType'])
			response.set_cookie('teamID', sessid['teamID'])
			return response
		else: 
			error = u'Неверный логин / пароль'
	return render(request, 'App/auth/login.html', {'error': error})

def do_login(login, password):
	url = 'http://138.68.173.73:8080/auth'
	headers = {
  		'Content-Type': 'application/json'
	}
	json_text = {
		'login': login,
	 	'password': password
	 }
	r = requests.post(url, json=json_text, headers=headers)
	if (r.status_code == 200):
		sessid = get_random_string(length=32)
		cache.set('sessid', sessid,3600*3)
		json_response = r.json()
		teamType = json_response['teamType']
		teamID = json_response['teamID']
		print(json_response['teamID'])
		cache.set('teamID', teamID,3600*3)
	else:
		sessid = None
		teamType = None
	return {'sessid': sessid, 'teamType': teamType, 'teamID': teamID}

def addMembertoJson(request, registration_data):
	first_name = 'memberFirstName'
	second_name = 'memberSecondName'
	firstextramember = 4
	lastextramember = 7
	for i in range(firstextramember,lastextramember):
		member = {
		'first_name': request.POST.get(first_name+str(i)),
		'second_name': request.POST.get(second_name+str(i))
		}					
		add_member(member,registration_data)

def signup(request):
	if request.user == 'MODERATOR':
		if request.method == 'POST':
			url = 'http://138.68.173.73:8080/moderator/team'
			headers = {'Content-Type': 'application/json'}
			registration_data = {
	    		"team_name": request.POST.get('team_name'),
	    		"leader": {
	      		"first_name": request.POST.get('teamleadFirstName'),
	      		"second_name": request.POST.get('teamleadSecondName')
	    	},
	    	"members": [
		      	{
		        	"first_name": request.POST.get('memberFirstName1'),
		        	"second_name": request.POST.get('memberSecondName1')
		      	},
		      	{
					"first_name": request.POST.get('memberFirstName2'),
					"second_name": request.POST.get('memberSecondName2')
				},	  
				{
					"first_name": request.POST.get('memberFirstName3'),
					"second_name": request.POST.get('memberSecondName3')
				}	  		
		    ]
	  		}
	  		
	#Добавление новых участников команды для отправки на игровой сервер
			addMembertoJson(request,registration_data)
	  		text = json.dumps(registration_data,ensure_ascii=False, indent = 4)
	  		print(text)
	  		r = requests.post(url, json=registration_data, headers=headers)
	  		return HttpResponse(r.status_code)
	  		#return HttpResponseRedirect('signup')
	  	else:
	  		return render(request, 'App/admin/signup.html')
	else: 
		return HttpResponse("Эта страница доступна только модераторам")


def add_member(member,registration_data):
		if member['first_name'] is not None:
 				registration_data["members"].append(member)
 		else:
 			return

def proxy_request(request):
	full = request.GET.get('isCheckbox')
	url='http://138.68.173.73:8080/moderator/team?full='+full
	headers = {'Content-Type': 'application/json'}
	r=requests.get(url,headers=headers)
	return r.json()

def score_table(request):
	if request.is_ajax():
		data=proxy_request(request)
		return JsonResponse(data)
	if request.method == 'GET':
		if request.user == 'MODERATOR':
			return render(request,'App/admin/score_table_moderator.html')
		if request.user == 'ADMIN':
			return render(request,'App/admin/score_table_admin.html')
	


def get_current_task(request):
	teamID = request.COOKIES.get('teamID')
	url = 'http://138.68.173.73:8080/player/task/' + str(teamID)
	headers = {'Content-Type': 'application/json'}
	r = requests.get(url,headers)
	print(r.status_code)
	return r

def get_next_task(request):
	task_id = request.COOKIES.get('task_id')
	team_id = request.COOKIES.get('teamID')
	task_type = request.COOKIES.get('task_type')
	url = 'http://138.68.173.73:8080/player/next'
	headers = {'Content-Type': 'application/json'}
	data =  {
	   "team_id": team_id,
	   "task_id": task_id,
	   "task_type": task_type
	  }
	r = requests.post(url, json=data, headers=headers)
	return r

def render_task_photo_or_extra(request, resp):
	task_id = resp['task_id']	
	task_type = resp['task_type']
	points = resp['points']
	template = 'App/player/' + task_type + '/' +'task.html'
	t = loader.get_template(template)
	response = HttpResponse(t.render(resp))
	response.set_cookie('points', points)
	response.set_cookie('task_id', task_id)
	response.set_cookie('task_type', task_type)
	return response

def check_task(request, r):
	resp = r.json()
	print(resp)
	if resp['is_finished']:
		return HttpResponse("Вы прошли все задания текущего этапа")
	if r.status_code == 200:
		if resp['task_type'] == 'PHOTO' or resp['task_type'] == 'EXTRA':
			return render_task_photo_or_extra(request, resp)
		else:
			task_id = resp['task_id']	
			task_type = resp['task_type']
			points = resp['points']	
			started = resp['start_time']
			duration = resp['duration']
			template = 'App/player/' + task_type + '/' +'task.html'
			t = loader.get_template(template)
			response = HttpResponse(t.render(resp))
			response.set_cookie('points', points)
			response.set_cookie('task_id', task_id)
			response.set_cookie('task_type', task_type)
			response.set_cookie('duration', duration)
			response.set_cookie('started', started)
			return response
	if r.status_code == 204:
		weekday = datetime.today().weekday()
		if (weekday > 0) and (weekday != 5):
			msg = 'Ждём вас в понедельник'	
		if weekday == 5:
			msg = 'Первый этап закончен. Подходите 12.10 в выбранное время на портал в гз'
		#return render(request, 'App/player/no-info.html', msg)
		return HttpResponse(msg)
	if r.status_code >= 400:
		return HttpResponse(resp['message'])

def check_answer(request, r, answer):
	resp = r.json()
	print(r.status_code)
	if r.status_code == 202:
		if request.COOKIES.get('task_type') == 'FINAL':		
			if resp['is_correct']:
				return HttpResponse('True')
			else:
				return HttpResponse('False')
		if request.COOKIES.get('task_type') == 'EXTRA':
			if resp['is_correct']:
				return HttpResponse(resp['tooltip'])
			else:
				return HttpResponse('False')
		else:
			if resp['is_correct']:
				return HttpResponse('True')
			else:
				return HttpResponse('False')
	if r.status_code == 404:
		msg = r.json()
		msg = msg['message']
		return HttpResponse(msg)
	if r.status_code == 500:
		msg = 'Произошла ошибка на сервере'
		return HttpRespone(msg) 

def task_view(request):
	if request.is_ajax():
		if request.method == 'POST': 
			task_id = request.COOKIES.get('task_id')
			team_id = request.COOKIES.get('teamID')
			task_type = request.COOKIES.get('task_type')
			answer = request.POST.get('answer')
			url = 'http://138.68.173.73:8080/player/task'
			headers = {'Content-Type': 'application/json'}
			data =  {
	   		"team_id": team_id,
	    	"task_id": task_id,
	    	"answer": answer,
	    	"task_type": task_type
	  		}
		  	r = requests.post(url, json=data, headers=headers)
		  	print(r.status_code)
		  	return check_answer(request, r, answer)
		
	if request.method == 'GET':
		if request.GET.get('next'):		
			answer = request.GET.get('answer')
			points = request.COOKIES.get('points')
			return render(request, 'App/player/FINAL/next_task.html', {'answer': answer, 'points': points})
		if request.GET.get('submit'):
			r = get_next_task(request)
			return check_task(request, r)	
		r = get_current_task(request)
		return check_task(request, r)
		
def about_team(request):
	if request.user != 'MODERATOR':
		return render('App/main/error.html', {'error_msg': 'Необходимо обладать правами модератора, чтобы просматривать эту страницу'})
	teamID = request.GET.get('teamID')
	url = 'http://138.68.173.73:8080/moderator/team/1' #+teamID
	headers = {'Content-Type': 'application/json'}
	r = requests.get(url,headers)
	return render(request, 'App/admin/about_team.html', r.json())

def team_info(request):
	teamID = request.COOKIES.get('teamID')
	url = 'http://138.68.173.73:8080/player/team/' + str(teamID)
	headers = {'Content-Type': 'application/json'}
	r = requests.get(url,headers)
	resp = r.json()
	time = resp['start_time']
	time = datetime.utcfromtimestamp(time).strftime('%Y.%m.%d %H:%M:%S')
	resp.update({'start_time': time})
	return render(request, 'App/player/team_page.html', resp)

def team_info_moderator(request):
	teamID = request.GET.get('team_id')
	url = 'http://138.68.173.73:8080/moderator/team/' + str(teamID)
	headers = {'Content-Type': 'application/json'}
	r = requests.get(url,headers)
	resp = r.json()
	time = resp['start_time']
	time = datetime.utcfromtimestamp(float(time)).strftime('%Y.%m.%d %H:%M:%S')
	resp.update({'start_time': time})
	return render(request, 'App/player/moderator_team_page.html', resp)

def team_search(request):
	if request.user != 'MODERATOR':
		return render(request, 'App/main/error.html', {'error_msg': 'Необходимо обладать правами модератора, чтобы просматривать эту страницу'})
	teamID = request.GET.get('teamID')
	if teamID != None:
		url = 'http://138.68.173.73:8080/moderator/prepare/' + str(teamID)
		headers = {'Content-Type': 'application/json'}
		r = requests.get(url,headers)
		if r.status_code == 200:
				resp = r.json()
				try: time = resp['start_time']
				except KeyError: 
					HttpResponseRedirect('/') 
				time = datetime.utcfromtimestamp(float(time)).strftime('%Y.%m.%d %M:%S')
				resp.update({'start_time': time})
				return render(request, 'App/admin/start-finish.html', resp)
		if r.status_code == 404 or r.status_code == 500:
			return render(request, 'App/admin/start-finish.html', {'error_msg': 'Данных о запрашиваемой команде не существует'})
	else: 
		return render(request, 'App/admin/start-finish.html')

def start(request):
	if request.method == 'POST':
		teamID = request.POST.get('teamID')
		print(teamID)
		url = 'http://138.68.173.73:8080/moderator/start/' + str(teamID)
		print(url)
		headers = {'Content-Type': 'application/json'}
		r = requests.get(url,headers)
		print(r.status_code)
		if r.status_code == 202:
			return render(request, 'App/admin/start-finish.html', {'success':'Команда стартовала'})
		else:
			return render(request, 'App/admin/start-finish.html', r.json())

def finish(request):
	if request.method == 'POST':
		teamID = request.POST.get('teamID')
		url = 'http://138.68.173.73:8080/moderator/stop/' + str(teamID)
		headers = {'Content-Type': 'application/json'}
		r = requests.get(url,headers)
		if r.status_code == 202:
			return render(request, 'App/admin/start-finish.html',{'succes':'Команда успешно финишировала'})
		else:
			return render(request, 'App/admin/start-finish.html',r.json())


def team_search_key(request):
	if request.user != 'MODERATOR':
		return render('App/main/error.html', {'error_msg': 'Необходимо обладать правами модератора, чтобы просматривать эту страницу'})
	#teamID = request.GET.get('teamID')
	teamID = request.GET.get('teamID')
	if teamID is None:
		return render(request, 'App/admin/moderator-search.html')
	url = 'http://138.68.173.73:8080/moderator/photo/' + teamID
	headers = {'Content-Type': 'application/json'}
	print(url)
	r = requests.get(url,headers)
	print(r)
	return render(request, 'App/admin/moderator-search.html', r.json())

def route(request):
	if request.user != 'ADMIN':
		return render(request, 'App/main/error.html', {'error_msg': 'Необходимо обладать правами администратора, чтобы просматривать эту страницу'})
	#if request.is_ajax():
		#url = 'http://138.68.173.73:8080/moderator/team/5'
		#headers = {'Content-Type': 'application/json'}
		#r = requests.get(url,headers)
		#print(r.json())
		#return JsonResponse(r.json())
	return render(request,'App/admin/route.html')


