import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { fetchComments, throttleFunction } from "../../app/firebase";

import ReplyView from "../comments/ReplyView";

const UserReplies = ({ userId }) => {
    const fetchedComments = useSelector(state => state.fetchedComments);

    useEffect(() => {
        fetchComments(userId);
    }, []);

    const handleScroll = (e) => {
        const container = e.target;
        if (container.scrollTop === 0) fetchComments(userId);
        let totalMoved = container.scrollTop + container.offsetHeight;

        if (totalMoved >= container.scrollHeight) {
            console.log('scroll end');
            throttleFunction(fetchComments, 2000)(userId);
        };
    }

    return (
            <div id="user-replies" className="reply-container" onScroll={handleScroll}>{ 
                fetchedComments.length < 1 ? <p>This user has not replied to any posts yet</p> :
                fetchedComments.map(comment => <ReplyView reply={comment} key={comment.replyId} />) 
            }</div>
    )
}

export default UserReplies