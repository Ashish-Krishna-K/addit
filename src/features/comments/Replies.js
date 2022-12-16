import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchReplyFromDB } from "../../app/firebase";
import { replyButtonClicked } from '../comments/showReplyFormSlice'

import AddReply from "../comments/AddReply";
import Upvotes from "../upvotes/Upvotes";


const Replies = ({id}) => {
    const [fetchedReply, setFetchedReply] = useState({})
    const showReplyForm = useSelector(state => state.showReplyForm);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchReplyFromDB(id).then((data) => {
            if (data !== null) setFetchedReply(Object.assign(data))
        })
    }, [])

    const {
        replyId,
        createdBy,
        createdAt,
        parentPost,
        parent,
        replyContent,
        replyUpvotes,
        repliesArray,
    } = fetchedReply

    const handleReplyButtonClicked = (e) => dispatch(replyButtonClicked(e.target.dataset.id));
    
    return(
        <div>{replyContent &&
            <>
                <Link to="/profile" state={createdBy.uid}>{createdBy.displayName}</Link>
                <Upvotes upvotes={replyUpvotes} type={'reply'} id={id}/>
                <p>{replyContent.value}</p>
                <p>replies: {repliesArray.length}</p>
                <div>
                        <button data-id={replyId} onClick={handleReplyButtonClicked}>Reply</button>
                        {showReplyForm.show && showReplyForm.id === replyId && <AddReply postId={parentPost} parentType={'comment'} parentId={replyId}/>}
                </div>
                <>{repliesArray.map((reply, index) => <Replies id={reply} key={index}/>)}</>
            </>
        }</div>
    )
}

export default Replies