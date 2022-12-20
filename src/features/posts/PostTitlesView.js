import React from "react";
import { Link } from "react-router-dom";
import Upvotes from "../upvotes/Upvotes";

const PostView = ({ post }) => {
    return (
        <div className="post-title-view">
            <Upvotes upvotes={post.upvotes} type={'post'} id={post.postId} />
            <div id="post-title-details">
                <p className="post-title-up">
                    <span>
                        Posted by:
                        <Link to="/profile" state={post.createdBy} key={post.createdBy.uid}>{post.createdBy.displayName}</Link>
                    </span>
                    <span>{post.createdAt}</span>
                </p>
                <Link to="/viewpost" state={{ id: post.postId }} id="post-title" className="post-title-mid">
                    {post.postTitle}
                </Link>
                <p className="post-title-down">replies: {post.repliesArray.length}</p>
            </div>
        </div>
    )
}

export default PostView