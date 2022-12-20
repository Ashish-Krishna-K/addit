import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import { updatePostUpvotes, updateReplyUpvote } from "../../app/firebase";

const Upvotes = ({ upvotes, type, id }) => {
    const user = useSelector(state => state.loggedInUser);

    const [userHasUpvoted, setUserHasUpvoted] = useState(false);
    const [userHasDownvoted, setUserHasDownvoted] = useState(false);
    const { value, upvotedUsers, downvotedUsers } = upvotes;

    useEffect(() => {
        if (user.uid) {
            setUserHasUpvoted(upvotedUsers.includes(user.uid));
            setUserHasDownvoted(downvotedUsers.includes(user.uid));
        } else {
            setUserHasUpvoted(true);
            setUserHasDownvoted(true);
        }
    })

    const handleUpvoteClick = () => {
        if (!userHasDownvoted) {
            const newUpvoteArray = upvotedUsers.concat(user.uid);
            const newUpvote = newUpvoteArray.length - downvotedUsers.length;
            if (type === 'post') {
                updatePostUpvotes(newUpvote, newUpvoteArray, downvotedUsers, id).then(() => window.location.reload())
            } else {
                updateReplyUpvote(newUpvote, newUpvoteArray, downvotedUsers, id).then(() => window.location.reload())
            }
        } else {
            const newDownvoteArray = downvotedUsers.filter(id => id !== user.uid);
            const newUpvote = upvotedUsers.length - newDownvoteArray.length;
            if (type === 'post') {
                updatePostUpvotes(newUpvote, upvotedUsers, newDownvoteArray, id).then(() => window.location.reload())
            } else {
                updateReplyUpvote(newUpvote, upvotedUsers, newDownvoteArray, id).then(() => window.location.reload())
            }    
        }
    }

    const handleDownvoteClick = () => {
        if(!userHasUpvoted) {
            const newDownvoteArray = downvotedUsers.concat(user.uid);
            const newUpvote = upvotedUsers.length - newDownvoteArray.length;
            if (type === 'post') {
                updatePostUpvotes(newUpvote, upvotedUsers, newDownvoteArray, id).then(() => window.location.reload())
            } else {
                updateReplyUpvote(newUpvote, upvotedUsers, newDownvoteArray, id).then(() => window.location.reload())
            }    
        } else {
            const newUpvoteArray = upvotedUsers.filter(id => id !== user.uid);
            const newUpvote = newUpvoteArray.length - downvotedUsers.length;
            if (type === 'post') {
                updatePostUpvotes(newUpvote, newUpvoteArray, downvotedUsers, id).then(() => window.location.reload())
            } else {
                updateReplyUpvote(newUpvote, newUpvoteArray, downvotedUsers, id).then(() => window.location.reload())
            }
        }
    }

    return (
        <div id="upvotes-section">
            <button 
            type="button" 
            className={userHasUpvoted ? 'voted' : ''}
            onClick={handleUpvoteClick}>
                up
            </button>
            <p>{value}</p>
            <button 
            type="button" 
            className={userHasDownvoted ? 'voted' : ''}
            onClick={handleDownvoteClick}>
                down
            </button>
        </div>
    )

}

export default Upvotes