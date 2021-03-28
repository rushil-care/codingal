import Layout from "../components/Layout";
import React, { Component } from "react";
import Axios from "axios";
import { G_API_URL } from "../constants";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin, Row, Col } from "antd";
import PostCard from "../components/Posts/PostCard";

class Posts extends Component {
    state = {
        postsList: [],
        hasMore: true,
        skip: 0,
        showMoreLoading: true,
    };

    fetchPosts = () => {
        Axios.get(G_API_URL + "posts/", { params: { skip: this.state.skip } }).then((res) => {
            let data = res.data.data;
            let skip = this.state.skip;
            let postList = this.state.postsList;
            if (data.length === 0) {
                this.setState({ hasMore: false });
            } else {
                postList = [...postList, ...data];
                this.setState({ postsList: postList, skip: skip + 1 });
            }
        });
    };

    componentDidMount() {
        this.fetchPosts();
    }

    renderPostCards = () => {
        const { postsList } = this.state;
        return postsList.map((ele, idx) => {
            return (
                <Col key={"POST-CARD-" + idx} xs={24} md={12} lg={8}>
                    <PostCard data={ele} />
                </Col>
            );
        });
    };

    render() {
        const { postsList, hasMore, showMoreLoading } = this.state;

        console.log("INSIDE RENDER", postsList);

        return (
            <>
                <Layout from={"POSTPAGE"}>
                    <div className="infinte-posts lr-pad-d lr-pad-m">
                        <InfiniteScroll
                            dataLength={postsList}
                            next={this.fetchPosts}
                            hasMore={hasMore}
                            loader={showMoreLoading ? <Spin /> : null}
                        >
                            <div className="card-row">
                                <Row
                                    gutter={[
                                        { xs: 16, sm: 16, md: 24, lg: 32 },
                                        { xs: 16, sm: 16, md: 24, lg: 32 },
                                    ]}
                                >
                                    {this.renderPostCards()}
                                </Row>
                            </div>
                        </InfiniteScroll>
                    </div>
                </Layout>
                <style jsx={"true"}>
                    {`
                        .infinte-posts {
                            margin-top: 124px;
                        }

                        .card-row {
                            margin-left: 8px;
                            margin-right: 8px;
                            width: 95%;
                        }
                    `}
                </style>
            </>
        );
    }
}

export default Posts;
