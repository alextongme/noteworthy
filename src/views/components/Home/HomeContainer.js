import { connect } from 'react-redux';
import { signup } from '../../../state/actions/session';
import Home from './Home.jsx';

const mapStateToProps = ({ errors, session }) => {
    return {
        errors: errors.session,
        currentUser: session.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (user) => dispatch(signup(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)