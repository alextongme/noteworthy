import { connect } from 'react-redux';
import React from 'react';
import { fetchNote, updateNote } from '../../../../../state/actions/note'
import NoteEditor from './NoteEditor'

class NoteEditorContainer extends React.Component {
    componentDidMount() {
        if(this.props.match.params.noteId) {
            let currentNote = this.props.match.params.noteId;
            this.props.fetchNote(currentNote);
        }
    }

    render() {
        const {action, note, match} = this.props;

        if(!note) {
            return(
                <NoteEditor
                    // when youre ready to create a note
                    // action={createNote}
                />
            )
        }
        
        return (
            <NoteEditor
                key={match.params.noteId}
                action={updateNote}
                note={note}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // debugger
    return {
        note: state.entities.notes[ownProps.match.params.noteId]
    }
}

const mapDispatchToProps = (dispatch) => {
    // debugger
    return {
        fetchNote: (noteId) => dispatch(fetchNote(noteId)),
        updateNote: (note) => dispatch(updateNote(note)),
        // createNote: (note) => dispatch(createNote(note))

    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
    // null,
    // {pure: false}
    )(NoteEditorContainer)