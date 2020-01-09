import React from 'react';
import { Link } from 'react-router-dom';

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
        const userCredentials = Object.assign({}, this.state);
        this.props.processForm(userCredentials)
            .then(() => this.props.history.push("/i/latest"), 
            () => {
                if (this.props.formType === 'log in') {
                    this.setState({ email: '', password: ''})
                }
            });
    }

    newUserName() {
        return this.props.formType === 'sign up' ? 
            <div className="new-user-name">
                <input type="text"
                    placeholder="Name"
                    onChange={this.update('name')}
                    value={this.state.name}/>
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
        const headerText = formType === 'sign up' ? "Sign Up to Curator" : "Log in to Curator";
        const buttonText = formType === 'sign up' ? "Sign Up" : "Log In";
        const subText = formType === 'sign up' ? "Existing user? Log in" : "New user? Sign up";
        const otherLink = formType === 'sign up' ? '/login' : '/signup';

        return (
            <div id="modal-login" className="modal">
                <div className="session-modal-screen" onClick={e => this.handleExitClick(e)}></div>

                <div className="session-form-window">
                    <header className="session-modal-header">
                        <button className="session-form-exit-button" onClick={e => this.handleExitClick(e)}>
                            &#10006;
                        </button>
                    </header>

                    <div className="session-form-container">
                        <form onSubmit={this.handleSubmit} className="session-form">
                            <h3>{headerText}</h3>

                            {this.renderErrors()}

                            <div className="signup-form-name">
                                {this.newUserName()}
                            </div>

                            <div className="login-form-credentials">
                                <input type="text"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.update('email')}
                                    className="login-input"
                                />
                                <br />
                                <input type="password"
                                    placeholder={"Password" + (formType === 'sign up' ? " (minimum 6 characters)" : "")}
                                    value={this.state.password}
                                    onChange={this.update('password')}
                                    className="login-input"
                                />
                            </div>

                            <button className="session-submit-button">{buttonText}</button>
                        </form>

                        <Link to={otherLink} onClick={this.props.clearSessionErrors}>
                            {subText}
                        </Link>
                    </div>
                </div>
            </div> 
        )
            
    }
}

export default SessionForm;