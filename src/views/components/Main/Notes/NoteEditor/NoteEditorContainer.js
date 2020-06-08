import { connect } from 'react-redux';
import React from 'react';
import { fetchNote, updateNote } from '../../../../../state/actions/note'
import NoteEditor from './NoteEditor'

class NoteEditorContainer extends React.Component {
    render() {
        const {notebooks, updateNote, note, match} = this.props;
        
        if(!note) {
            return (null);
        }
        else {
            const notebookName = notebooks[note.notebook_ids[0]].name;
            return (
                <NoteEditor
                    key={match.params.noteId}
                    updateNote={updateNote}
                    note={note}
                    notebookName={notebookName}
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
        updateNote: (note) => dispatch(updateNote(note))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
    )(NoteEditorContainer)