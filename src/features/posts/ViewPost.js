import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchSinglePost, downloadImages } from "../../app/firebase";
import { replyButtonClicked } from '../comments/showReplyFormSlice';
import AddReply from "../comments/AddReply";
import Replies from "../comments/Replies";
import Upvotes from "../upvotes/Upvotes";

const ViewPost = () => {
    const location = useLocation();
    const showReplyForm = useSelector(state => state.showReplyForm);
    const user = useSelector(state => state.loggedInUser);
    const { id } = location.state;
    const [activePost, setActivePost] = useState({});
    const [postImages, setPostImages] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchSinglePost(id).then((post) => {
            setActivePost(Object.assign(post));
        })
    }, [])

    const {
        createdBy,
        createdAt,
        postTitle,
        postContent,
        upvotes,
        repliesArray
    } = activePost

    useEffect(() => {
        if (!postTitle) return;
        if (postContent.type === 'image') {
            postContent.content.forEach(path => {
                downloadImages(path).then((data) => {
                    setPostImages((postImages) => [
                        ...postImages,
                        data
                    ]);
                })
            })
        } 
    }, [activePost]);

    const handleReplyButtonClicked = (e) => {
        dispatch(replyButtonClicked(e.target.dataset.id))
    };
    
    return (
        <>{ !postTitle ? <p>loading</p> :
            <div>
                <p>{postTitle}</p>
                <Link to="/profile" state={createdBy}>{createdBy.displayName}</Link>
                <Upvotes upvotes={upvotes} type={'post'} id={id}/>
                <div>{
                    postContent.type === 'text' ? 
                    <div>
                        {createdBy.uid === user.uid && <Link to="/createpost" state={activePost}>
                            <button>edit</button>
                        </Link>}
                        <p>{postContent.content}</p>
                    </div>: 
                    postImages.map(image => <img src={image} alt="Post" key={image} />)
                }</div>
                <div>
                        <button data-id={id} onClick={handleReplyButtonClicked}>Reply</button>
                        {showReplyForm.show && showReplyForm.id === id &&
                         <AddReply postId={id} parentType={'post'} parentId={id}/>}
                </div>
                <>{repliesArray.map((reply, index) => <Replies id={reply} key={index}/>)}</>
            </div>
        }</>
    )
}

export default ViewPost