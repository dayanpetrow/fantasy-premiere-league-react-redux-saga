import React from "react";
import "./DreamTeam.css";

export default function DreamTeam({ players }) {
  return (
  players
    .filter(element => element.in_dreamteam === true)
    .sort((a, b) => a.element_type - b.element_type)
    .map(player => {
        let full_name = `${player.first_name} ${player.second_name}`;
        let points = player.total_points;
        let minutes = player.minutes;
        let ppg = player.points_per_game;
        return <div key={full_name}>{full_name} </div>;
        }
    )
  )
}
