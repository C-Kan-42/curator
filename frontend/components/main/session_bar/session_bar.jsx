import React from 'react';
import { Route, Link } from 'react-router-dom';

const SessionBar = ({ loggedIn, currentUser, logout, history }) => {
    const buttonText = loggedIn ? "Log Out" : "Log In"
    let buttonAction;
    if (loggedIn) {
        buttonAction = (e) => {
            e.preventDefault();
            logout().then(() => history.push("/"));
        }
    } else {
        buttonAction = (e) => {
            history.push("/login");
        }
    }
    // const buttonAction = loggedIn ? logout : e => history.push("/login")
    let personalizedGreeting;
    if (currentUser) {
        personalizedGreeting = 
        <h3 className="session-bar-logo-or-greeting">
            Curator
        </h3>
    } else {
        personalizedGreeting = ''
    }

    
    return (
        <header className="session-bar">
            <div className="session-bar-contents">
                <Link to={`/i/latest`} style={{ textDecoration: 'none' }}>
                    <h3 className="session-bar-logo">
                        Curator
                    </h3>
                </Link>
                <hgroup className="session-bar-right-col">
                    {/* {personalizedGreeting} */}
                    <button className="login-button" data-toggle="modal" data-target="#modal-login" onClick={buttonAction}>{buttonText}</button>
                </hgroup>
            </div>
        </header>
    );
    
};

export default SessionBar;
