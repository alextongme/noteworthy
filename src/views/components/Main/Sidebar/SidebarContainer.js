import { connect } from 'react-redux';
import { logout } from '../../../../state/actions/session';
// import {createNote} from '../../../../state/actions/note';
// import {openModal} from '../../../../state/actions/modal';
// import {updateDefaultNotebook} from '../../../../state/actions/notebook';

// import {openTags} from '../../../../state/actions/'
import Sidebar from './Sidebar';

// takes in the current session and the entire users entities slice to match the logged in user to the specific user
const mapStateToProps = (state, ownProps) => {
    // passes back the current user using the session.id to identify user
    return {
        users: state.entities.users,
        session: state.session.id,
        // firstNote: state.entities.notes,
        notebooks: Object.values(state.entities.notebooks)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // updateDefaultNotebook: (notebookId) => dispatch(updateDefaultNotebook(notebookId)),
        // createNote: (note) => dispatch(createNote(note)),
        // logout: () => dispatch(logout()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    // null,
    // {pure: false}
)(Sidebar);
