import { connect } from 'react-redux';
import React from 'react';
import { updateNote, deleteNote } from '../../../../../state/actions/note';
import { createTag } from '../../../../../state/actions/tag';
import { openModal } from '../../../../../state/actions/modal';
import NoteEditor from './NoteEditor';
import {withRouter} from "react-router";

import NotesIntro from '../NotesIntro/NotesIntro'

class NoteEditorContainer extends React.Component {
    render() {
        const {notebooks, deleteNote, updateNote, moveNote, note, match, history, createTag} = this.props;
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
                    noteId={match.params.noteId}
                    moveNote={moveNote}
                    deleteNote={deleteNote}
                    updateNote={updateNote}
                    note={note}
                    notebook={notebook}
                    history = {history}
                    createTag={createTag}
                />
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        note: state.entities.notes[ownProps.match.params.noteId],
        notebooks: state.entities.notebooks,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // fetchNote: (note) => dispatch(fetchNote(note)),
        moveNote: () => dispatch(openModal("Move note")),
        updateNote: (note) => dispatch(updateNote(note)),
        deleteNote: (noteId) => dispatch(deleteNote(noteId)),
        createTag: (tag) => dispatch(createTag(tag))
    }
}

export default withRouter(connect(
    mapStateToProps, 
    mapDispatchToProps,
    )(NoteEditorContainer))