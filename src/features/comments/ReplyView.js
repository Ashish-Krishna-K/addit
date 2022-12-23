import React from "react";
import { Link } from "react-router-dom";
import Upvotes from "../upvotes/Upvotes";
import TotalReplies from "./TotalReplies";

const ReplyView = ({ reply }) => {
    return (
        <div className="reply-view">
                <Upvotes upvotes={reply.upvotes} type={'reply'} id={reply.replyId}/>
                <div id="reply-view-details">
                    <p className="reply-view-up">
                    <span>
                        Posted by:
                        <Link to="/profile" state={reply.createdBy} key={reply.createdBy.uid}>{reply.createdBy.displayName}</Link>
                    </span>
                    <span>{reply.createdAt}</span>
                    </p>
                    <Link to="/viewpost" state={{id: reply.parentPost}} className="reply-view-mid">
                        {reply.replyContent.value}
                    </Link>
                    <div className="reply-view-down">
                        <TotalReplies repliesArray={reply.repliesArray} />
                    </div>
                </div>
        </div>
    )
}

export default ReplyView