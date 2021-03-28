import React from "react";
import styled from "styled-components";

const PostCardContainer = styled.div`
    height: 200px;
    min-height: 150px;
    box-shadow: var(--peaky-shadow);
    background-color: var(--dove);
    border-radius: 8px;
    padding: 32px;
    position: relative;

    :hover {
        box-shadow: var(--peaky-shadow-high-2);
    }

    .title {
        font-size: 18px;
        color: var(--carbon);
        font-weight: 400;
    }

    .author {
        position: absolute;
        bottom: 32px;
    }
`;

const PostCard = (props) => {
    return (
        <PostCardContainer>
            <div className="title">{props.data.title}</div>
            <div className="author">Author: {props.data.authors}</div>
        </PostCardContainer>
    );
};

export default PostCard;
