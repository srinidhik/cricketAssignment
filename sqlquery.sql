create database cricket;

create table cricket.Teams(
id INT AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
 logo_uri VARCHAR(500),
 club_state VARCHAR(30),
 PRIMARY KEY(id)
);

CREATE TABLE cricket.Players
(
 id INT AUTO_INCREMENT,
 first_name VARCHAR(30) NOT NULL,
 last_name VARCHAR(30) NOT NULL,
 image_uri VARCHAR(500),
 jersey_number INT NOT NULL,
 country VARCHAR(30) NOT NULL,
 matches INT DEFAULT 0,
 runs INT DEFAULT 0,
 highest_runs INT DEFAULT 0,
 fifties INT DEFAULT 0,
 hundreds INT DEFAULT 0,
 team_id INT,
 foreign key (team_id) references Teams(id) on delete cascade,
 PRIMARY KEY(id)
);

create table cricket.Matches(
id INT auto_increment,
team_one_id INT,
foreign key (team_one_id) references Teams(id) on delete cascade,
team_two_id INT,
foreign key (team_two_id) references Teams(id) on delete cascade,
winner VARCHAR(30) default null,
primary key(id)
);

create table cricket.PointsTable(
id INT auto_increment,
team_name_id INT,
foreign key (team_name_id) references Teams(id) on delete cascade,
points INT default 0,
total_matches INT default 0,
won_matches INT default 0,
lost_matches INT default 0,
tie_matches INT default 0,
 PRIMARY KEY(id)
);
