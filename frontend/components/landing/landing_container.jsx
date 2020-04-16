import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import Landing from './landing';

const mapDispatchToProps = dispatch => {
    return ({
        login: (user) => dispatch(login(user))
    });
};

export default connect(null, mapDispatchToProps)(Landing);