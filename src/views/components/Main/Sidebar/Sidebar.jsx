import React from "react";
import { NavLink } from 'react-router-dom';

const Sidebar = ({logout}) => {
    return (
        <div className="sidebar">
            <NavLink to="/main/notebooks">Notebooks</NavLink>
            <NavLink to="/main/notes">Notes</NavLink>

            <button onClick={logout}>logout</button>

        </div>
    );
}

export default Sidebar;