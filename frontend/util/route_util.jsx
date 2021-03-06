import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => {
    return (
        <Route 
            exact={exact}
            path={path}
            render={(props) => (
                !loggedIn ? (<Component {...props} />) : (<Redirect to="/" />)
        )} />
    );
};

const mapStateToProps = state => {
    return {
        loggedIn: Boolean(state.session.currentUser)
    };
};

export const AuthRoute = withRouter(
    connect(
        mapStateToProps,
        null
    )(Auth)
);

const Protect = ({component: Component, path, loggedIn}) => {
    return(
        <Route path={path} render={(props) => (
            loggedIn ? (<Component {...props} />) : (<Redirect to="/" />)
        )} />
    );
};

export const ProtectedRoute = withRouter(
    connect(mapStateToProps, null)(Protect)
);


