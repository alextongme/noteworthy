import { connect } from 'react-redux';
import React from 'react';
import { fetchNote, updateNote } from '../../../../../state/actions/note'
import NoteEditor from './NoteEditor'

class NoteEditorContainer extends React.Component {
    componentDidMount() {
        // debugger
        // this.props;
        let currentNote = this.props.match.params.noteId;
        this.props.fetchNote(currentNote);
        // debugger
    }

    render() {
        const {action, note} = this.props;

        if(!note) return null;
        
        return (
            <NoteEditor
                action={action}
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
        action: (note) => dispatch(updateNote(note)),
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
    null,
    {pure: false}
    )(NoteEditorContainer)