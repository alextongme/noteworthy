import { connect } from 'react-redux';
import { logout } from '../../../../state/actions/session';
import HeaderIntro from './HeaderIntro';

// takes in the current session and the entire users entities slice to match the logged in user to the specific user
const mapStateToProps = ({session, entities: {users}}) => {
    // passes back the current user using the session.id to identify user
    return {
        currentUser: users[session.id],
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderIntro);