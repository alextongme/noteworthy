import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from 'react-router-dom';
import { updateNote } from '../../../../../state/actions/note';
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
        dispatch(closeModal());
    };


    return (
        <div className="noteMoveModal">
            <h1 className="noteMoveModal__h1">Move note from "{currNotebook.name}" to:</h1>
            
            <section className="noteMoveModal__table">
                {Object.values(notebooks).map((notebook, idx) => {
                    if(notebook.id !== currNotebook.id) {
                        return (<div className="noteMoveModal__rows" key={idx} value={notebook.id} onClick={() => changeNotebook(notebook)}>{notebook.name}</div>);
                    }
                })}
            </section>

        </div>
    );
}

export default NoteMove;