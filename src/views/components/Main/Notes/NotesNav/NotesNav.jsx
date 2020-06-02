import React from "react";
import NoteNavItem from '../NoteNavItem/NoteNavItem'

const NoteNav = ({notes}) => {
    const noteItems = notes.map((note, idx) => {
        return (
            <NoteNavItem key={idx} note={note} />
        );
    });
    
    return (
        
        <div className="noteNav">
            <header className="noteNav__header">
                All notes
            </header>
            <nav className="noteNav__navbar">
                <div className="noteNav__navbar--l"># notes</div>
                <div className="noteNav__navbar--right">sort - filter</div>
            </nav>
            <section className="noteNav__indexSection">
                <ul>
                    {noteItems}
                </ul>
            </section>
        </div>
       
    );
}

export default NoteNav;