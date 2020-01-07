import React from "react";
import ReactDOM from "react-dom";
// import {postUser, postSession, deleteSession} from './util/session_api_util';
import configureStore from "./store/store";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    const store = configureStore();
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    ReactDOM.render(<h1>Welcome to Curator</h1>, root);
});