import React from "react";
import NoteNavItem from '../NoteNavItem/NoteNavItem'

const NoteNav = ({notes}) => {
    const noteItems = notes.map((note, idx) => {
        return (
            <NoteNavItem key={idx} note={note} />
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