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

import SessionBarContainer from './session_bar/session_bar_container';
import LandingContainer from './landing/landing_container';
import ArticleContainer from './main/articles/article_container';
import ArticleShowPopout from "./main/articles/article_show_popout";
import ArticleShowContainer from './main/articles/article_show_container';

const App = () => (
    <div className="app-wrapper">
        <header>
            <SessionBarContainer />
        </header>
        <Switch>
            <AuthRoute exact path="/" component={LandingContainer} />
            <AuthRoute path="/login" component={LandingContainer} />
            <AuthRoute path="/signup" component={LandingContainer} />
            <Route path="/i/articles/:articleId" component={ArticleShowPopout} />
            <ProtectedRoute exact path="/i/today" component={ArticleContainer} />
        </Switch>
    </div>
);

export default App;
