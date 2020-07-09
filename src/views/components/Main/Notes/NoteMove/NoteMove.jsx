import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

const NoteMove = () => {
    const dispatch = useDispatch();
    const notebooks = useSelector(state => state.entities.notebooks);
    const notes = useSelector(state => state.entities.notes);
    const tags = useSelector(state => state.entities.tags);

    // debugger
    // useEffect(() => {
    //     // debugger
    //     dispatch(fetchNotebooks());
    //     // debugger
    //     dispatch(fetchNotes());
    //     // debugger
    // }, []);

    return (
        <div className="notebookForm">

        </div>
    );
}

export default NoteMove;