import React from 'react';
import { withRouter, Route} from 'react-router-dom';
import LoginFormContainer from '../session/login_form_container';
import SignupFormContainer from '../session/signup_form_container';
// import SessionForm from '../session/session_form';

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.handleDemoUser = this.handleDemoUser.bind(this);
    }

    handleDemoUser(e) {
        e.preventDefault();
        const demoUser = { 
            email: 'demo-user@email.com',
            name: 'Demo User',
            password: 'password'
        }
        this.props.login(demoUser)
            .then(() => this.props.history.push("/i/latest"));
    }

    render() {
        
        return(
        <div className="landing">
            <div>
                <header className="header-background-gray">
                    <div className="centered-container">
                        <div className="header-row">
                            <h1 className="top-header-text">
                                Where readers become leaders
                                <div className="subtext">Keep up with all the topics that matter to you. All in one place.</div>
                            </h1>
                            <div className="button-group">
                                <button className="big-green-button get-started" onClick={e => this.props.history.push('/signup')}>
                                    Get Started For Free
                                </button>
                                <button className="big-green-button demo-user" onClick={this.handleDemoUser}>
                                    Demo User
                                </button>
                            </div>
                        </div>

                        <div className="illust-under">
                            <div className="illust-container-col">
                                <img src="https://s5.feedly.com/images/landing/screenshot-web@2x.png" className="illust" alt="" />
                            </div>
                        </div>
                    </div>
                </header>
            </div>

            <Route path="/login" component={LoginFormContainer} />
            <Route path="/signup" component={SignupFormContainer} />
            
        </div>
        );
    }
}

export default withRouter(Landing);