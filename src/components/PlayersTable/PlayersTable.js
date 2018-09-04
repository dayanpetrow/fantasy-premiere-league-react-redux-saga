import React from "react";
import "./PlayersTable.css";
import PlayersTableRow from "../PlayersTableRow/PlayersTableRow";

export default function PlayersTable({ data, positions, teams, results_count }) {
  return (
    <div className="column">
      <div className="block">
        <div className="striped-dt">
          <div className="player-row-head">
            <div className="player-row__stats">Pos</div>
            <div className="player-row__full-name">Player</div>
            <div className="player-row__stats">Price</div>
            <div className="player-row__stats">Points</div>
            <div className="player-row__stats">Minutes</div>
            <div className="player-row__stats">BPS</div>
            <div className="player-row__stats">Goals</div>
            <div className="player-row__stats">Assists</div>
            <div className="player-row__stats">CS</div>
            <div className="player-row__button">More...</div>
          </div>
          {data.length === 0 && <div className="data-not-found">Ooops, no players match the criteria!</div>}
          {data.slice(0, results_count).map(player => {
            let position =
              positions[player.element_type - 1].singular_name_short;
            let team = teams[player.team - 1].short_name;
            return (
              <PlayersTableRow
                key={`${team}${player.first_name}${player.second_name}`}
                player={player}
                position={position}
                team={team}
              />
            );
          })}
          
        </div>
      </div>
    </div>
  );
}
