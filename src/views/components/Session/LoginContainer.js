import {connect} from 'react-redux';
import {login, lookForUser, clearSessionErrors} from '../../../state/actions/session';
import LoginForm from './LoginForm';

const mapStateToProps = ({errors}) => {
    return {
        errors: errors.session
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(login(user)),
        lookForUser: (email) => dispatch(lookForUser(email)),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);