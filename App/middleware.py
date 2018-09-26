from django.core.cache import cache
from django.http import HttpResponseRedirect

class CheckSessionMiddleware():
	def __init__(self, get_response):
		self.get_response = get_response

	def __call__(self, request):
		sessid = request.COOKIES.get('sessid')
		user = request.COOKIES.get('teamType')
		session_id = cache.get('sessid')
		if session_id is None:
			request.session = None
			request.user = None
			HttpResponseRedirect('login')
		request.user = user
		return self.get_response(request)		
		


		