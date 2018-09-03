import React from "react";
import "./TeamsTable.css";
import { Link } from "react-router-dom";

export default function TeamsTable({ teams }) {
  return (
    <div className="column">
      <div className="block">
        <div className="striped-dt">
          <div className="teams-row-head">
            <div className="teams-row__name">Team</div>
            <div className="teams-row__fixture">Next Fixture</div>
            <div className="teams-row__stats">Strength</div>
            <div className="teams-row__stats">Attack (H/A)</div>
            <div className="teams-row__stats">Defence (H/A)</div>
            <div className="teams-row__button">More...</div>
          </div>
          {teams.map(team => {
            let opponent = teams[team.next_event_fixture[0].opponent-1]
            return (
              <div key={team.id} className="teams-row">
                <div className="teams-row__name">
                  <Link to={`/teams/${team.id}`} className="teams-link"> {team.name} ({team.short_name}) </Link>
                </div>
                <div className="teams-row__fixture">
                <span className={`team-strength-${opponent.strength}`}>
                    {opponent.name} ({opponent.short_name}) 
                    </span>
                    </div>
                <div className="teams-row__stats">
                    <span className={`team-strength-${team.strength}`}>
                        {team.strength}
                    </span>
                </div>
                <div className="teams-row__stats">{team.strength_attack_home}/{team.strength_attack_away}</div>
                <div className="teams-row__stats">{team.strength_defence_home}/{team.strength_defence_away}</div>
                <div className="teams-row__button">
                  <Link to={`/teams/${team.id}`} className="teams-info-button">
                    Team info
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
