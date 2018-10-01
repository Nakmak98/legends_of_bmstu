from django.core.cache import cache
from django.http import HttpResponseRedirect

class CheckSessionMiddleware():
	def __init__(self, get_response):
		self.get_response = get_response

	def __call__(self, request):
		sessid = request.COOKIES.get('sessid')
		user = request.COOKIES.get('team_type')
		session_id = cache.get('sessid')
		if session_id != sessid:
			request.session = None
			request.user = None
			HttpResponseRedirect('login')
		else:
			print('success login')
			request.user = user
			print(request.user)
		return self.get_response(request)		
		


		