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
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
                width="24"
                height="24"
                >
                    <path 
                    d="M16,13V21H8V13H2L12,3L22,13H16M7,11H10V19H14V11H17L12,6L7,11Z"
                    fill={userHasUpvoted ? "orange" : "#ffffff"} 
                    />
                </svg>
            </button>
            <p>{value}</p>
            <button 
            type="button" 
            className={userHasDownvoted ? 'voted' : ''}
            onClick={handleDownvoteClick}>
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
                width="24"
                height="24"
                >
                    <path 
                    d="M22,11L12,21L2,11H8V3H16V11H22M12,18L17,13H14V5H10V13H7L12,18Z"
                    fill={userHasDownvoted ? "orange" : "#ffffff"} 
                    />
                </svg>
            </button>
        </div>
    )

}

export default Upvotes