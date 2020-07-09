import { connect } from 'react-redux';
import React from 'react';

import {withRouter} from 'react-router';

class NoteMove extends React.Component {

    render() {
        const {moveNote, formType, note, closeModal} = this.props;

        if(!note) return null;
        
        return (
            <NotebookForm
                action={moveNote}
                formType={formType}
                note={note}
                closeModal={closeModal}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // debugger
    return {
        note: state.entities.note[state.ui.dropdown.noteId],
        formType: "Move note"
    }
}

const mapDispatchToProps = (dispatch) => {
    // debugger
    return {
        // fetchNotebook: (notebookId) => dispatch(fetchNotebook(notebookId)),
        moveNote: (note) => dispatch(moveNote(note)),
        closeModal: () => dispatch(closeModal())
    }
}

export default withRouter(connect(
mapStateToProps, 
mapDispatchToProps,
)(NoteMove))