import React from "react";
import "./PlayerPageSingle.css";
import { getPriceChangeArrow } from "../ConditionalJSX";

export default function PlayerPageSingleOverall({ data, position }) {
  let price = (data.now_cost * 0.1).toFixed(1);
  let price_change = data.cost_change_start;
  let photo = data.photo.replace(/\D/g,'');

  return (
    <div className="block">
      <div className="block-header">
        <h3 className="block-header__title">Overall Data</h3>
      </div>
      <div className="content">
        {data.news !== "" && (
          <div className="overall-data-news">{data.news}</div>
        )}
        <div className="overall-data-picture">
          <div className="picture">
            <img src={`https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/p${photo}.png`} 
              alt={`${data.first_name} ${data.second_name}`} />
            <div>Squad number: {data.squad_number} ({position})</div>
          </div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">Total score:</div>
          <div className="overall-data-row__value">
            {data.total_points} ({data.points_per_game} ppg)
          </div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">Form:</div>
          <div className="overall-data-row__value">{data.form}</div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">Price:</div>
          <div className="overall-data-row__value">
            {price}m {getPriceChangeArrow(price_change, data.id)}
          </div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">Selected by:</div>
          <div className="overall-data-row__value">
            {data.selected_by_percent}%
          </div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">Round score:</div>
          <div className="overall-data-row__value">{data.event_points}</div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">Goals scored:</div>
          <div className="overall-data-row__value">{data.goals_scored}</div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">Assists:</div>
          <div className="overall-data-row__value">{data.assists}</div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">Clean sheets:</div>
          <div className="overall-data-row__value">{data.clean_sheets}</div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">Bonus Points:</div>
          <div className="overall-data-row__value">
            {data.bonus} ({data.bps} BPS)
          </div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">Influence:</div>
          <div className="overall-data-row__value">{data.influence}</div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">Creativity:</div>
          <div className="overall-data-row__value">{data.creativity}</div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">Threat:</div>
          <div className="overall-data-row__value">{data.threat}</div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">In Dream Team:</div>
          <div className="overall-data-row__value">
            {data.dreamteam_count}{" "}
            {data.dreamteam_count === 1 ? "time" : "times"}
          </div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">Yellow/Red cards:</div>
          <div className="overall-data-row__value">
            {data.yellow_cards}/{data.red_cards}
          </div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">Penalties missed</div>
          <div className="overall-data-row__value">{data.penalties_missed}</div>
        </div>
        {(data.element_type === 1 || data.penalties_saved !== 0) && (
          <div className="overall-data-row">
            <div className="overall-data-row__label">Penalties saved</div>
            <div className="overall-data-row__value">
              {data.penalties_saved}
            </div>
          </div>
        )}
        <div className="overall-data-row">
          <div className="overall-data-row__label">Transfers in</div>
          <div className="overall-data-row__value">{data.transfers_in}</div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">Transfers in (round)</div>
          <div className="overall-data-row__value">
            {data.transfers_in_event}
          </div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">Transfers out</div>
          <div className="overall-data-row__value">{data.transfers_out}</div>
        </div>
        <div className="overall-data-row">
          <div className="overall-data-row__label">Transfers out (round)</div>
          <div className="overall-data-row__value">
            {data.transfers_out_event}
          </div>
        </div>
      </div>
    </div>
  );
}
