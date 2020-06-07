import { connect } from 'react-redux';
import NotebookItem from './NotebookItem';
import { editNotebookId } from '../../../../../state/actions/dropdown';

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.entities.users,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editNotebookId: (notebookId) => dispatch(editNotebookId(notebookId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotebookItem)