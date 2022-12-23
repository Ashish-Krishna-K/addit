import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchReplyFromDB, deleteCommentFromDB } from "../../app/firebase";
import { replyButtonClicked } from '../comments/showReplyFormSlice'

import AddReply from "../comments/AddReply";
import Upvotes from "../upvotes/Upvotes";
import EditReply from "./EditReply";
import TotalReplies from "./TotalReplies";
import CreationDetails from "../currentUser/CreatonDetails";

import { ReactComponent as ReplyIcon } from "../../images/reply.svg";
import { ReactComponent as EditIcon } from "../../images/edit.svg";
import { ReactComponent as DeleteIcon } from "../../images/delete-forever.svg";



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
        console.log(e.currentTarget);
        e.currentTarget.dataset.type === 'new' ? 
        dispatch(replyButtonClicked(e.currentTarget.dataset.id)) :
        dispatch(replyButtonClicked(`${e.currentTarget.dataset.id}edit`))
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
                                        <CreationDetails createdBy={createdBy} createdAt={createdAt} />
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
                                            <div>
                                                <TotalReplies repliesArray={repliesArray} />
                                            </div>
                                            {createdBy.uid === user.uid && 
                                                <>
                                                    <button type="button" data-id={replyId} data-type="edit" className="edit-reply-button" onClick={handleReplyButtonClicked}>
                                                        <EditIcon />
                                                    </button>
                                                    <button type="button" className="delete-reply-button" onClick={deleteButtonClicked}>
                                                        <DeleteIcon />
                                                    </button>
                                                </>
                                            }
                                            {user.displayName && <button data-id={replyId} data-type="new" className="add-reply-button" onClick={handleReplyButtonClicked}>
                                                    <ReplyIcon />
                                                </button>}
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

