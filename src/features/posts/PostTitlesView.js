import React from "react";
import { Link } from "react-router-dom";
import TotalReplies from "../comments/TotalReplies";
import Upvotes from "../upvotes/Upvotes";
import CreationDetails from "../currentUser/CreatonDetails";

const PostView = ({ post }) => {
    return (
        <div className="post-title-view">
            <Upvotes upvotes={post.upvotes} type={'post'} id={post.postId} />
            <div id="post-title-details">
                <p className="post-title-up">
                    <CreationDetails createdBy={post.createdBy} createdAt={post.createdAt} />
                </p>
                <Link to="/viewpost" state={{ id: post.postId }} id="post-title" className="post-title-mid">
                    {post.postTitle}
                </Link>
                <p className="post-title-down">
                    <TotalReplies repliesArray={post.repliesArray} />
                </p>
            </div>
        </div>
    )
}

export default PostView