import React from "react";
import { Link } from "react-router-dom";

const ReplyView = ({ reply }) => {
    return (
        <Link to="/viewpost" state={{id: reply.parentPost}}>
            <p>upvotes: {reply.replyUpvotes}</p>
            <p>{reply.replyContent.value}</p>
            <p>replies: {reply.repliesArray.length}</p>
        </Link>
    )
}

export default ReplyView