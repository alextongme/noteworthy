import { connect } from 'react-redux';
import { logout } from '../../../../state/actions/session';
import Sidebar from './Sidebar';

// takes in the current session and the entire users entities slice to match the logged in user to the specific user
const mapStateToProps = ({}) => {
    // passes back the current user using the session.id to identify user
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    // debugger
    return {
        logout: () => dispatch(logout()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);