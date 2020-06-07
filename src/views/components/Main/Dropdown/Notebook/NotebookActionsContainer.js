import { connect } from 'react-redux';
// import React from 'react';
import { closeDropdown } from '../../../../../state/actions/dropdown';
import { openModal } from '../../../../state/actions/modal';
import NotebookForm from './NotebookForm';

// const mapStateToProps = (state) => {
//     return {
//         notebook: {
//             name: "",
//         },
//         formType: "Create New Notebook"
//     }
// }

const mapDispatchToProps = (dispatch) => {
    // debugger
    return {
        openModal: (modal) => dispatch(openModal(modal)),
        closeDropdown: () => dispatch(closeDropdown()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookForm)