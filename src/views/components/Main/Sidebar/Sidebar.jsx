import React from "react";
import { NavLink } from 'react-router-dom';

const Sidebar = ({logout}) => {
    return (
        <div className="sidebar">
            <ul className="sidebar__listContainer">
                {/* <li className="sidebar__list"> */}
                    <NavLink 
                        to="/main/notebooks" 
                        className="sidebar__navlink"
                        activeClassName="sidebar__navlink--active">
                        Notebooks
                    </NavLink>
                {/* </li> */}
                {/* <li className="sidebar__list"> */}
                    <NavLink 
                        to="/main/notes" 
                        className="sidebar__navlink" activeClassName="sidebar__navlink--active">
                        Notes
                    </NavLink>
                {/* </li> */}
                <li className="sidebar__list">
                    <button onClick={logout}>logout</button>
                </li>
            </ul>


        </div>
    );
}

export default Sidebar;