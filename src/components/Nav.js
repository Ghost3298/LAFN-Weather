import React from "react";
import './styles/Nav.css';

const Nav = () => {
    return(
        <ul className="NavList">
            <li><a href="/">Home</a></li>
            <li><a href="#">Predictions</a></li>
            <li><a href="/impact">Impact</a></li>
            <li><a href="#">History</a></li>
        </ul>
    )
}

export default Nav;