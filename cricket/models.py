from django.db import models

class Teams(models.Model):
    name = models.CharField(max_length=30)
    logo_uri = models.URLField()
    club_state = models.CharField(max_length=30)

    class Meta:
        db_table = "Teams"


class Players(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    image_uri = models.URLField()
    jersey_number = models.IntegerField()
    country = models.CharField(max_length=30)
    matches = models.IntegerField()
    runs = models.IntegerField()
    highest_runs = models.IntegerField()
    fifties = models.IntegerField()
    hundreds = models.IntegerField()
    team = models.ForeignKey("Teams")

    class Meta:
        db_table = "Players"


class Matches(models.Model):
    team_one = models.ForeignKey("Teams")
    team_two = models.ForeignKey("Teams", related_name="team1")
    winner = models.CharField(max_length=30, default=None, null=True)

    class Meta:
        db_table = "Matches"


class PointsTable(models.Model):
    team_name = models.ForeignKey("Teams")
    points = models.IntegerField(default=0)
    total_matches = models.IntegerField(default=0)
    won_matches = models.IntegerField(default=0)
    lost_matches = models.IntegerField(default=0)
    tie_matches = models.IntegerField(default=0)

    class Meta:
        db_table = "PointsTable"
