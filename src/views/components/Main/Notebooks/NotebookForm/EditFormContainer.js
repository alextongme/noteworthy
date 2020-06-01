import { connect } from 'react-redux';
import React from 'react';
import { fetchNotebook, updateNotebook } from '../../../../../state/actions/notebook';
import NotebookForm from './NotebookForm';

class EditFormContainer extends React.Component {
    componentDidMount() {
        // debugger
        this.props.fetchNotebook(this.props.match.params.notebookId);
    }

    render() {
        const {action, formType, notebook} = this.props;

        if(!notebook) return null;
        
        return (
            <NotebookForm
                action={action}
                formType={formType}
                notebook={notebook}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        notebook: state.entities.notebooks[ownProps.match.params.notebookId],
        formType: "Update Notebook"
    }
}

const mapDispatchToProps = (dispatch) => {
    // debugger
    return {
        fetchNotebook: (notebookId) => dispatch(fetchNotebook(notebookId)),
        action: (notebook) => dispatch(updateNotebook(notebook)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFormContainer)