# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
import requests, json
from django.core.cache import cache
from django.utils.crypto import get_random_string
from datetime import datetime, timedelta
# Create your views here.

def home(request):
	return HttpResponse(request.COOKIES)

def test(request):
	return HttpResponse(request.user)

def login_view(request):
	error = ''
	if request.method == 'POST':
		login = request.POST.get('login')
		password = request.POST.get('password')
		url = request.POST.get('continue', '/')
		sessid = do_login(login,password)
		if sessid['sessid'] is not None:
			response = HttpResponseRedirect(url)
			response.set_cookie('sessid', sessid['sessid'], domain = '138.68.173.73:8080', expires = datetime.now()+timedelta(hours=3))
			response.set_cookie('teamType', sessid['teamType'], domain = '138.68.173.73:8080', expires = datetime.now()+timedelta(hours=3))
			return response
		else: 
			error = u'Неверный логин / пароль'
	return render(request, 'App/auth/login.html', {'error': error})

def do_login(login, password):
	url = 'http://138.68.173.73:8080/test'
	headers = {
  		'Content-Type': 'application/json'
	}
	json_text = {
		'login': login,
	 	'password': password
	 }
	r = requests.post(url, json=json_text)
	if (r.status_code == 200):
		sessid = get_random_string(length=32)
		cache.set('sessid', sessid,3600*3)
		json_response = r.json()
		teamType = json_response['teamType']
	else:
		sessid = None
		teamType = None
	return {'sessid': sessid, 'teamType': teamType}

def signup(request):
	if request.user is 'Moderator':
		if request.method == 'POST':
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
			new_member3 = {
				"first_name": request.POST.get('memberFirstName3'),
				"second_name": request.POST.get('memberSecondName3')
			} 

			add_member(new_member3, registration_data)

			new_member4 = {
				"first_name": request.POST.get('memberFirstName4'),
				"second_name": request.POST.get('memberSecondName4')
			} 

			add_member(new_member4, registration_data)

			new_member5 = {
				"first_name": request.POST.get('memberFirstName5'),
				"second_name": request.POST.get('memberSecondName5')
			} 

			add_member(new_member5, registration_data)

			new_member6 = {
				"first_name": request.POST.get('memberFirstName6'),
				"second_name": request.POST.get('memberSecondName6')
			} 

			add_member(new_member6, registration_data)

			new_member7 = {
				"first_name": request.POST.get('memberFirstName7'),
				"second_name": request.POST.get('memberSecondName7')
			} 	

			add_member(new_member7, registration_data)
	  		
	  		return HttpResponse(registration_data.values())
	  	else:
	  		return render(request, 'App/auth/signup.html')
	else: 
		return HttpResponse("Эта страница доступна только модераторам")



def add_member(member,registration_data):
		if member['first_name'] is not None:
 				registration_data["members"].append(member)
 		else:
 			return