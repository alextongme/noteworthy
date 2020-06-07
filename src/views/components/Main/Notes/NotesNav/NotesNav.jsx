import React from "react";
import {NavLink} from 'react-router-dom';

const NoteNav = ({notes}) => {

    const noteItems = notes.map((note, idx) => {
        return (
            <NavLink exact to={`/main/notes/${note.id}`} style={{ textDecoration: 'none' }} key={idx}>
                <li className="noteNavItem">
                    <h1 className="noteNavItem__title">{note.title}</h1>
                    <p className="noteNavItem__body">{note.body}</p>
                </li>
            </NavLink>
        );
    });
    
    return (
        <div className="notesNav">
            <header className="notesNav__header">
                All notes
            </header>
            <nav className="notesNav__navbar">
                <div className="notesNav__navbar--l"># notes</div>
                <div className="notesNav__navbar--right">sort - filter</div>
            </nav>
            <section className="notesNav__indexSection">
                <ul>
                    {noteItems}
                </ul>
            </section>
        </div>
    );
}

export default NoteNav;