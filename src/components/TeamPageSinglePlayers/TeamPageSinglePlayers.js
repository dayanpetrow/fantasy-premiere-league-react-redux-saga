import React from "react";
import { Link } from "react-router-dom";
import "./TeamPageSinglePlayers.css";
import { getPriceChangeArrow } from "../ConditionalJSX";

export default function TeamPageSinglePlayers({ players, position }) {
  return (
    <div className="block">
      <div className="block-header">
        <h3 className="block-header__title">{position}</h3>
      </div>
      <div className="content">
        <div className="striped-dt">
          <div className="player-row-head">
            <div className="player-row__full-name">Player</div>
            <div className="player-row__stats-team-page">Price</div>
            <div className="player-row__stats-team-page">Points</div>
            <div className="player-row__stats-team-page">Form</div>
            <div className="player-row__stats-team-page">Minutes</div>
            <div className="player-row__button">More...</div>
          </div>
          {players
            .sort((a, b) => b.total_points - a.total_points)
            .map(player => {
              let full_name = `${player.first_name} ${player.second_name}`;
              let points = player.total_points;
              let minutes = player.minutes;
              let form = player.form;
              let price = (player.now_cost * 0.1).toFixed(1);
              let key = `${full_name}${minutes}${price}`;
              let player_id = player.id;
              let price_change = player.cost_change_start;
              return (
                <div key={key} className="player-row">
                  <div className="player-row__full-name">
                    <Link
                      to={`/players/${player_id}`}
                      className="player-fullname-link"
                    >
                      {full_name}
                    </Link>{" "}
                  </div>
                  <div className="player-row__stats-team-page">
                    {price}m {getPriceChangeArrow(price_change, player_id)}
                  </div>
                  <div className="player-row__stats-team-page">{points} </div>
                  <div className="player-row__stats-team-page">{form} </div>
                  <div className="player-row__stats-team-page">{minutes} </div>
                  <div className="player-row__button">
                    <Link
                      to={`/players/${player_id}`}
                      className="player-info-button"
                    >
                      Player info
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
