import React, { useState } from "react";

import { addReplyToDB } from "../../app/firebase";

const AddReply = (props) => {
    const [replyContent, setReplyContent] = useState({ value: ''});

    const handleInput = (e) => {
        setReplyContent({
            value: e.target.value,
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(props);
        addReplyToDB(props.postId, replyContent, props.parentType, props.postId)
    }


    return (
        <form onSubmit={handleSubmit}>
            <textarea
            value={replyContent.value}
            onChange={handleInput}
            ></textarea>
            <button type="submit">Post</button>
        </form>
    )
}

export default AddReply