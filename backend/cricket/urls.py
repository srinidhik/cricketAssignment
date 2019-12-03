from django.conf.urls import patterns, url
from cricket.views import *

urlpatterns = patterns(
    "cricket.urls",
    url(r'^add-teams$', home, name='home'),
    url(r'^teams', TeamsDashboard.as_view()),
    url(r'^players', PlayersDashboard.as_view()),
    url(r'^matches', MatchesDashboard.as_view()),
    url(r'^points-table', PointsDashboard.as_view())
)