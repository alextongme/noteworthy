import React from "react";
import { NavLink } from 'react-router-dom';

const Sidebar = ({logout}) => {

    // const checkActive = (match, location) => {
    //     if(!location) return false;
    //     const {pathname} = location;
    //     console.log(pathname);
    //     return pathname === "/";
    // }

    return (
        <div className="sidebar">
            <ul className="sidebar__listContainer">
                {/* <li className="sidebar__list"> */}
                    <NavLink 
                        exact to="/main/notebooks" 
                        className="sidebar__navlink"
                        // activeClassName="sidebar__navlink--active"
                        // isActive={checkActive}
                        
                    >
                        Notebooks
                    </NavLink>
                {/* </li> */}
                {/* <li className="sidebar__list"> */}
                    <NavLink 
                        exact to="/main/notes" 
                        className="sidebar__navlink" 
                        // activeClassName="sidebar__navlink--active"
                        // isActive={checkActive}
                    >
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