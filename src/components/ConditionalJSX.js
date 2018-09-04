import React from "react";
import { longArrowDown } from "react-icons-kit/fa/longArrowDown";
import { longArrowUp } from "react-icons-kit/fa/longArrowUp";
import { Icon } from "react-icons-kit";
import { UncontrolledTooltip } from "reactstrap";

/* green arrow if a player's price has increased
** since the start of the season, red if it has decreased 
** player_id is needed to associate the tooltip with the correct price */
export function getPriceChangeArrow(cost_change_start, player_id) {
  if (cost_change_start === 0) {
    return;
  } else if (cost_change_start > 0) {
    return (
      <span>
        <Icon
          size={"14px"}
          icon={longArrowUp}
          className="price-green-arrow"
          id={`price-${player_id}`}
        />
        <UncontrolledTooltip
          className="white-tooltip"
          placement="top"
          target={`price-${player_id}`}
        >
          +{(cost_change_start * 0.1).toFixed(1)}m
        </UncontrolledTooltip>
      </span>
    );
  } else {
    return (
      <span>
        <Icon
          size={"14px"}
          icon={longArrowDown}
          className="price-red-arrow"
          id={`price-${player_id}`}
        />
        <UncontrolledTooltip
          className="white-tooltip"
          placement="top"
          target={`price-${player_id}`}
        >
          {(cost_change_start * 0.1).toFixed(1)}m
        </UncontrolledTooltip>
      </span>
    );
  }
}

/* returns a class name depending on whether the game finished
** in a draw, loss or win */
export function getResultOutcomeClass(team_a_score, team_h_score, isHome) {
  if (team_a_score === team_h_score) {
    return "draw";
  } else if (isHome && team_h_score > team_a_score) {
    return "win";
  } else if (!isHome && team_h_score < team_a_score) {
    return "win";
  } else {
    return "loss";
  }
}