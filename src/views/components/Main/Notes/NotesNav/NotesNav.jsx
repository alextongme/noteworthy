import React from "react";
import {NavLink} from 'react-router-dom';
import ReactQuill, {Quill} from 'react-quill';

const NoteNav = ({notes}) => {
    // debugger
    
    const noteItems = notes.sort((a,b) => { 
        // sort by updated at
            return a.updated_at > b.updated_at ? -1 : 1; 
            }).map((note, idx) => {
            let title = note.title;
            if(title === "") {
                title = "Untitled"
            }
            return (
                <div className="noteNav__LinkContainer" key={idx}>
                <NavLink 
                    to={`/main/notes/${note.id}`} 
                    style={{ textDecoration: 'none' }} 
                    key={idx}
                    className="noteNavItem"
                    activeClassName="noteNavItem--active">
                
                    
                    <div className="noteNavItem__bodyContainer">
                        <h2 className="noteNavItem__title">
                        {title}
                        </h2>
                        <ReactQuill
                                className="noteNavItem__body"
                                value={note.body}
                                readOnly={true}
                                theme={"bubble"} />
                    </div>
                </NavLink>

                </div>
                
            );
    });
    
    return (
        <div className="notesNav">
            <header className="notesNav__header universal__h2">
                All notes
                <nav className="notesNav__navbar universal__h3">
                    <div className="notesNav__navbar--left">{notes.length} notes</div>
                    {/* <div className="notesNav__navbar--right">sort - filter</div> */}
                </nav>
            </header>
            
            <section className="notesNav__indexSection">
                {noteItems}
               
            </section>
        </div>
    );
}

export default NoteNav;