import React from "react";
import Loader from "../Loader/Loader";
import "./TeamPageSingleFixtures.css";
import { Link } from "react-router-dom";

function getResultBackground(team_a_score, team_h_score, isHome) {
  if(team_a_score === team_h_score) {
    return 'draw'
  } else if(isHome && team_h_score > team_a_score) {
    return 'win'
  } else if(!isHome && team_h_score < team_a_score) {
    return 'win'
  } else {
    return 'loss'
  }
}

export default function TeamPageSingleFixtures({ data, teams }) {
  console.log(data);
  return (
    <div>
      <div className="block">
        <div className="block-header">
          <h3 className="block-header__title">Season Results</h3>
        </div>
        <div className="content">
          {data.history.map(result => {
            let team_a_score = result.team_a_score
            let team_h_score = result.team_h_score
            let isHome = result.was_home
            let key = result.kickoff_time_formatted
            let opponent = teams[result.opponent_team-1].name
            return (
              <div key={key} className="result-row">
                <div className="result-row__time">
                  {result.kickoff_time_formatted}
                </div>
                <div className="result-row__result">
                  <span className={`result-row__result__text ${getResultBackground(team_a_score, team_h_score, isHome)}`}>
                    {team_h_score} - {team_a_score} {isHome ? "(H)" : "(A)"}
                  </span>
                </div>
                <div className="result-row__team-right">{opponent}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="block">
        <div className="block-header">
          <h3 className="block-header__title">Season Fixtures</h3>
        </div>
        <div className="content">
        {data.fixtures.map(fixture => {
            let isHome = fixture.was_home
            let key = fixture.kickoff_time_formatted
            let opponent = teams.find(team => team.name === fixture.opponent_name )
            return (
              <div key={key} className="team-fixture-row">
                <div
                    className={`team-fixture-box difficulty-${fixture.difficulty}`}
                  />
                <div className="team-fixture-row__time">
                  {fixture.kickoff_time_formatted} (GW{fixture.event})
                </div>
                <div className="team-fixture-row__team-right">
                <Link to={`/teams/${opponent.id}`} className="teams-link">
                {fixture.opponent_name}
                  </Link> {isHome ? "(H)" : "(A)"}</div>
              </div>
            );
          })}
        
        </div>
      </div>
    </div>
  );
}
