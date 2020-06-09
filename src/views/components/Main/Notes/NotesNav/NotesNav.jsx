import React from "react";
import {NavLink} from 'react-router-dom';
import ReactQuill from 'react-quill';
import * as ComUtil from '../../../utils/utils';

const NoteNav = (props) => {
    // debugger
    let noteItems;
    let notes = [];
    let notebookName = "All notes";

    if(Object.keys(props.notes).length === 0) {
        noteItems = <div></div>;
    } else {
        if(props.match.path === "/main/notes") {
            // debugger
            notes = Object.values(props.notes);
        } 
        else if (props.match.path === "/main/notebooks/:notebookId/notes") {
            // debugger
            const notebookId = Number(props.match.params.notebookId);
            let notebook = props.notebooks[notebookId];
            if(notebook !== undefined) {
                notebookName = notebook.name;
                let noteIds = notebook.note_ids;
                [props.match.params.notebookId].note_ids;
                // debugger
                noteIds.forEach((id) => {
                    notes.push(props.notes[id]);
                });
            }
            // debugger
        }

        // debugger
        noteItems = notes.sort((a,b) => {
            // sort by updated at
            

            return (a.updated_at > b.updated_at ? -1 : 1)})
            .map((note, idx) => {
            let path;
            if(notebookName === "All notes") {
                path =`/main/notes/${note.id}`
            } else {
                path =`/main/notebooks/${props.match.params.notebookId}/notes/${note.id}`
            }

            let title = note.title;
            if(title === "") {
                title = "Untitled"
            }

            // debugger

                return (
                    // <div className="noteNav__LinkContainer" key={idx}>
                        <NavLink 
                            to={path} 
                            style={{ textDecoration: 'none' }} 
                            key={idx}
                            className="noteNavItem"
                            activeClassName="noteNavItem--active"
                            // activeStyle={{ backgroundColor: 'red' }}>
                            >
                            
                            {/* <div className="noteNavItem__bodyContainer"> */}
                                <h2 className="noteNavItem__title">
                                {title}</h2>
                                
                                <ReactQuill
                                className="noteNavItem__quill"
                                value={note.body}
                                readOnly={true}
                                theme={"bubble"} />
                                
                                <h3 className="noteNavItem__timestamp">Updated {ComUtil.time(note.updated_at)}</h3>
                            {/* </div> */}

                        </NavLink>
                    // </div>
                    
                );
            });
        }
    
    
    return (
        <div className="notesNav">
            <header className="notesNav__header universal__h2">
                {notebookName}
                <nav className="notesNav__navbar universal__h3">
                    <div className="notesNav__navbar--left">
                    {notes.length} notes</div>

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