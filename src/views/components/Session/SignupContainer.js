import { connect } from 'react-redux';
import { login, signup } from '../../../state/actions/session';
import SignupForm from './SignupForm.jsx';

const mapStateToProps = ({ errors }) => {
    return {
        errors: errors.session
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(login(user)),
        signup: (user) => dispatch(signup(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)