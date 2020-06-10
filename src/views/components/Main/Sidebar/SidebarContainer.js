import { connect } from 'react-redux';
import { logout } from '../../../../state/actions/session';
import {createNote} from '../../../../state/actions/note';
import {openModal} from '../../../../state/actions/modal';
// import {openTags} from '../../../../state/actions/'
import Sidebar from './Sidebar';

// takes in the current session and the entire users entities slice to match the logged in user to the specific user
const mapStateToProps = (state) => {
    // passes back the current user using the session.id to identify user
    return {
        users: state.entities.users,
        session: state.session.id,
        firstNote: state.entities.notes
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openTags: () => dispatch(openModal("Open tags")),
        createNote: (note) => dispatch(createNote(note)),
        logout: () => dispatch(logout()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {pure: false}
)(Sidebar);
