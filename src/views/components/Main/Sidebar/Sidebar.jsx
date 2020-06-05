import React from "react";
import { NavLink } from 'react-router-dom';

const Sidebar = ({session, users, logout}) => {
    const currentUser = users[session];

    return (
        <div className="sidebar">

            <ul className="sidebar__listContainer">
                <div className="sidebar__userContainer">
                    <i class="fas fa-user-circle sidebar__userLogo" />
                    <h1 
                        className="sidebar__username">
                        {currentUser.first_name} {currentUser.last_name}
                    </h1>
                    <i 
                        className="fas fa-chevron-circle-right chevron-right--sidebar"></i>
                </div>
                                
                <input 
                    className="sidebar__search" 
                    placeholder="search" 
                />
                    {/* </div> */}
                <NavLink 
                    exact to="/main/notes"
                    className="sidebar__addContainer">
                        <img 
                            src={window.addButton} className="sidebar__button--add" 
                        />
                        <h1 
                            className="sidebar__add"
                        >
                            New note
                        </h1>
                </NavLink>
                <NavLink 
                    exact to="/main/notebooks" 
                    className="sidebar__navlink"
                    activeClassName="sidebar__navlink--active"
                >
                    Notebooks
                </NavLink>
                <NavLink 
                    exact to="/main/notes" 
                    className="sidebar__navlink" 
                    activeClassName="sidebar__navlink--active"
                >
                    Notes
                </NavLink>
            </ul>

            <li className="sidebar__navlink">
                    <button 
                        onClick={logout} 
                        className="sidebar__button--logout"
                    >
                        Logout
                    </button>
            </li>

        </div>
    );
}

export default Sidebar;