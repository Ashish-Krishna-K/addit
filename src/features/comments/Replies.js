import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchReplyFromDB } from "../../app/firebase";
import { replyButtonClicked } from '../comments/showReplyFormSlice'

import AddReply from "../comments/AddReply";
import Upvotes from "../upvotes/Upvotes";
import EditReply from "./EditReply";


const Replies = ({id}) => {
    const [fetchedReply, setFetchedReply] = useState({});
    const [replyToEdit, setReplyToEdit] = useState({ value: '' })
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

    const handleReplyButtonClicked = (e) => {
        e.target.dataset.type === 'new' ? 
        dispatch(replyButtonClicked(e.target.dataset.id)) :
        dispatch(replyButtonClicked(`${e.target.dataset.id}edit`))
    };

    
    return(
        <div className="display-reply">
            {replyContent &&
                <>
                    <Link to="/profile" state={createdBy.uid}>{createdBy.displayName}</Link>
                    <Upvotes upvotes={replyUpvotes} type={'reply'} id={id}/>
                    {showReplyForm.show && showReplyForm.id === `${replyId}edit` ? 
                    <EditReply id={id} content={replyContent.value}/> :
                    <>
                        <p>{replyContent.value}</p>
                        <button type="button" data-id={replyId} data-type="edit" onClick={handleReplyButtonClicked}>Edit</button>
                    </>}
                    <p>replies: {repliesArray.length}</p>
                    <div>
                            <button data-id={replyId} data-type="new" onClick={handleReplyButtonClicked}>Reply</button>
                            {showReplyForm.show && showReplyForm.id === replyId &&
                                <AddReply postId={parentPost} parentType={'comment'} parentId={replyId}/>}
                    </div>
                    <>{repliesArray.map((reply, index) => <Replies id={reply} key={index}/>)}</>
                </>
            }
        </div>
    )
}

export default Replies