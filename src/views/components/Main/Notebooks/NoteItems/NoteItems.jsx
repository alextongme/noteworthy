import React from "react";
import {NavLink} from "react-router-dom";
import * as ComUtil from '../../../utils/utils';

const NoteItems = ({notebook, notes, users}) => {
    // debugger
    const noteItems = notebook.note_ids.map( (note_id, idx) => {
        // let className;
        // if(idx % 2 == 0) {
        //     className = "notebooks__tableRow notebooks__tableRow--even";
        // } else {
        //     className = "notebooks__tableRow notebooks__tableRow--odd";
        // }
        // const currUser = users[Object.keys(users)[0]];
        const currUser = Object.values(users)[0];
        // debugger
        const currNote = notes[note_id];
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
                        // to={`/main/notebooks/${notebook.id}/notes`}
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
                    {/* <i className="fas fa-running" /> */}
                </td>
            </tr>
        );
    } )

    return (
        <>
            {noteItems}
        </>
    );
}

export default NoteItems;