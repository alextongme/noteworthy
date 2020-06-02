import {connect} from 'react-redux';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {login} from '../../../state/actions/session';
import SessionForm from './SessionForm.jsx';

const mapStateToProps = ({errors}) => {
    return {
        errors: errors.session,
        formType: 'login',
        navLink: <NavLink to="/signup" className="sessionForm__signup">Create Account</NavLink>
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        processForm: (user) => dispatch(login(user)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);