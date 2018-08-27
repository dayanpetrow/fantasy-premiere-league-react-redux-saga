import React from "react";
import { Link } from "react-router-dom";

export default function PlayersTableRow({ player, position, team }) {
  let full_name = `${player.first_name} ${player.second_name}`;
  let points = player.total_points;
  let minutes = player.minutes;
  let price = (player.now_cost * 0.1).toFixed(1);
  let bps = player.bps;
  let key = `${full_name}${minutes}${price}${bps}`
  let goals = player.goals_scored;
  let assists = player.assists;
  let cleanSheets = player.clean_sheets;
  let player_id = player.id;
  return (
    <div key={key} className="player-row">
      <div className="player-row__stats">{position}</div>
      <div className="player-row__full-name">
        <Link to={`/players/${player_id}`} className="player-fullname-link">
          {full_name}
        </Link>{" "}
        <span className="player-row__team">
          (
          <Link to={`/teams/${player.team}`} className="player-fullname-link">
            {team})
          </Link>
        </span>
      </div>
      <div className="player-row__stats">{price}m </div>
      <div className="player-row__stats">{points} </div>
      <div className="player-row__stats">{minutes} </div>
      <div className="player-row__stats">{bps} </div>
      <div className="player-row__stats">{goals} </div>
      <div className="player-row__stats">{assists} </div>
      <div className="player-row__stats">{cleanSheets} </div>
      <div className="player-row__button">
        <Link to={`/players/${player_id}`} className="player-info-button">
          Player info
        </Link>
      </div>
    </div>
  )
}
