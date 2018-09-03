import React from "react";
import "./Loader.css";
import { Icon } from "react-icons-kit";
import { spinner10 } from "react-icons-kit/icomoon/spinner10";

export default function Loader() {
  return (
    <div className="sk-cube-grid">
      <div className="sk-cube sk-cube1" />
      <div className="sk-cube sk-cube2" />
      <div className="sk-cube sk-cube3" />
      <div className="sk-cube sk-cube4" />
      <div className="sk-cube sk-cube5" />
      <div className="sk-cube sk-cube6" />
      <div className="sk-cube sk-cube7" />
      <div className="sk-cube sk-cube8" />
      <div className="sk-cube sk-cube9" />
    </div>
  );
}

/*
<div classNameName="loader">
  <Icon size={"64px"} icon={spinner10} classNameName="loader__icon" />
  <h1 classNameName="loader__text">Loading...</h1>
</div>
*/
