import React from "react";
import "./Menu.css";

let logo2 = require("../../assets/logo.png")
const Menu:React.FC = (): JSX.Element => {
  return (
    <div className="wrapper">
      <ul className="nav-area">
        <li className="nav-area-item"><img className="img-area" src={logo2} alt="1"/></li>
        <li className="nav-area-item ">Star Wars</li>
        <li className="nav-area-item">Home</li>
        <li className="nav-area-item">About</li>
        <li className="nav-area-item">Logout</li>
      </ul>
    </div>
  );
};

export default Menu;
