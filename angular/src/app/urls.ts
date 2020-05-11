import { environment } from './../environments/environment';


export class Urls {

    public static readonly TEAMS = environment.apiHostUrl + '/cricket/teams';
    public static readonly PLAYERS = environment.apiHostUrl + '/cricket/players';
    public static readonly MATCHES = environment.apiHostUrl + '/cricket/matches';
    public static readonly POINTS = environment.apiHostUrl + '/cricket/points-table';

}
