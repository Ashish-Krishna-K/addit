import React from "react";
import { Link } from "react-router-dom";

const PostView = ({ post }) => {
    return (
        <Link to="/viewpost" state={{id: post.postId}}>
            <div className="post-title-view">
                <p>upvotes: {post.postUpvotes}</p>
                <p>{post.postTitle}</p>
                <p>replies: {post.repliesArray.length}</p>
            </div>
        </Link>
    )
}

export default PostView