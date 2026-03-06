import React from "react";
import {NavLink, useHistory} from "react-router-dom";
import { useDispatch } from "react-redux";
import * as ComUtil from '../../../utils/utils';
import { createNote, deleteNote } from '../../../../../state/actions/note';

const NoteItems = ({notebook, notes, users}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currUser = Object.values(users)[0];

    function handleCreateNote() {
        const note = { title: "Untitled", body: "", notebook_id: notebook.id };
        dispatch(createNote(note)).then((obj) => {
            history.push(`/main/notebooks/${notebook.id}/notes/${obj.note.id}`);
        });
    }

    function handleDeleteNote(e, noteId) {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteNote(noteId));
    }

    const noteItems = notebook.note_ids.map( (note_id, idx) => {
        const currNote = notes[note_id];
        if (!currNote) return null;

        let cssName;
        if(idx % 2 == 0) {
            cssName = "notebooks__tableRow notebookNoteItems__tableRow--even";
        } else {
            cssName = "notebooks__tableRow notebookNoteItems__tableRow--odd";
        }

        const time = () => {
            const timestamp = ComUtil.time(currNote.updated_at);
            return (timestamp)
        }

        return (
            <tr key={idx} className={cssName}>
                <td
                    className="notebooks__tableCol notebookNoteItems__tableCol">
                    <NavLink
                        to={`/main/notebooks/${notebook.id}/notes/${note_id}`}
                        className="notebookNoteItems__links">
                            {currNote.title}
                    </NavLink>
                </td>

                <td
                    className="notebooks__tableCol notebookNoteItems__tableCol">
                    {currUser.first_name} {currUser.last_name}
                </td>

                <td
                    className="notebooks__tableCol notebookNoteItems__tableCol">
                    {time()}
                </td>

                <td
                    className="notebooks__tableCol notebookNoteItems__tableCol">
                    Only you
                </td>

                <td
                    className="notebooks__tableCol notebookNoteItems__tableCol">
                    <i
                        className="fas fa-trash-alt notebookNoteItems__delete"
                        onClick={(e) => handleDeleteNote(e, note_id)}
                    />
                </td>
            </tr>
        );
    } )

    return (
        <>
            {noteItems}
            <tr className="notebooks__tableRow notebookNoteItems__tableRow--add">
                <td colSpan="5" className="notebooks__tableCol notebookNoteItems__addCol">
                    <button
                        className="notebookNoteItems__addButton"
                        onClick={handleCreateNote}>
                        <i className="fas fa-plus" /> Add note
                    </button>
                </td>
            </tr>
        </>
    );
}

export default NoteItems;
