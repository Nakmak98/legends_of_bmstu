# -*- coding: utf-8 -*-
from django.core.cache import cache
from django.shortcuts import render
from views import login_view

class CheckSessionMiddleware():
	def __init__(self, get_response):
		self.get_response = get_response

	def __call__(self, request):
		user_session_id = request.COOKIES.get('sessid')
		if user_session_id is None:
			return login_view(request)
		print(user_session_id)
		print(cache.get(user_session_id))
		if cache.get(user_session_id) == None: 
			request.session = None
			request.user = None
			print('auth error, redirect to /login')
		else:
			print('success login')
			request.user = cache.get(user_session_id)['team_type']
			print(request.user)
		return self.get_response(request)		
		


			