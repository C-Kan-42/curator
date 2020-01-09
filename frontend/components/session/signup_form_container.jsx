import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../actions/session_actions';
import { clearSessionErrors } from '../../actions/errors_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => {
    return {
        logged_in: Boolean(state.session.currentUser),
        errors: state.errors.session,
        formType: 'sign up',
        // navLink: <Link to="/login">log in</Link>
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: (userCredentials) => dispatch(signup(userCredentials)),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);