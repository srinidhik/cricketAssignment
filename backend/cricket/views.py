# Create your views here.
import base64
import json
from django.core import serializers
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage
from django.http.response import HttpResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from cricket.models import *
from django_application.settings import BASE_DIR


def home(request):
    return render(request, 'addTeam.html')


class TeamsDashboard(APIView):
    def get(self, request):
        try:
            teams = Teams.objects.all()
            data = serializers.serialize('json', teams)
            return Response(data, 200)
            # return render(request, 'teamDashboard.html', {'teams': teams})
        except Exception as e:
            return Response({'result': str(e)}, 500)


    def post(self, request):
        try:
            data = request.DATA
            name = data.get("name", None)
            club_state = data.get("club_state", None)

            content, type = get_image(data.get("logo_uri", None))
            file_name = name + '.' + type
            storage = FileSystemStorage(BASE_DIR + '/static/images/team/')
            url = storage.save(file_name, content)
            logo_uri = '/static/images/team/' + url

            team = Teams.objects.create(name=name,
                                        club_state=club_state,
                                        logo_uri=logo_uri)

            fixtures = MatchesDashboard().set_fixtures(team)
            if fixtures:
                points_table = PointsDashboard().add_team(team)
                if points_table:
                    return Response({'result': "Created Successfully"}, 200)
                else:
                    return Response({'result': points_table.text}, 500)
            else:
                return Response({'result': fixtures.text}, 500)

        except Exception as e:
            return Response({'result': str(e)}, 500)


class PlayersDashboard(APIView):
    def get(self, request):
        try:
            team_id = request.GET.get('team_id',None)
            if team_id == 'null':
                players = Players.objects.all().values()
            else:
                players = Players.objects.filter(team_id=team_id).values()

            for player in players:
                player['team'] = Teams.objects.get(id=player['team_id']).name

            return Response(players, 200)
            # return render(request, 'playerDashboard.html', {'players': players})
        except Exception as e:
            return Response({'result': str(e)}, 500)

    def post(self, request):
        try:
            data = request.DATA
            first_name = data.get("first_name", None)
            last_name = data.get("last_name", None)
            jersey_number = int(data.get("jersey_number") or 0)
            country = data.get("country", None)
            matches = int(data.get("matches") or 0)
            runs = int(data.get("runs") or 0)
            player_id = data.get("player_id", None)

            if not player_id:
                team_id = int(data.get("team"))
                highest_runs = int(data.get("highest_runs") or 0)
                fifties = int(data.get("fifties") or 0)
                hundreds = int(data.get("hundreds") or 0)

                content, type = get_image(data.get("image_uri", None))
                file_name = first_name + '.' + type
                storage = FileSystemStorage(BASE_DIR + '/static/images/player/')
                url = storage.save(file_name, content)
                image_uri = '/static/images/player/' + url

                team_instance = Teams.objects.get(id=team_id)

                Players.objects.create(first_name=first_name,
                                       last_name=last_name,
                                       image_uri=image_uri,
                                       jersey_number=jersey_number,
                                       country=country,
                                       matches=matches,
                                       runs=runs,
                                       highest_runs=highest_runs,
                                       fifties=fifties,
                                       hundreds=hundreds,
                                       team_id=team_instance.id)
                return Response({'result': "Created Successfully"}, 200)
            else:
                player_data = Players.objects.filter(id=player_id)

                highest_runs = runs if runs > player_data[0].highest_runs else player_data[0].highest_runs
                updated_runs = player_data[0].runs + runs
                fifties = player_data[0].fifties
                hundreds = player_data[0].hundreds
                if 50 < runs < 100:
                    fifties += 1
                elif runs > 100:
                    hundreds += 1

                player_data.update(matches=matches,
                                   runs=updated_runs,
                                   highest_runs=highest_runs,
                                   fifties=fifties,
                                   hundreds=hundreds)
                return Response({'result': "Updated Successfully"}, 200)
        except Exception as e:
            return Response({'result': str(e)}, 500)


