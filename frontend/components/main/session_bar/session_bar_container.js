import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../actions/session_actions';
import SessionBar from './session_bar';

const mapStateToProps = ({ session }) => {
    console.log(session)
    return {
        loggedIn: Boolean(session.currentUser),
        currentUser: session.currentUser
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionBar));