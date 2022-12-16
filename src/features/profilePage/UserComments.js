import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { fetchComments } from "../../app/firebase";

import ReplyView from "../comments/ReplyView";

const UserReplies = ({ userId }) => {
    const fetchedComments = useSelector(state => state.fetchedComments);

    useEffect(() => {
        fetchComments(userId);
    }, []);

    const handleScroll = (e) => {
        const container = e.target;
        if (container.scrollTop + container.offsetHeight === container.scrollHeight) {
            fetchComments(userId)
        };
    }

    return (
            <div id="user-replies" className="reply-container" onScroll={handleScroll}>{ 
                fetchedComments.length < 1 ? <p>Loading</p> :
                fetchedComments.map(comment => <ReplyView reply={comment} key={comment.replyId} />) 
            }</div>
    )
}

export default UserReplies