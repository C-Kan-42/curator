import React from "react";
import { Provider } from 'react-redux';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter,
    BrowserRouter
} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import NavbarContainer from './navbar/navbar_container';
// import SessionBarContainer from './session_bar/session_bar_container';
// import LandingContainer from './landing/landing_container';
// import ArticleContainer from './main/articles/article_container';
// import ArticleShowPopout from "./main/articles/article_show_popout";
// import ArticleShowContainer from './main/articles/article_show_container';
import MainPage from './main/main_page';

const App = () => (
    <div className="app-wrapper">
        <ProtectedRoute path="/i" component={NavbarContainer} />
        <MainPage />
    </div>
);

export default App;
