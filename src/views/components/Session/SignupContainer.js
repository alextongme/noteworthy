import { connect } from 'react-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { signup } from '../../../state/actions/session';
import SessionForm from './SessionForm.jsx';

const mapStateToProps = ({ errors }) => {
    return {
        // clarify .session
        errors: errors.session,
        formType: 'signup',
        navLink: <NavLink 
                    to="/login" 
                    className="sessionForm__login">
                    login
                </NavLink>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        processForm: (user) => dispatch(signup(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)