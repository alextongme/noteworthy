import {connect} from 'react-redux';
import React from 'react';
import {Link} from 'react-router-dom';
import {login} from '../../../state/actions/session';
import SessionForm from './SessionForm.jsx';

const mapStateToProps = ({errors}) => {
    return {
        errors: errors.session,
        formType: 'login',
        navLink: <Link to="/signup">SignUp</Link>
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        processForm: (user) => dispatch(login(user)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);