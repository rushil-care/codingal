import React, { useState } from "react";
import { Modal, Icon, Input, notification } from "antd";
import { reasons_to_end } from "./data";

const { TextArea } = Input;

const RenderReasons = (props) => {
    let [ReasonSelected, setReasonSelected] = useState(null);
    let [SubReasonSelected, setSubReasonSelected] = useState(null);
    let TextAreaJSX = <></>;

    const handleReasonSelected = (key) => {
        setReasonSelected(key);
    };

    const handleEndBtn = () => {
        if (ReasonSelected === null) {
            notification.warn({ message: "No option selected", duration: 3 });
        } else {
            notification.success({ message: "Class Ended Successfully", duration: 3 });
            props.handleEndClass();
        }
    };

    if (SubReasonSelected === 4) {
        TextAreaJSX = <TextArea rows={4} placeholder="Type here" />;
    }
    if (SubReasonSelected !== 4 || ReasonSelected === "REASON-1") {
        TextAreaJSX = <></>;
    }

    const renderSubReasons = (sub_reasons, key) => {
        return sub_reasons.map((sub_reason, idx) => {
            let className = "";
            let IconJSX = <span className="radio-btn-small"></span>;

            if (SubReasonSelected === idx) {
                className = "sub-reason-active";
                IconJSX = (
                    <Icon
                        type="check-circle"
                        theme="filled"
                        className="icon-check-radio"
                        style={{ fontSize: 16, color: "var(--codingal)" }}
                    />
                );
            }

            return (
                <div
                    className={`sub-reason ${className} f-d f-v-c c-pointer`}
                    key={`${key}-SUB-${idx}`}
                    onClick={() => setSubReasonSelected(idx)}
                >
                    {IconJSX}
                    <div> {sub_reason}</div>
                </div>
            );
        });
    };

    let ReasonsJSX = reasons_to_end.map((ele, idx) => {
        let subReason = [];
        let className = "m-fadeOut";
        let IconJSX = <span className="radio-btn"></span>;

        if (ele.subReasons.length > 0) {
            subReason = renderSubReasons(ele.subReasons, ele.key);
        }

        if (ele.key === ReasonSelected) {
            className = "m-fadeIn";
            IconJSX = (
                <Icon
                    type="check-circle"
                    theme="filled"
                    className="icon-check-radio"
                    style={{ fontSize: 18, color: "var(--codingal)" }}
                />
            );
        }

        return (
            <div
                className="reason-group c-pointer"
                onClick={() => handleReasonSelected(ele.key)}
                key={ele.key}
            >
                <div className="main-reason f-d f-v-c">
                    {IconJSX}
                    <div>{ele.reason}</div>
                </div>
                <div className={`sub-reasons ${className}`}>{subReason}</div>
            </div>
        );
    });

    return (
        <>
            {ReasonsJSX}
            {TextAreaJSX}
            <div className="btn-group">
                <div className="button-primary end-class-btn" onClick={handleEndBtn}>
                    End class
                </div>
                <div className="button-secondary" onClick={props.handleCancel}>
                    Cancel
                </div>
            </div>
        </>
    );
};

const EndClassModal = ({ visible, handleCancel, handleEndClass }) => {
    return (
        <>
            <Modal
                destroyOnClose={true}
                visible={visible}
                title={null}
                onCancel={handleCancel}
                footer={null}
                width={"50%"}
            >
                <div className="modal-header f-d f-h-sb f-v-c">Select a reason to end class</div>
                <div className="modal-body">
                    <RenderReasons handleCancel={handleCancel} handleEndClass={handleEndClass} />
                </div>
            </Modal>
            <style jsx={"true"}>{`
                .modal-header {
                    font-size: 24px;
                    font-weight: 500;
                    color: var(--carbon);
                    margin-bottom: 24px;
                }

                .main-reason {
                    margin-bottom: 16px;
                    font-size: 18px;
                    color: var(--carbon);
                    font-weight: 400;
                }

                .radio-btn {
                    height: 18px;
                    width: 18px;
                    border: var(--peaky-border);
                    border-radius: 50%;
                    margin-right: 16px;
                }

                .radio-btn-small {
                    height: 16px;
                    width: 16px;
                    border: var(--peaky-border);
                    border-radius: 50%;
                    margin-right: 16px;
                }

                .sub-reason {
                    margin-bottom: 16px;
                    font-size: 16px;
                    color: var(--carbon);
                    font-weight: 400;
                }

                .icon-check-radio {
                    margin-right: 16px;
                }

                .sub-reasons {
                    margin-left: 16px;
                    opacity: 0;
                }

                .m-fadeOut {
                    visibility: hidden;
                    opacity: 0;
                    height: 0px;
                }

                .m-fadeIn {
                    visibility: visible;
                    opacity: 1;
                    transition: visibility 0s linear 0s, opacity 300ms;
                    height: auto;
                }

                .btn-group {
                    margin-top: 32px;
                }

                .end-class-btn {
                    margin-right: 8px;
                }

                .button-secondary {
                    border: var(--peaky-border);
                }

                .ant-modal {
                    width: 50% !important;
                }

                @media only screen and (max-device-width: 760px) {
                    .ant-modal {
                        width: 100% !important;
                    }
                }
            `}</style>
        </>
    );
};

export default EndClassModal;
