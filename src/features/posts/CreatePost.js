import React, { useState } from "react";
import { createNewPost } from "../../app/firebase";

const acceptedFileFormats = '.png, .jpg, .jpeg, .webp'

const CreatePost = () => {
    const [postType, setPostType] = useState({ value: 'text'});
    const [title, setTitle] = useState({ value: '' });
    const [content, setContent] = useState({ value: '' });
    const [uploadImage, setUploadImage] = useState({ value: [] })
    
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
        createNewPost(title.value, postType.value, content.value, uploadImage.value);
        setTitle({ value: '' });
        setContent({ value: '' });
        setPostType({ value: 'text'});
        setUploadImage({ value: [] });
    }
    
    return (
        <form onSubmit={handleFormSubmit}>
            <div>
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
                            onChange={handleContentInput}
                            /> 
                    }
                </>
            </>

            <>
                <button type="button">Cancel</button>
                <button type="submit">Post</button>
            </>

        </form>
    )
}


export default CreatePost