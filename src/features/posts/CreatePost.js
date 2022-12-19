import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createNewPost, editPostInDB } from "../../app/firebase";
import { useSelector } from "react-redux";

const acceptedFileFormats = '.png, .jpg, .jpeg, .webp'

const CreatePost = () => {
    const [postType, setPostType] = useState({ value: 'text'});
    const [title, setTitle] = useState({ value: '' });
    const [content, setContent] = useState({ value: '' });
    const [uploadImage, setUploadImage] = useState({ value: [] });
    const [isEdit, setIsEdit] = useState(false);
    const [idOfPostToEdit, setIdOfPostToEdit] = useState({value: ''});
    const activeUser = useSelector(state => state.loggedInUser);
    const navigate = useNavigate();
    const location = useLocation();
    const postToEdit = location.state;
    
    useEffect(() => {
        if (postToEdit) {
            const { postId, postTitle, postContent } = postToEdit
            setPostType({
                value: 'text',
            })
            setTitle({
                value: postTitle
            })
            setContent({
                value: postContent.content
            })
            setIsEdit(true)
            setIdOfPostToEdit({
                value: postId
            })
        }
    }, [location])

    const handleTypeChange = (e) => {
        setPostType({
            value: e.target.value, 
        })
    }

    const handleTitleInput = (e) => {
        setTitle({
            value: e.target.value,
        })
    }

    const handleContentInput = (e) => {
        setContent({
            value: e.target.value,
        })
    }
    
    const handleImageInput = (e) => {
        setUploadImage({
            value: e.target.files,
        })
    }

    const handleFormSubmit = (e) =>{
        e.preventDefault();
        if (isEdit) {
            editPostInDB(idOfPostToEdit.value, content.value).then(() => {
                setTitle({ value: '' });
                setContent({ value: '' });
                setPostType({ value: 'text'});
                setUploadImage({ value: [] });
                navigate(-1);
            })
        } else {
            createNewPost(title.value, postType.value, content.value, uploadImage.value).then(data => {
                setTitle({ value: '' });
                setContent({ value: '' });
                setPostType({ value: 'text'});
                setUploadImage({ value: [] });
                navigate('/');
            });
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setTitle({ value: '' });
        setContent({ value: '' });
        setPostType({ value: 'text'});
        setUploadImage({ value: [] });
        navigate('/');
    }
    
    return (
        <>{activeUser.displayName ? 
            <form id="create-post-form" onSubmit={handleFormSubmit}>
                <div id="type-select">
                    <button 
                    type="button" 
                    value="text" 
                    onClick={handleTypeChange}
                    >
                        Text
                    </button>

                    <button 
                    type="button" 
                    value="image" 
                    onClick={handleTypeChange}
                    >
                        Image
                    </button>

                </div>
                <>
                    <input 
                    type="text" 
                    name="title"
                    id="post-title" 
                    placeholder="Title"
                    value={title.value}
                    onChange={handleTitleInput}
                    />
                    <>
                        {
                            postType.value === 'image' ?
                                <input 
                                type="file" 
                                multiple
                                name="image[]"
                                id="post-image" 
                                accept={acceptedFileFormats}
                                onChange={handleImageInput}
                                /> :
                                <textarea
                                name="content"
                                id="post-content"
                                value={content.value} 
                                onChange={handleContentInput}
                                /> 
                        }
                    </>
                </>

                <div id="form-controls">
                    <button type="button" onClick={handleCancel}>Cancel</button>
                    <button type="submit">Post</button>
                </div>

            </form> :

            <h2>You need to login to create a new post</h2>
        }</>
    )
}


export default CreatePost