class MatchesDashboard(APIView):
    def get(self, request):
        try:
            matches = Matches.objects.all().values()

            for match in matches:
                match['team_one_name'] = Teams.objects.get(id=match['team_one_id']).name
                match['team_two_name'] = Teams.objects.get(id=match['team_two_id']).name

            return Response(matches, 200)
            # return render(request, 'matchesDashboard.html', {'matches': matches})
        except Exception as e:
            return Response({'result': str(e)}, 500)

    def post(self, request):
        try:
            data = request.DATA
            match_id = data.get("match_id")
            team_won = data.get("winner")

            result = PointsDashboard().update_points(match_id, team_won)

            if result:
                if not team_won == "tie":
                    team = Teams.objects.get(id=team_won)
                    Matches.objects.filter(id=match_id).update(winner=team.name)
                else:
                    Matches.objects.filter(id=match_id).update(winner="tie")

                return Response({'result': "Points updated"}, 200)
            else:
                return Response({'result': result.status_text}, 500)
        except Exception as e:
            return Response({'result': str(e)}, 500)

    @staticmethod
    def set_fixtures(team):
        try:
            exixting_teams = Teams.objects.exclude(id=team.id).values("id")

            new_team = Teams.objects.get(id=team.id)

            for exixting_team in exixting_teams:
                team_instance = Teams.objects.get(id=exixting_team['id'])

                Matches.objects.create(team_one_id=team_instance.id,
                                       team_two_id=new_team.id)

            return True

        except Exception as e:
            return Response({'result': str(e)}, 500)


class PointsDashboard(APIView):
    def get(self, request):
        try:
            teams_points = PointsTable.objects.all().values()

            for team_points in teams_points:
                team_points['team_name'] = Teams.objects.get(id=team_points['team_name_id']).name

            return Response(teams_points, 200)
            # return render(request, 'pointsDashboard.html', {'teams_points': teams_points})
        except Exception as e:
            return Response({'result': str(e)}, 500)

    @staticmethod
    def add_team(team):
        try:
            PointsTable.objects.create(team_name_id=team.id)
            return True
        except Exception as e:
            return Response({'result': str(e)}, 500)

    @staticmethod
    def update_points(match_id, team_won):
        try:
            match = Matches.objects.get(id=match_id)

            team_one = Teams.objects.get(id=match.team_one.id)
            team_two = Teams.objects.get(id=match.team_two.id)

            if team_won == "tie":
                team_one_data = PointsTable.objects.filter(team_name_id=team_one.id)
                updated_team_one_points = team_one_data[0].points + 1
                updated_team_one_total = team_one_data[0].total_matches + 1
                updated_team_one_won = team_one_data[0].tie_matches + 1
                team_one_data.update(points=updated_team_one_points,
                                     tie_matches=updated_team_one_won,
                                     total_matches=updated_team_one_total)

                team_two_data = PointsTable.objects.filter(team_name_id=team_two.id)
                updated_team_two_points = team_two_data[0].points + 1
                updated_team_two_total = team_two_data[0].total_matches + 1
                updated_team_two_won = team_two_data[0].tie_matches + 1
                team_two_data.update(points=updated_team_two_points,
                                     tie_matches=updated_team_two_won,
                                     total_matches=updated_team_two_total)
            else:
                if team_one.id == int(team_won):
                    winning_team, lost_team = team_one, team_two
                else:
                    winning_team, lost_team = team_two, team_one

                winning_team_data = PointsTable.objects.filter(team_name_id=winning_team.id)
                winning_updated_team_points = winning_team_data[0].points + 2
                winning_updated_team_total = winning_team_data[0].total_matches + 1
                winning_updated_team_won = winning_team_data[0].won_matches + 1
                winning_team_data.update(points=winning_updated_team_points,
                                         won_matches=winning_updated_team_won,
                                         total_matches=winning_updated_team_total)

                lost_team_data = PointsTable.objects.filter(team_name_id=lost_team.id)
                lost_updated_team_total = lost_team_data[0].total_matches + 1
                lost_updated_team_lost = lost_team_data[0].lost_matches + 1
                lost_team_data.update(lost_matches=lost_updated_team_lost,
                                      total_matches=lost_updated_team_total)

            return True
        except Exception as e:
            return Response({'result': str(e)}, 500)


def get_image(image):
    format, image_str = image.split(';base64,')
    content_type = format.split('/')[-1]
    data = ContentFile(base64.b64decode(image_str))
    return data, content_type