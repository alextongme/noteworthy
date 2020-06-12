import { connect } from 'react-redux';
// import NotebookItem from './NotebookItem';
import Dropdown from './Dropdown'
// import { openDropdown } from '../../../../../state/actions/dropdown';
import {openModal} from '../../../../state/actions/modal';
import {deleteNotebook, updateDefaultNotebook} from '../../../../state/actions/notebook'

const mapStateToProps = (state, ownProps) => {
    return {
        currNotebookId: state.ui.dropdown.notebookId,
        user: Object.values(state.entities.users)[0],
        notebookIds: Object.keys(state.entities.notebooks)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // openDropdown: (dropdown) => dispatch(openDropdown(dropdown)),
        openModal: (modal) => dispatch(openModal(modal)),
        deleteNotebook: (notebookId) => dispatch(deleteNotebook(notebookId)),
        updateDefaultNotebook: (notebookId) => dispatch(updateDefaultNotebook(notebookId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown)