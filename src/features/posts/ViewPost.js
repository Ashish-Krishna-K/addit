import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchSinglePost, downloadImages, deletePostFromDB } from "../../app/firebase";
import AddReply from "../comments/AddReply";
import Replies from "../comments/Replies";
import Upvotes from "../upvotes/Upvotes";

const ViewPost = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector(state => state.loggedInUser);
    const { id } = location.state;
    const [activePost, setActivePost] = useState({});
    const [postImages, setPostImages] = useState([]);

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

    const deleteButtonClicked = () => {
        deletePostFromDB(id).then(() => {
            navigate("/");
        })
    }

    return (
        <div id="view-post">{ !postTitle ? <p>loading</p> :
            <>
                <Upvotes upvotes={upvotes} type={'post'} id={id}/>
                <div id="post-details">
                    <Link to="/profile" state={createdBy} key={createdBy.uid}>{createdBy.displayName}</Link>
                    <p>{createdAt}</p>
                    <h2 id="display-post-title">{postTitle}</h2>
                    {createdBy.uid === user.uid && <button type="button" id="delete-post-button" onClick={deleteButtonClicked}>Delete</button>}
                    <>{
                        postContent.type === 'text' ? 
                        <div id="post-text-content">
                            {createdBy.uid === user.uid && <Link to="/createpost" state={activePost}>
                                <button>edit</button>
                            </Link>}
                            <p>{postContent.content}</p>
                        </div>: 
                        <div id="post-image-content">{postImages.map(image => <img src={image} alt="Post" key={image} />)}</div>
                    }</>
                </div>
                <div id="reply">
                    {user.displayName && <AddReply postId={id} parentType={'post'} parentId={id}/>}
                </div>
                <div id="replies-section">{repliesArray.map((reply, index) => <Replies id={reply} key={index}/>)}</div>
            </>
        }</div>
    )
}

export default ViewPost