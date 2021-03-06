import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: true,
            selected: this.getSelectedLink(),
            isManuallyClosed: false,
            isManuallyOpen: false
        };
        // this.handleClick = this.handleClick.bind(this);
        this.handleSelectedUpdate = this.handleSelectedUpdate.bind(this);
        // this.closeNavBar = this.closeNavBar.bind(this);
    }
        
    getSelectedLink () {
        const location = this.props.location.pathname.split("/")[2]
        return location === "subscriptions" ?
            this.props.location.pathname.split("/")[3] : location;
    }

    componentDidMount() {
        // this.handleResize();
        // addEventListener('resize', this.handleResize, false);
        this.props.fetchAllSubscriptions();
    }

    // handleResize () {
    //     if (window.innerWidth < 700 && !this.state.isManuallyOpen) {
    //         this.setState({ isOpen: false })
    //     } else if (!this.state.isManuallyClosed) {
    //         this.setState({ isOpen: true })
    //     }

    //     if (window.innerWidth > 700) {
    //         this.setState({ isManuallyOpen: false });
    //     }
    // }

    // handleClick(e) {
    //     let controlState = {};
    //     if (e.target.className.includes("fa-compress")) {
    //         controlState = { isManuallyClosed: true, isManuallyOpen: false };
    //     } else {
    //         controlState = { isManuallyOpen: true, isManuallyClosed: false };
    //     }

    //     this.setState(({ isOpen }) => ({ isOpen: !isOpen, ...controlState }));
    // }

    handleSelectedUpdate() {
        setTimeout(() => this.setState({ selected: this.getSelectedLink() }), 0);
    }

    // closeNavBar() {
    //     if (window.innerWidth < 700) {
    //         this.setState({ isOpen: false })
    //     };
    // }

    render() {
        const { isOpen, selected } = this.state;
        const { feedIds, feeds } = this.props;

        return (
            <section onClick={this.handleSelectedUpdate}
                className={`navbar ${isOpen ? "" : "collapsed"}`}
            >
                <NavBarMenu {...this.state}
                    handleClick={this.handleClick}
                    closeNavBar={this.closeNavBar}
                />
                {isOpen ?
                    <div>
                        <NavBarLinks
                            feedIds={feedIds} selected={selected} feeds={feeds} 
                            closeNavBar={this.closeNavBar}
                        />

                        <div className="footer-personal-links">

                            <div className="icon-container">
                                <a className="personal-link" href={'https://github.com/C-Kan-42'} target="_blank">
                                    {/* <span className="personal-link-icon"> */}
                                        <i className="fab fa-github"></i>
                                    {/* </span> */}
                                </a>
                            </div>
                              
                            <div className="icon-container">
                                <a className="personal-link" href={'https://www.linkedin.com/in/carinakan/'} target="_blank">
                                    {/* <span className="personal-link-icon"> */}
                                        <i className="fab fa-linkedin"></i>
                                    {/* </span> */}
                                </a>     
                            </div>
                            
                        </div>
                                     
                    </div>
                    : null
                }
            </section>
        );
    }
}

const NavBarMenu = (props) => (
    <div className="menu-container">
        {props.isOpen ?
            <div>
                <Link to="/i/feeds/" onClick={props.closeNavBar}>
                    <div className="edit-button">
                        <i className="fa fa-cog" aria-hidden="true"></i>
                    </div>
                </Link>
            </div>
            : null
        }
        <NavBarCollapseExpand {...props} />
    </div>
);

const NavBarCollapseExpand = ({ isOpen, handleClick }) => (
    <div className="navbar-show-button">
        <span onClick={handleClick}>
            {isOpen ?
                <i className="fa fa-compress" aria-hidden="true"></i>
                : <i className="fa fa-expand" aria-hidden="true"></i>
            }
        </span>
    </div>
);

const NavBarLinks = ({ feedIds, feeds, selected, closeNavBar }) => {
    const feedsList = feedIds ? (feedIds.map(feedId => {
        const feed = feeds[feedId];
        return (
            <Link className={selected == feedId ? "selected" : ""}
                // onClick={closeNavBar}
                key={feedId}
                to={`/i/subscriptions/${feed.id}`}>
                <li>
                    <img src={feed.favicon_url} /> {feed.subscription_title}
                </li>
            </Link>
        );
    })) : null;

    return (
        <nav className="navbar-links">
            <div className="feeds">
                <Link to="/i/latest" 
                    // onClick={closeNavBar}
                    className={`latest${selected === "latest" ? " selected" : ""}`}>
                    <li><span></span>
                        <img src="https://img.icons8.com/cotton/64/000000/news.png" />
                        Latest
                    </li>
                </Link>

                <Link to="/i/reads"
                    // onClick={closeNavBar}
                    className={`reads${selected === "reads" ? " selected" : ""}`}>
                    <li><span><i className="navbar-icon" aria-hidden="true"></i></span>
                        <img src="https://img.icons8.com/material-sharp/96/000000/time-machine.png" />
                        Recently Read
                    </li>
                </Link>    
                
                <div className="feeds-list">
                    {feedsList}
                </div>

                <Link to="/i/discover" 
                    className={`discover${selected === "discover" ? " selected" : ""}`}>
                    <li><span><i className="navbar-icon" aria-hidden="true"></i></span>
                        <img src="https://img.icons8.com/windows/64/000000/add.png" />
                        Follow New Sources
                    </li>
                </Link>

            </div>
        </nav>
    );
}


export default NavBar;