# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.shortcuts import render
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
		return HttpResponseRedirect('team_info')
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
	firstextramember = 3
	lastextramember = 6
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
		        	"first_name": request.POST.get('memberFirstName'),
		        	"second_name": request.POST.get('memberSecondName')
		      	},
		      	{
				"first_name": request.POST.get('memberFirstName1'),
				"second_name": request.POST.get('memberSecondName1')
				},	  
				{
				"first_name": request.POST.get('memberFirstName2'),
				"second_name": request.POST.get('memberSecondName2')
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
	#full = request.GET.get('full')
	url='http://138.68.173.73:8080/moderator/team?full=True'#+full
	headers = {'Content-Type': 'application/json'}
	r=requests.get(url,headers=headers)
	print(r.text)
	return r.json()

def score_table(request):
	if request.method == 'GET':
		#data=proxy_request(request)
		if request.user == 'MODERATOR':
			return render(request,'App/admin/score_table_moderator.html')
		if request.user == 'ADMIN':
			return render(request,'App/admin/score_table_admin.html')
	if request.is_ajax():
		data=proxy_request(request)
		return HttpResponse(request.user)

def task_view(request):
	url = 'http://138.68.173.73:8080/player/task'
	headers = {'Content-Type': 'application/json'}
	r = requests.get(url,headers)
	if r.status_code == 204:
		weekday = datetime.today().weekday()
		if (weekday > 0) and (weekday != 5):
			msg = 'Ждём вас в понедельник'	
		if weekday == 5:
			msg = 'Первый этап закончен. Подходите 12.10 в выбранное время на портал в гз'
		return render(request, 'App/player/no-info.html', msg)
	task_type=r['type']
	task_id=r['id']
	template = 'App/player/'+task_type+'/'+task_id+'.html'
	#return render(template,r)

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
	time = datetime.utcfromtimestamp(time).strftime('%M:%S')
	resp.update({'start_time': time})
	return render(request, 'App/player/team_page.html', resp)

def team_info_moderator(request):
 #должен брать из таблицы команд
	url = 'http://138.68.173.73:8080/moderator/team/6' #+ str(teamID)
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
				time = resp['start_time']
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

def task(request):
	if request.method == 'POST':
		answer = request.POST.get('answer')
		return render(request, 'App/player/taskB.html', {'answer': answer})
	else:
		tag = request.GET.get('submit')
		if tag == 'Перейти к следующему этапу':
			print('next stage')
		return render(request, 'App/player/taskC.html')
