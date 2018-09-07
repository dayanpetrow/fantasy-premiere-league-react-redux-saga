import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

export default function DreamTeam({ players, positions, teams }) {
  return (
    <div className="striped-dt">
      <div className="dt-row-head">
        <div className="dt-row__position">Pos</div>
        <div className="dt-row__full-name">Player</div>
        <div className="dt-row__points">Points</div>
        <div className="dt-row__minutes">Minutes</div>
        <div className="dt-row__ppg">PPG</div>
        <div className="dt-row__ppg">BPS</div>
      </div>
      {players
        .filter(element => element.in_dreamteam === true)
        .sort((a, b) => a.element_type - b.element_type)
        .map(player => {
          let full_name = `${player.first_name} ${player.second_name}`;
          let points = player.total_points;
          let minutes = player.minutes;
          let ppg = player.points_per_game;
          let position = positions[player.element_type - 1].singular_name_short;
          let bps = player.bps;
          let team = teams[player.team - 1].short_name;
          return (
            <div key={full_name} className="dt-row">
              <div className="dt-row__position">{position}</div>
              <div className="dt-row__full-name">
                <Link
                  to={`/players/${player.id}`}
                  className="player-fullname-link"
                >
                  {full_name}
                </Link>{" "}
                <span className="dt-row__team">
                  (
                  <Link
                    to={`/teams/${player.team}`}
                    className="player-fullname-link"
                  >
                    {team})
                  </Link>
                </span>
              </div>
              <div className="dt-row__points">{points} </div>
              <div className="dt-row__minutes">{minutes} </div>
              <div className="dt-row__ppg">{ppg} </div>
              <div className="dt-row__ppg">{bps} </div>
            </div>
          );
        })}
    </div>
  );
}
