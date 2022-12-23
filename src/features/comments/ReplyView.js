import React from "react";
import { Link } from "react-router-dom";
import CreationDetails from "../currentUser/CreatonDetails";
import Upvotes from "../upvotes/Upvotes";
import TotalReplies from "./TotalReplies";

const ReplyView = ({ reply }) => {
    return (
        <div className="reply-view">
                <Upvotes upvotes={reply.upvotes} type={'reply'} id={reply.replyId}/>
                <div id="reply-view-details">
                    <p className="reply-view-up">
                        <CreationDetails createdBy={reply.createdBy} createdAt={reply.createdAt} />
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