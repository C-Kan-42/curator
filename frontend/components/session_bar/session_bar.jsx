import React from 'react';

const SessionBar = ({ loggedIn, currentUser, logout, history }) => {
    const buttonText = loggedIn ? "Log Out" : "Log In"
    const buttonAction = loggedIn ? logout : e => history.push("/login")
    let personalizedGreeting;
    if (currentUser) {
        personalizedGreeting = <p className="session-bar-name">Hi, {currentUser.name}.</p>
    } else {
        personalizedGreeting = ''
    }
    
    return (
        <header className="session-bar">
            <div className={`session-bar-contents-${buttonAction}`}>
                <h3 className="session-bar-logo">
                    Curator
                </h3>
                <hgroup className="session-bar-right-header"></hgroup>
                {personalizedGreeting}
                <button data-toggle="modal" data-target="#modal-login" onClick={buttonAction}>{buttonText}</button>
            </div>
        </header>
    );
    
};

export default SessionBar;
