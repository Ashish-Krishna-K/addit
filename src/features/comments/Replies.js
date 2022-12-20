import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchReplyFromDB, deleteCommentFromDB } from "../../app/firebase";
import { replyButtonClicked } from '../comments/showReplyFormSlice'

import AddReply from "../comments/AddReply";
import Upvotes from "../upvotes/Upvotes";
import EditReply from "./EditReply";


const Replies = ({id}) => {
    const [fetchedReply, setFetchedReply] = useState({});
    const showReplyForm = useSelector(state => state.showReplyForm);
    const user = useSelector(state => state.loggedInUser);
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
        upvotes,
        repliesArray,
    } = fetchedReply

    const handleReplyButtonClicked = (e) => {
        e.target.dataset.type === 'new' ? 
        dispatch(replyButtonClicked(e.target.dataset.id)) :
        dispatch(replyButtonClicked(`${e.target.dataset.id}edit`))
    };

    const deleteButtonClicked = () => {
        deleteCommentFromDB(id).then(() => {
            window.location.reload();
        })
    }

    return(
        <>
            {!fetchedReply.replyId ? <p>loading</p> :
                <div className={parent.parentType === 'comment' ? "display-reply nested" : "display-reply"}>
                    {replyContent &&
                        <>
                            <div className="active-reply">
                                <Upvotes upvotes={upvotes} type={'reply'} id={id}/>
                                <div className="reply-content">
                                    <div className="reply-content-up">
                                        <Link to="/profile" state={createdBy} key={createdBy.uid}>{createdBy.displayName}</Link>
                                        <span>{createdAt}</span>
                                    </div>
                                    <div className="reply-content-mid">
                                        <>{showReplyForm.show && showReplyForm.id === `${replyId}edit` ? 
                                        <EditReply id={id} content={replyContent.value}/> :
                                            <p>{replyContent.value}</p>
                                        }</>
                                    </div>
                                    {(showReplyForm.show && showReplyForm.id === replyId) ?
                                        <AddReply postId={parentPost} parentType={'comment'} parentId={replyId}/> :
                                        <div className="reply-content-down">
                                            <span>replies: {repliesArray.length}</span>
                                            {createdBy.uid === user.uid && 
                                                <>
                                                    <button type="button" data-id={replyId} data-type="edit" onClick={handleReplyButtonClicked}>Edit</button>
                                                    <button type="button" onClick={deleteButtonClicked}>Delete</button>
                                                </>
                                            }
                                            {user.displayName && <button data-id={replyId} data-type="new" onClick={handleReplyButtonClicked}>Reply</button>}
                                        </div>
                                    }
                                </div>
                            </div>
                            <>{repliesArray.map((reply, index) => <Replies id={reply} key={index} className="nested"/>)}</>
                        </>
                    }
                </div>
            }
        </>
    )
}

export default Replies

