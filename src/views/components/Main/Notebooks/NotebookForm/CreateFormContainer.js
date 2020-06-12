import { connect } from 'react-redux';
// import React from 'react';
import { createNotebook, updateDefaultNotebook } from '../../../../../state/actions/notebook';
import { closeModal } from '../../../../../state/actions/modal';
import NotebookForm from './NotebookForm';

const mapStateToProps = (state) => {
    return {
        notebook: {
            name: "",
        },
        formType: "Create New Notebook",
        notebooks: Object.values(state.entities.notebooks)
    }
}

const mapDispatchToProps = (dispatch) => {
    // debugger
    return {
        action: (notebook) => dispatch(createNotebook(notebook)),
        closeModal: () => dispatch(closeModal()),
        updateDefaultNotebook: (notebookId) => dispatch(updateDefaultNotebook(notebookId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookForm)