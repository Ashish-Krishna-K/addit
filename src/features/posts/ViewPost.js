import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { fetchSinglePost, downloadImages } from "../../app/firebase";
import AddReply from "../comments/AddReply";

const ViewPost = () => {
    const location = useLocation();
    const { id } = location.state;
    const [activePost, setActivePost] = useState({});
    const [postImages, setPostImages] = useState([]);
    const [isReplyButtonClicked, setIsReplyButtonClicked] = useState(false);

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
        postUpvotes,
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

    const handleReplyButtonClicked = () => setIsReplyButtonClicked(true);
    
    return (
        <>{ !postTitle ? <p>loading</p> :
            <div>
                <p>{postTitle}</p>
                <p>{createdBy.displayName}</p>
                <p>{postUpvotes}</p>
                <div>{
                    postContent.type === 'text' ? <p>{postContent.content}</p> : 
                    postImages.map(image => <img src={image} alt="Post" key={image} />)
                }</div>
                <div>
                    <>
                        <button onClick={handleReplyButtonClicked}>Reply</button>
                        {isReplyButtonClicked && <AddReply postId={id} parentType={'post'}/>}
                    </>
                </div>
            </div>
        }</>
    )
}

export default ViewPost