import React from "react";

const PostView = ({ post }) => {
    return (
        <div dataset-postid={post.postId}>
            <p>upvotes: {post.postUpvotes}</p>
            <p>{post.postTitle}</p>
            <p>replies: {post.repliesArray.length}</p>
        </div>
    )
}

export default PostView