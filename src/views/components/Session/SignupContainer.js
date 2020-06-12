import { connect } from 'react-redux';
import { login, signup, clearSessionErrors } from '../../../state/actions/session';
import SignupForm from './SignupForm.jsx';

const mapStateToProps = ({ errors }) => {
    return {
        errors: errors.session
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(login(user)),
        signup: (user) => dispatch(signup(user)),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)