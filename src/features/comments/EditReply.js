import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { editReplyInDB } from "../../app/firebase";
import { replyButtonClicked } from '../comments/showReplyFormSlice';

const EditReply = ({ id, content }) => {
    const [replyContent, setReplyContent] = useState({ value: content});
    const dispatch = useDispatch();
    
    const handleInput = (e) => {
        setReplyContent({
            value: e.target.value,
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editReplyInDB(id, replyContent).then(data => {
            setReplyContent({ value: '' });
            dispatch(replyButtonClicked(''));
            window.location.reload();
        });
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setReplyContent({ value: '' });
        dispatch(replyButtonClicked(''));
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea
            value={replyContent.value}
            onChange={handleInput}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
    )
}

export default EditReply