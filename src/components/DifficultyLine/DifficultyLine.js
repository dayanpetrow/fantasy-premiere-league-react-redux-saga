import React from "react";
import "./DifficultyLine.css";
import { UncontrolledTooltip } from "reactstrap";

export default function DifficultyLine({ data, toggle, isOpen }) {
  return (
    <div className="difficulty-line">
      {data.fixtures.map(fixture => {
        return (
          <div>
            <div
              key={fixture.id}
              id={`fixture-box-${fixture.id}`}
              className={`fixture-box difficulty-${fixture.difficulty}`}
            />
            <UncontrolledTooltip
              className="white-tooltip"
              placement="top"
              target={`fixture-box-${fixture.id}`}
            >
              {fixture.kickoff_time_formatted} {fixture.is_home ? '(H)' : '(A)'} {fixture.opponent_name}
            </UncontrolledTooltip>
          </div>
        );
      })}
    </div>
  );
}
