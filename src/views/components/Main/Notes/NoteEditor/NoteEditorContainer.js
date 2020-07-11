import { connect } from 'react-redux';
import React from 'react';
import { updateNote, deleteNote } from '../../../../../state/actions/note';
import { openModal } from '../../../../../state/actions/modal';
import NoteEditor from './NoteEditor';
import {withRouter} from "react-router";

import NotesIntro from '../NotesIntro/NotesIntro'

class NoteEditorContainer extends React.Component {
    render() {
        const {notebooks, deleteNote, updateNote, moveNote, note, match, history} = this.props;
        // debugger
        if(note === undefined || Object.keys(notebooks).length === 0) {
            return (
                <NotesIntro />
            );
        }
        else {
            // debugger
            let notebook = notebooks[note.notebook.id];
            return (
                <NoteEditor
                    key={match.params.noteId}
                    moveNote={moveNote}
                    deleteNote={deleteNote}
                    updateNote={updateNote}
                    note={note}
                    notebook={notebook}
                    history = {history}
                />
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    // debugger
    return {
        note: state.entities.notes[ownProps.match.params.noteId],
        // how can i grab the notebook name without grabbing the entire slice of notebooks?
        notebooks: state.entities.notebooks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // fetchNote: (note) => dispatch(fetchNote(note)),
        moveNote: () => dispatch(openModal("Move note")),
        updateNote: (note) => dispatch(updateNote(note)),
        deleteNote: (noteId) => dispatch(deleteNote(noteId))
    }
}

export default withRouter(connect(
    mapStateToProps, 
    mapDispatchToProps,
    )(NoteEditorContainer))