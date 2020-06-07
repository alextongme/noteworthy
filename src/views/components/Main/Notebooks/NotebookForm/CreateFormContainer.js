import { connect } from 'react-redux';
// import React from 'react';
import { createNotebook } from '../../../../../state/actions/notebook';
import { closeModal } from '../../../../../state/actions/modal';
import NotebookForm from './NotebookForm';

const mapStateToProps = (state) => {
    return {
        notebook: {
            name: "",
        },
        formType: "Create New Notebook"
    }
}

const mapDispatchToProps = (dispatch) => {
    // debugger
    return {
        action: (notebook) => dispatch(createNotebook(notebook)),
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookForm)