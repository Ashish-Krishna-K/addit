import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { fetchComments } from "../../app/firebase";

import ReplyView from "../comments/ReplyView";

const UserReplies = () => {
    const location = useLocation();
    const fetchedComments = useSelector(state => state.fetchedComments);
    const user = useSelector(state => state.loggedInUser);

    useEffect(() => {
        if (!location.state) {
            fetchComments(user.uid);
        } else {
            const { userId } = location.state;
            fetchComments(userId);
        }
    }, [])

    return (
            <div id="user-replies">{ 
                fetchedComments.length < 1 ? <p>Loading</p> :
                fetchedComments.map(comment => <ReplyView reply={comment} key={comment.replyId} />) 
            }</div>
    )
}

export default UserReplies