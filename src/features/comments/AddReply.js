import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addReplyToDB } from "../../app/firebase";
import { replyButtonClicked } from '../comments/showReplyFormSlice';

const AddReply = (props) => {
    const [replyContent, setReplyContent] = useState({ value: ''});
    const dispatch = useDispatch();
    
    const handleInput = (e) => {
        setReplyContent({
            value: e.target.value,
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addReplyToDB(props.postId, replyContent, props.parentType, props.parentId).then(data => {
            setReplyContent({ value: '' });
            dispatch(replyButtonClicked(e.target.dataset.id));
            window.location.reload();
        });
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setReplyContent({ value: '' });
        dispatch(replyButtonClicked(e.target.dataset.id));
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea
            value={replyContent.value}
            onChange={handleInput}
            ></textarea>
            <div id="controls">
                <button type="submit">Post</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default AddReply