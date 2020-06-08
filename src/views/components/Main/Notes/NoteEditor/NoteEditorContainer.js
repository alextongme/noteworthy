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
        const {updateNote, note, match} = this.props;

        if(!note) {
            return(
                <NoteEditor
                    // when youre ready to create a note
                    // action={createNote}
                    key={match.params.noteId}
                    updateNote={updateNote}
                    
                />
            )
        }
        
        return (
            <NoteEditor
                key={match.params.noteId}
                updateNote={updateNote}
                note={note}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        note: state.entities.notes[ownProps.match.params.noteId]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNote: (note) => dispatch(fetchNote(note)),
        updateNote: (note) => dispatch(updateNote(note))
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
    )(NoteEditorContainer)