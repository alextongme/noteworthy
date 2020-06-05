import { connect } from 'react-redux';
import { signup } from '../../../state/actions/session';
import SignupForm from './SignupForm.jsx';

const mapStateToProps = ({ errors }) => {
    return {
        errors: errors.session
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (user) => dispatch(signup(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)