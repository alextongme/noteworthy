import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from 'react-router-dom';
import { fetchNotes, updateNote } from '../../../../../state/actions/note';
import { fetchNotebooks } from '../../../../../state/actions/notebook';
import { closeModal } from '../../../../../state/actions/modal';

const NoteMove = () => {
    const dispatch = useDispatch();
    const match = useRouteMatch("/main/notes/:noteId") || useRouteMatch("/main/notebooks/:notebookId/notes/:noteId");
   
    const notebooks = useSelector(state => state.entities.notebooks);
    const notes = useSelector(state => state.entities.notes);

    const currNote = notes[match.params.noteId];
    const currNotebook = notes[match.params.noteId].notebook;

    const changeNotebook = (notebook) => {
        currNote.notebook = notebook;
        
        dispatch(updateNote(currNote));
        dispatch(fetchNotes());
        dispatch(fetchNotebooks());
        dispatch(closeModal());
    };


    return (
        <div className="noteMoveModal">
            <div className="noteMoveModal__topContainer">
                <h2 className="universal__h2 notebookForm__h2--header">
                    Move note "{currNote.title}"
                </h2>
                <i className="fas fa-times-circle" onClick={() => dispatch(closeModal())} />
            </div>

            <h3 className="universal__h3">
                This note is currently in: "{currNotebook.name}". Where would you like to move it to?
            </h3>

            
            <section className="noteMoveModal__table">
                {Object.values(notebooks).map((notebook, idx) => {
                    if(notebook.id !== currNotebook.id) {
                        return (<div className="noteMoveModal__rows universal__h3" key={idx} value={notebook.id} onClick={() => changeNotebook(notebook)}>{notebook.name}</div>);
                    }
                })}
            </section>

        </div>
    );
}

export default NoteMove;