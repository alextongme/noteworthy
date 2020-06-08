import React from "react";
import {NavLink} from 'react-router-dom';
import ReactQuill, {Quill} from 'react-quill';

const NoteNav = ({notes}) => {

    const noteItems = notes.map((note, idx) => {
        let title = note.title;
        if(title === "") {
            title = "Untitled"
        }
        return (
            <NavLink exact to={`/main/notes/${note.id}`} style={{ textDecoration: 'none' }} key={idx}>
                <li className="noteNavItem">
                    <h2 className="noteNavItem__title universal__h3">{title}</h2>
                    {/* <p className="noteNavItem__body">{note.body}</p> */}
                    <ReactQuill
                        className="noteNavItem__body"
                        value={note.body}
                        readOnly={true}
                        theme={"bubble"} />
                </li>
            </NavLink>
        );
    });
    
    return (
        <div className="notesNav">
            <header className="notesNav__header universal__h2">
                All notes
                <nav className="notesNav__navbar universal__h3">
                    <div className="notesNav__navbar--left">{notes.length} notes</div>
                    <div className="notesNav__navbar--right">sort - filter</div>
                </nav>
            </header>
            
            <section className="notesNav__indexSection">
                <ul>
                    {noteItems}
                </ul>
            </section>
        </div>
    );
}

export default NoteNav;