import React from "react";
import { Link } from "react-router-dom";
import Upvotes from "../upvotes/Upvotes";

const PostView = ({ post }) => {
    return (
        <div className="post-title-view">
                <Upvotes upvotes={post.postUpvotes} type={'post'} id={post.postId} />
                <Link to="/viewpost" state={{id: post.postId}}>{post.postTitle}</Link>
                <p>replies: {post.repliesArray.length}</p>
        </div>
    )
}

export default PostView