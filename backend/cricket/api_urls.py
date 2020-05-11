from django.urls import path
from cricket.api_views import *

urlpatterns = [
    # path(r'^add-teams$', home, name='home'),
    path(r'teams', TeamsDashboard.as_view()),
    path(r'players', PlayersDashboard.as_view()),
    path(r'matches', MatchesDashboard.as_view()),
    path(r'points-table', PointsDashboard.as_view())
]