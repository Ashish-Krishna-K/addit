import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchReplyFromDB } from "../../app/firebase";
import { replyButtonClicked } from '../comments/showReplyFormSlice'

import AddReply from "../comments/AddReply";


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
    const handleReplyButtonClicked = () => dispatch(replyButtonClicked());
    return(
        <div>{replyContent &&
            <>
                <p>{createdBy.displayName}</p>
                <p>{replyUpvotes}</p>
                <p>{replyContent.value}</p>
                <p>replies: {repliesArray.length}</p>
                <div>
                        <button onClick={handleReplyButtonClicked}>Reply</button>
                        {showReplyForm && <AddReply postId={parentPost} parentType={'comment'} parentId={replyId}/>}
                </div>
                <>{repliesArray.map((reply, index) => <Replies id={reply} key={index}/>)}</>
            </>
        }</div>
    )
}

export default Replies