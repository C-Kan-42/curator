import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../actions/session_actions';
import { clearSessionErrors } from '../../actions/errors_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => {
    return {
        logged_in: Boolean(state.session.currentUser),
        errors: state.errors.session,
        formType: 'log in',
        // navLink: <Link to="/signup">sign up</Link>,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: (userCredentials) => dispatch(login(userCredentials)),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
