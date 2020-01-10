import { connect } from 'react-redux';
import { createDemoUser } from '../../actions/session_actions';
import Landing from './landing';

const mapDispatchToProps = dispatch => {
    return ({
        createDemoUser: () => dispatch(createDemoUser())
    });
};

export default connect(null, mapDispatchToProps)(Landing);