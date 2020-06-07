import { connect } from 'react-redux';
import React from 'react';
import { fetchNotebook, updateNotebook } from '../../../../../state/actions/notebook';
import {closeModal} from '../../../../../state/actions/modal';
import NotebookForm from './NotebookForm';

import {withRouter} from 'react-router';

class EditFormContainer extends React.Component {
    componentDidMount() {
        // debugger
        // this.props.fetchNotebook(this.props.match.params.notebookId);
        // debugger
    }

    render() {
        const {updateNotebook, formType, notebook, closeModal} = this.props;

        if(!notebook) return null;
        
        return (
            <NotebookForm
                action={updateNotebook}
                formType={formType}
                notebook={notebook}
                closeModal={closeModal}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // debugger
    return {
        notebook: state.entities.notebooks[state.ui.dropdown.notebookId],
        formType: "Rename notebook"
    }
}

const mapDispatchToProps = (dispatch) => {
    // debugger
    return {
        // fetchNotebook: (notebookId) => dispatch(fetchNotebook(notebookId)),
        updateNotebook: (notebook) => dispatch(updateNotebook(notebook)),
        closeModal: () => dispatch(closeModal())
    }
}

export default withRouter(connect(
mapStateToProps, 
mapDispatchToProps,
// null,
// {pure: false}
)(EditFormContainer))