import React from 'react';
import SessionBarContainer from '../session_bar/session_bar_container';

const MainPage = props => {
    return (
        <main className="main-page">
            <SessionBarContainer />
            <h1>Latest articles will go here</h1>
        </main>
    );
};

export default MainPage;