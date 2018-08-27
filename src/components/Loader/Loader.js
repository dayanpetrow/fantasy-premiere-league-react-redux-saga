import React from "react";
import "./Loader.css";
import { Icon } from "react-icons-kit";
import { spinner10 } from "react-icons-kit/icomoon/spinner10";

export default function Loader() {
  return (
    <div className="loader">
      <Icon size={"64px"} icon={spinner10} className="loader__icon" />
      <h1 className="loader__text">Loading...</h1>
    </div>
  );
}
