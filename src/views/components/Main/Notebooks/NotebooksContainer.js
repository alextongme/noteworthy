// import { connect } from 'react-redux';
// import Notebooks from './Notebooks';
// import { openModal } from '../../../../state/actions/modal';
// import { openDropdown} from '../../../../state/actions/dropdown';

// import { fetchNotebooks } from '../../../../state/actions/notebook';
// import { fetchNotes } from '../../../../state/actions/note';

// const mapStateToProps = (state) => {
//     // debugger
//     return {
//         notebooks: Object.values(state.entities.notebooks),
//         notes: Object.values(state.entities.notes)
//     }
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         openModal: (modal) => dispatch(openModal(modal)),
//         // openDropdown: (dropdown) => dispatch(openDropdown(dropdown)),
//         // fetchNotebooks: () => dispatch(fetchNotebooks()),
//         // fetchNotes: () => dispatch(fetchNotes())
//     }
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
//     null,
//     {pure:false})(Notebooks)