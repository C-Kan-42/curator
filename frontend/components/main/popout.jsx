import React from 'react';

class Popout extends React.Component {
    handleEscKey(e) {
        if(e.keyCode === 27){
            this.props.handleClose();
        }
    }

    componentWillMount() {
        document.addEventListener("keydown", this.handleEscKey, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleEscKey, false);
    }

    render() {
        const { closePopout, handleClose, children } = this.props;
        return (
            <div className="floatingEntryContent sliderContainer">
                <div>
                    <div className="floatingEntryScroller">
                        <div className="floatingEntryContentSlide sliderWidth">
                            <div className="slideEntryContent">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="floatingEntryContent-tab tab_0" onClick={handleClose}>
                    <div className="floatingEntryContent-tab-close">
                        <div className="icon icon-fx-cross">&#10006;</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default class PopoutWithTransition extends React.Component {
    constructor(props) {
        super(props)
        this.state = { appeared: false }
        this.timeouts = [];
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClose() {
        this.setState({appeared: false},
            () => {
                const timeout = setTimeout(() => {
                    this.props.history.push('/i/latest');
                }, 300);
                this.timeouts.push(timeout);
        });
    }

    handleClick(e) {
        if (e.target.className === "pop-out-screen") {
            this.handleClose();
        }
    }

    componentDidMount() {
        const timeout = setTimeout(() => {
            this.setState({ appeared: true });
        }, 0)
        this.timeouts.push(timeout);
    }

    componentWillUnmount() {
        this.timeouts.forEach(to => clearTimeout(to));
    }

    render() {
        return (
            <div onClick={this.handleClick} className={"pop-out-screen" +
                (this.state.appeared ? "" : " appearing")
            }>
                <Popout {...this.props} handleClose={this.handleClose}>
                    {this.props.children}
                </Popout>
            </div>
        );
    }
}