import React from "react";
import "./NextFixtures.css";

export default function NextFixtures({ fixtures, teams }) {
  return fixtures.map(fixture => {
    let team_a = teams[fixture.team_a - 1].name;
    let team_h = teams[fixture.team_h - 1].name;
    let key = `${team_a}${team_h}`;
    return (
      <div key={key} className="fixture-row">
        <div className="fixture-row__team-left">{team_a}</div>
        <div className="fixture-row__time">
            <span className="fixture-row__time__text">
          {fixture.kickoff_time_formatted}
          </span>
        </div>
        <div className="fixture-row__team-right">{team_h}</div>
      </div>
    );
  })
}
