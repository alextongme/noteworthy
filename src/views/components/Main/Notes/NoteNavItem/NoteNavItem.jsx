import React from "react";
import { NavLink } from 'react-router-dom';

const NoteNavItem = ({ note }) => {
    return (
        <NavLink to={`/main/notes/${note.id}/edit`} style={{ textDecoration: 'none' }} >
            <li className="noteNavItem">
            <h1 className="noteNavItem__title">{note.title}</h1>
            <p className="noteNavItem__body">{note.body}</p>
            </li>
        </NavLink>
    );
}

export default NoteNavItem;