import React, {useEffect} from "react";
import {NavLink, useRouteMatch } from 'react-router-dom';
import ReactQuill from 'react-quill';
import * as ComUtil from '../../../utils/utils';

import { fetchNotebooks } from '../../../../../state/actions/notebook';
import { fetchNotes } from '../../../../../state/actions/note';

import { useSelector, useDispatch } from "react-redux";

const NotesNav = () => {
    const dispatch = useDispatch();
    const notebooks = useSelector(state => state.entities.notebooks);
    const notes = useSelector(state => state.entities.notes);
    const tags = useSelector(state => state.entities.tags);

    const match = useRouteMatch();
    let sortedNotes;
    let selectedNotes = [];
    let notebookName = "All notes";

    /// pick which notes you want, all notes or notes from a specific notebook
    if(Object.keys(notebooks).length === 0) {
        sortedNotes = <h2 className="universal__h2 notesNav__h2--noNotes">There are no notes to display. <br></br> Start by making a notebook!</h2>;
    } else {
        if(match.path === "/main/notes") {
            selectedNotes = Object.values(notes);
        } else if (match.path === "/main/notebooks/:notebookId/notes") {
            let notebook = notebooks[match.params.notebookId];
            notebookName = notebook.name;
            notebook.note_ids.forEach((id) => {
                selectedNotes.push(notes[id]);
            });
        } else if (match.path === "/main/tags/:tagId/notes") {
            let tag = tags[match.params.tagId];
            notebookName = tag.name;
            tag.note_ids.forEach((id) => {
                selectedNotes.push(notes[id]);
            });
        }

        sortedNotes = selectedNotes.sort((a,b) => {
            //     // sort by updated at
            return (a.updated_at > b.updated_at ? -1 : 1)}).map((note, idx) => {
                    let path;
                    // debugger
                    if(note) {
                        if(match.path === "/main/notes") {
                            path =`/main/notes/${note.id}`
                        } else if (match.path === "/main/notebooks/:notebookId/notes") {
                            path =`/main/notebooks/${match.params.notebookId}/notes/${note.id}`
                        } else if (match.path === "/main/tags/:tagId/notes") {
                            path =`/main/tags/${match.params.tagId}/notes/${note.id}`
                        }
                    }

                    return (
                        <div className="noteNav__LinkContainer" key={idx}>
                            <NavLink 
                                to={path} 
                                style={{ textDecoration: 'none' }} 
                                key={idx}
                                className="noteNavItem"
                                activeClassName="noteNavItem--active">
                                <h2 className="noteNavItem__title">{note.title}</h2>
                                
                                <div className="noteNavItem__bodyContainer">
                                <ReactQuill
                                    className="noteNavItem__quill"
                                    value={note.body}
                                    readOnly={true}
                                    theme={"bubble"} />

                                </div>
                                
                                <h3 className="noteNavItem__timestamp">Updated {ComUtil.time(note.updated_at)}</h3>
        
                            </NavLink>
                        </div>
                    );
                })
    }

    // debugger
    
    return (
        <div className="notesNav">
            <header className="notesNav__header universal__h2">
                {notebookName}
                <nav className="notesNav__navbar universal__h3">
                    <div className="notesNav__navbar--left">
                        {selectedNotes.length} notes
                    </div>
                </nav>
            </header>
            
            <section className="notesNav__indexSection">
                {sortedNotes}
            </section>
        </div>
    );
}

export default NotesNav;