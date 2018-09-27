from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^login$', views.login_view, name='login'),
	url(r'^signup$', views.signup, name='signup'),
	url(r'^logout$', views.logout_view, name='logout'),
	url(r'^task$', views.task, name='task'), #just now
	url(r'^score_table$', views.score_table, name='score_table'),
	url(r'^about_team$', views.about_team, name='about_team'),
	url(r'^route$', views.route, name='route'),
	url(r'^team_info$', views.team_info, name='team_info'),
	url(r'^team_info_moderator$', views.team_info_moderator, name='team_info_moderator'),
	url(r'^team_search$', views.team_search, name='team_search'),
	url(r'^team_search_key$', views.team_search_key, name='team_search'),
	url(r'^start$', views.start, name='start'),
	url(r'^finish$', views.finish, name='finish'),
	url(r'^$', views.home, name='home'),
]