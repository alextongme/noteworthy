import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../../state/actions/session';
import SessionForm from './SessionForm.jsx';

const mapStateToProps = ({ errors }) => {
    return {
        // clarify .session
        errors: errors.session,
        formType: 'signup',
        navLink: <Link to="/login">login</Link>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        processForm: (user) => dispatch(signup(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)