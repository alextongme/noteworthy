import { connect } from 'react-redux';
// import React from 'react';
import { createNotebook } from '../../../../../state/actions/notebook';
import NotebookForm from './NotebookForm';

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    // debugger
    return {
        createNotebook: (notebook) => dispatch(createNotebook(notebook)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookForm)