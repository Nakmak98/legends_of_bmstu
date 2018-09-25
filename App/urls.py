from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^login$', views.login_view, name='login'),
	url(r'^signup$', views.signup, name='signup'),
	url(r'^logout$', views.logout_view, name='logout'),
	url(r'^test$', views.test, name='test'),
	url(r'^score_table$', views.score_table, name='score_table'),
	url(r'^about_team$', views.about_team, name='about_team'),
	url(r'^team_info$', views.team_info, name='team_info'),
	url(r'^key_answer$', views.key_answer, name='key_answer'),
	url(r'^$', views.home, name='home'),
]