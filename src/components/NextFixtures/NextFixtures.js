import React from "react";
import "./NextFixtures.css";
import { Link } from "react-router-dom";

export default function NextFixtures({ fixtures, teams }) {
  return fixtures.map(fixture => {
    let team_a = teams[fixture.team_a - 1];
    let team_h = teams[fixture.team_h - 1];
    let key = `${team_a.name}${team_h.name}`;
    return (
      <div key={key} className="fixture-row">
        <div className="fixture-row__team-left">
          <Link to={`/teams/${team_h.id}`} className="teams-link">
            {" "}
            {team_h.name} ({team_h.short_name}){" "}
          </Link>
        </div>
        <div className="fixture-row__time">
          <span className="fixture-row__time__text">
            {fixture.kickoff_time_formatted}
          </span>
        </div>
        <div className="fixture-row__team-right">
          <Link to={`/teams/${team_a.id}`} className="teams-link">
            {" "}
            {team_a.name} ({team_a.short_name}){" "}
          </Link>
        </div>
      </div>
    );
  });
}
