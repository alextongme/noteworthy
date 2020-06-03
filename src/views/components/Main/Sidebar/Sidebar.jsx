import React from "react";
import { NavLink } from 'react-router-dom';

const Sidebar = ({session, users, logout}) => {
    const currentUser = users[session];

    return (
        <div className="sidebar">
            <ul className="sidebar__listContainer">
                    <div className="sidebar__userContainer">
                        <img 
                            src={window.userLogo} 
                            className="sidebar__userLogo"
                        />
                        <h1 
                            className="sidebar__username">
                            {currentUser.first_name} {currentUser.last_name}
                        </h1>
                        <i 
                            className="fas fa-chevron-circle-right"></i>
                    </div>
                    <div className="sidebar__searchContainer">
                        <input 
                            className="sidebar__search" 
                            placeholder="search" 
                        />
                    </div>
                    <NavLink 
                        exact to="/main/notes"
                        className="sidebar__addContainer">
                            <img 
                                src={window.addButton} className="sidebar__button--add" 
                            />
                            <h1 
                                className="sidebar__add"
                            >
                                new note
                            </h1>
                    </NavLink>
                    <NavLink 
                        exact to="/main/notebooks" 
                        className="sidebar__navlink"
                        activeClassName="sidebar__navlink--active"
                    >
                        notebooks
                    </NavLink>
                    <NavLink 
                        exact to="/main/notes" 
                        className="sidebar__navlink" 
                        activeClassName="sidebar__navlink--active"
                    >
                        notes
                    </NavLink>
                <li className="sidebar__navlink">
                    <button 
                        onClick={logout} 
                        className="sidebar__button--logout"
                    >logout</button>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;