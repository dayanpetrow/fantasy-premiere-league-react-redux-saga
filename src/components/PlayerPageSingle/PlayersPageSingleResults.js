import React from "react";
import { Link } from "react-router-dom";
import { getPriceChangeArrow } from "../ConditionalJSX";
import * as tabs from "../../constants/tabs";

export default function PlayersPageSingleStats({
  player_data,
  tabToDisplay,
  switchTab,
  teams
}) {
  return (
    <div className="block">
      <div className="block-header">
        <h3 className="block-header__title">
          {tabToDisplay === tabs.HISTORY_TAB ? (
            "History"
          ) : (
            <a
              href="javascript:void()"
              onClick={e => switchTab(e, tabs.HISTORY_TAB)}
              className="tab-link"
            >
              History
            </a>
          )}
          {" / "}
          {tabToDisplay === tabs.FIXTURES_TAB ? (
            "Fixtures"
          ) : (
            <a
              href="javascript:void()"
              onClick={e => switchTab(e, tabs.FIXTURES_TAB)}
              className="tab-link"
            >
              Fixtures
            </a>
          )}
        </h3>
      </div>
      {tabToDisplay === tabs.HISTORY_TAB && (
        <div className="history-tab-wrapper">
          <div className="flexbox-table__content-title">
            <h3>This season</h3>
          </div>
          <div className="content">
            <div className="striped-dt">
              <div className="flexbox-table__head">
                <div className="flexbox-table__col-7">GW</div>
                <div className="flexbox-table__col-17">Opponent</div>
                <div className="flexbox-table__col-7">Minutes</div>
                <div className="flexbox-table__col-7">Points</div>
                <div className="flexbox-table__col-7">Goals</div>
                <div className="flexbox-table__col-7">Assists</div>
                <div className="flexbox-table__col-7">CS</div>
                <div className="flexbox-table__col-7">Y/R</div>
                <div className="flexbox-table__col-7">Saves</div>
                <div className="flexbox-table__col-7">Bonus</div>
                <div className="flexbox-table__col-7">Price</div>
                <div className="flexbox-table__col-fill">Full stats</div>
              </div>
              {player_data.history.map(result => {
                return (
                  <div
                    key={result.id}
                    className="flexbox-table__row"
                  >
                    <div className="flexbox-table__col-7">
                      GW
                      {result.round}
                    </div>
                    <div className="flexbox-table__col-17">
                      {teams[result.opponent_team - 1].short_name}{" "}
                      {result.was_home ? "(H)" : "(A)"} {result.team_h_score} -{" "}
                      {result.team_a_score}
                    </div>
                    <div className="flexbox-table__col-7">
                      {result.minutes}
                    </div>
                    <div className="flexbox-table__col-7">
                      {result.total_points}
                    </div>
                    <div className="flexbox-table__col-7">
                      {result.goals_scored}
                    </div>
                    <div className="flexbox-table__col-7">
                      {result.assists}
                    </div>
                    <div className="flexbox-table__col-7">
                      {result.clean_sheets}
                    </div>
                    <div className="flexbox-table__col-7">
                      {result.yellow_cards}/{result.red_cards}
                    </div>
                    <div className="flexbox-table__col-7">
                      {result.saves}
                    </div>
                    <div className="flexbox-table__col-7">
                      {result.bonus} ({result.bps})
                    </div>
                    <div className="flexbox-table__col-7">
                      {(result.value * 0.1).toFixed(1)}m
                    </div>
                    <div className="flexbox-table__col-fill">
                      Full stats
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flexbox-table__content-title">
            <h3>Previous seasons</h3>
          </div>
          <div className="content">
            <div className="striped-dt">
              <div className="flexbox-table__head">
                <div className="flexbox-table__col-13">Season</div>
                <div className="flexbox-table__col-7">Points</div>
                <div className="flexbox-table__col-7">Minutes</div>
                <div className="flexbox-table__col-7">Goals</div>
                <div className="flexbox-table__col-7">Assists</div>
                <div className="flexbox-table__col-7">Y/C</div>
                <div className="flexbox-table__col-7">CS</div>
                <div className="flexbox-table__col-7">I</div>
                <div className="flexbox-table__col-7">C</div>
                <div className="flexbox-table__col-7">T</div>
                <div className="flexbox-table__col-10">Start cost</div>
                <div className="flexbox-table__col-10">End cost</div>
              </div>
              {player_data.history_past.map(season => {
                return (
                  <div
                    key={season.id}
                    className="flexbox-table__row"
                  >
                    <div className="flexbox-table__col-13">
                      {season.season_name}
                    </div>
                    <div className="flexbox-table__col-7">
                      {season.total_points}
                    </div>
                    <div className="flexbox-table__col-7">
                      {season.minutes}
                    </div>
                    <div className="flexbox-table__col-7">
                      {season.goals_scored}
                    </div>
                    <div className="flexbox-table__col-7">
                      {season.assists}
                    </div>
                    <div className="flexbox-table__col-7">
                      {season.yellow_cards}/{season.red_cards}
                    </div>
                    <div className="flexbox-table__col-7">
                      {season.clean_sheets}
                    </div>
                    <div className="flexbox-table__col-7">
                      {season.influence}
                    </div>
                    <div className="flexbox-table__col-7">
                      {season.creativity}
                    </div>
                    <div className="flexbox-table__col-7">
                      {season.threat}
                    </div>
                    <div className="flexbox-table__col-10">
                      {(season.start_cost * 0.1).toFixed(1)}m
                    </div>
                    <div className="flexbox-table__col-10">
                      {(season.end_cost * 0.1).toFixed(1)}m
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {tabToDisplay === tabs.FIXTURES_TAB && (
        <div className="content">
          <div className="striped-dt">
            <div className="flexbox-table__head">
              <div className="flexbox-table__col-25">Date</div>
              <div className="flexbox-table__col-13">Gameweek</div>
              <div className="flexbox-table__col-40">Opponent</div>
              <div className="flexbox-table__col-fill">Difficulty</div>
            </div>
            {player_data.fixtures.map(fixture => {
              return (
                <div
                  key={fixture.id}
                  className="flexbox-table__row"
                >
                  <div className="flexbox-table__col-25">
                    {fixture.kickoff_time_formatted}
                  </div>
                  <div className="flexbox-table__col-13">
                    {fixture.event}
                  </div>
                  <div className="flexbox-table__col-40">
                    {fixture.opponent_name} {fixture.is_home ? "(H)" : "(A)"}
                  </div>
                  <div className="flexbox-table__col-fill">
                    <span
                      className={`player-fixture-difficulty-${fixture.difficulty}`}
                    >
                      {fixture.difficulty}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
