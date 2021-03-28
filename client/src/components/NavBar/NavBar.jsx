import React, { Component } from "react";
import styled from "styled-components";
import CompanyLogo from "./../../assets/imgs/company-logo.png";
import Countdown from "react-countdown";
import { Icon, Drawer } from "antd";
import EndClassModal from "../Modal/EndClassModal";
import { Link } from "react-router-dom";

const NavBarContainer = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    height: 64px;
    width: 100vw;
    background-color: var(--dove);
    box-shadow: var(--peaky-shadow-nav);
    z-index: 1000;

    .brand-logo {
        img {
            height: 48px;
        }
    }

    .timer-countdown {
        font-size: 16px;
        font-weight: 500;
        color: var(--granite);
        margin-right: 24px;
    }

    .lesson-name {
        font-size: 16px;
        color: var(--carbon);
        margin-left: 16px;
    }
`;

class NavBar extends Component {
    state = {
        classStarted: false,
        btnText: "Start Class",
        counterJSX: <></>,
        modalVisible: false,
        drawerVisible: false,
    };

    handleBtnClick = () => {
        const { classStarted } = this.state;

        if (classStarted === false) {
            let counterJSX = <Countdown date={Date.now() + 600000} renderer={this.renderer} />;
            this.setState({ classStarted: true, btnText: "End Class", counterJSX });
        } else {
            this.handleEndClass("init");
        }
    };

    handleEndClass = (status) => {
        let counterJSX = <></>;
        if (status === "init") this.setState({ modalVisible: true });
        else
            this.setState({
                classStarted: false,
                btnText: "Start Class",
                modalVisible: false,
                counterJSX,
            });
    };

    renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state

            return <div>Class Completed</div>;
            // return <Completionist />;
        } else {
            // Render a countdown
            return (
                <span>
                    {minutes}:{seconds}
                </span>
            );
        }
    };

    handleModalVisible = () => {
        this.setState({ modalVisible: false });
    };

    showDrawer = () => {
        this.setState({
            drawerVisible: true,
        });
    };

    closeDrawer = () => {
        this.setState({
            drawerVisible: false,
        });
    };

    render() {
        const { btnText, counterJSX, modalVisible } = this.state;
        let timerClassName = "";
        let hideElement = "";

        if (btnText === "End Class") timerClassName = "timer-active";
        if (this.props.from === "POSTPAGE") hideElement = "hide-me";

        return (
            <>
                <NavBarContainer className="nav-container lr-pad-d lr-pad-m f-d f-v-c f-h-sb">
                    <div className="left-container f-d f-v-c">
                        <Link to="/">
                            <div className="brand-logo">
                                <img src={CompanyLogo} alt="Company Logo" />
                            </div>
                        </Link>
                        <div className={`lesson-name hide-m ${hideElement}`}>
                            Trial Lesson [Grade 1-3]
                        </div>

                        <Link to="/posts" className="nav-link hide-m">
                            Posts
                        </Link>
                    </div>

                    <div className={`right-container f-d f-v-c hide-m ${hideElement}`}>
                        <div className="timer-countdown">{counterJSX}</div>
                        <div className="button-primary" onClick={this.handleBtnClick}>
                            {btnText}
                        </div>
                    </div>

                    {/* Mobile Layout */}

                    <div className={`right-nav-mob-container hide-d ${hideElement}`}>
                        <span onClick={this.showDrawer}>
                            <Icon type="menu-fold" style={{ fontSize: 30 }} />
                        </span>
                    </div>

                    <Drawer
                        title={
                            <div className="f-d f-h-sb">
                                <div className="lesson-name">Trial Lesson [Grade 1-3]</div>
                                <Icon
                                    type="menu-unfold"
                                    style={{ fontSize: 30 }}
                                    onClick={this.closeDrawer}
                                />
                            </div>
                        }
                        placement={"right"}
                        closable={false}
                        onClose={this.closeDrawer}
                        visible={this.state.drawerVisible}
                        width={"90%"}
                    >
                        <Link to="/posts" className="nav-link-mobile">
                            Posts
                        </Link>

                        <div className={`timer-countdown-mobile ${timerClassName}`}>
                            {counterJSX}
                        </div>
                        <div
                            className="button-primary btn-primary-mobile"
                            onClick={this.handleBtnClick}
                        >
                            {btnText}
                        </div>
                    </Drawer>
                </NavBarContainer>
                <EndClassModal
                    visible={modalVisible}
                    handleCancel={this.handleModalVisible}
                    handleEndClass={this.handleEndClass}
                />

                <style jsx={"true"}>{`
                    .hide-me {
                        display: none;
                    }

                    .nav-link {
                        font-size: 18px;
                        color: var(--carbon);
                    }

                    .nav-link-mobile {
                        font-size: 18px;
                        color: var(--carbon);
                    }

                    .timer-countdown-mobile {
                        font-size: 18px;
                        font-weight: 500;
                        color: var(--dove);
                        margin-bottom: 24px;
                    }

                    .nav-link {
                        margin-left: 16px;
                    }

                    .timer-active {
                        background: #f77659;
                        padding: 16px;
                        color: var(--dove);
                        display: flex;
                        justify-content: center;
                        border-radius: 4px;
                    }

                    .btn-primary-mobile {
                        width: 100%;
                    }
                `}</style>
            </>
        );
    }
}

export default NavBar;
