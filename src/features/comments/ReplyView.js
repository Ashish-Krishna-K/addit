import React from "react";
import { Link } from "react-router-dom";
import Upvotes from "../upvotes/Upvotes";

const ReplyView = ({ reply }) => {
    return (
        <div className="reply-view">
                <Upvotes upvotes={reply.replyUpvotes} type={'reply'} id={reply.replyId}/>
                <Link to="/viewpost" state={{id: reply.parentPost}}>{reply.replyContent.value}</Link>
                <p>replies: {reply.repliesArray.length}</p>
        </div>
    )
}

export default ReplyView