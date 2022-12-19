import React from "react";
import { Link } from "react-router-dom";
import Upvotes from "../upvotes/Upvotes";

const PostView = ({ post }) => {
    return (
        <div className="post-title-view">
                <Upvotes upvotes={post.upvotes} type={'post'} id={post.postId} />
                <div id="post-title-details">
                    <Link to="/profile" state={post.createdBy} key={post.createdBy.uid}>{post.createdBy.displayName}</Link>
                    <p>{post.createdAt}</p>
                </div>
                <Link to="/viewpost" state={{id: post.postId}} id="post-title">
                    <p>
                        {post.postTitle}
                    </p>
                </Link>
                <p>replies: {post.repliesArray.length}</p>
        </div>
    )
}

export default PostView