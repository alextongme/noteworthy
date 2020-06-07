import { connect } from 'react-redux';
// import NotebookItem from './NotebookItem';
import Dropdown from './Dropdown'
// import { openDropdown } from '../../../../../state/actions/dropdown';
import {openModal} from '../../../../state/actions/modal';

import {deleteNotebook} from '../../../../state/actions/notebook'

const mapStateToProps = (state, ownProps) => {
    return {
        currNotebookId: state.ui.dropdown.notebookId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // openDropdown: (dropdown) => dispatch(openDropdown(dropdown)),
        openModal: (modal) => dispatch(openModal(modal)),
        deleteNotebook: (notebook) => dispatch(deleteNotebook(notebook))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown)