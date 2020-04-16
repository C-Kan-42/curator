import React from 'react';
import SessionBarContainer from './session_bar/session_bar_container';
import MainContent from './main_content';
// import LoadingMessagesContainer from './loading_messages_container';

const MainPage = props => {
    return (
        <main className="main-page">
            <SessionBarContainer />
            {/* <LoadingMessagesContainer /> */}
            <MainContent />
        </main>
    );
};

export default MainPage;