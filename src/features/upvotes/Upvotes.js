import React from "react";

import { updatePostUpvote, updateReplyUpvote } from "../../app/firebase";

const Upvotes = ({ upvotes, type, id }) => {

    const handleUpvoteClick = () => {
        const newUpvote = upvotes + 1;

        if (type === 'post') {
            updatePostUpvote(newUpvote, id).then(() => window.location.reload())
        } else if (type === 'reply') {
            updateReplyUpvote(newUpvote, id).then(() => window.location.reload())
        }
    }

    const handleDownvoteClick = () => {
        const newUpvote = upvotes - 1;

        if (type === 'post') {
            updatePostUpvote(newUpvote, id).then(() => window.location.reload())
        } else if (type === 'reply') {
            updateReplyUpvote(newUpvote, id).then(() => window.location.reload())
        }
    }

    return (
        <div id="upvotes-section">
            <button type="button" onClick={handleUpvoteClick}>Upvote</button>
            <p>{upvotes}</p>
            <button type="button" onClick={handleDownvoteClick}>Downvote</button>
        </div>
    )

}

export default Upvotes