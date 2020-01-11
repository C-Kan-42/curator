import React from 'react';
import { Link } from 'react-router-dom';
import MainPage from '../../components/main/main_page';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { processForm } = this.props;
        const userCredentials = Object.assign({}, this.state);
        this.props.processForm(userCredentials)
            .then(() => this.props.history.push("/i/today"), //change route to /i/latest
            () => {
                if (this.props.formType === 'log in') {
                    this.setState({ email: '', password: ''})
                }
        });
        <Route path="/i/today" component={MainPage} />
    }

    newUserName() {
        return this.props.formType === 'sign up' ? 
            <div className="new-user-name">
                <input type="text"
                    placeholder="Name"
                    onChange={this.update('name')}
                    value={this.state.name}
                    className="input-text signup-input-name"/>
            </div>
            : ""
    };

    handleExitClick(e) {
        e.preventDefault();
        this.props.clearSessionErrors();
        this.props.history.push("/");
    }

    renderErrors() {
        return (
            <ul className="session-errors">
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        const { formType, errors } = this.props;
        const headerText = formType === 'sign up' ? "Sign up to Curator" : "Log in to Curator";
        const buttonText = formType === 'sign up' ? "Sign Up" : "Log In";
        const subText = formType === 'sign up' ? "Existing user? Log in" : "New user? Sign up";
        const otherLink = formType === 'sign up' ? '/login' : '/signup';

        return (
            <div id="modal-login" className="modal">
                <div className="session-modal-background" onClick={e => this.handleExitClick(e)}></div>

                <div className="session-modal-child">
                    <header className="session-modal-header">
                        <button className="session-form-exit-button" onClick={e => this.handleExitClick(e)}>
                            &#10006;
                        </button>
                    </header>

                    <div className="session-form-container">
                        <form onSubmit={this.handleSubmit} className="session-form">
                            <h3 className="headerText">{headerText}</h3>

                            {this.renderErrors()}

                            <div className="signup-form-name">
                                {this.newUserName()}
                            </div>

                            <div className="login-form-credentials">
                                <input type="text"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.update('email')}
                                    className="input-text login-input-email"
                                />
                                <br />
                                <input type="password"
                                    placeholder={"Password" + (formType === 'sign up' ? " (minimum 6 characters)" : "")}
                                    value={this.state.password}
                                    onChange={this.update('password')}
                                    className="input-text login-input-password"
                                />
                            </div>

                            <button className="big-green-button">{buttonText}</button>
                        </form>

                        <Link to={otherLink} onClick={this.props.clearSessionErrors} className="other-link">
                            {subText}
                        </Link>
                    </div>
                </div>
            </div> 
        )
            
    }
}

export default SessionForm;
