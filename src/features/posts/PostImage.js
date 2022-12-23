import React, { useState } from "react";

import { ReactComponent as LeftArrowIcon } from '../../images/arrow-left-thick.svg'
import { ReactComponent as RightArrowIcon } from '../../images/arrow-right-thick.svg'

const PostImage = ({ imageArray }) => {
    const [currentImage, setCurrentImage] = useState(0)

    const showNextImage = () => {
        const final = imageArray.length - 1;
        setCurrentImage(currentImage === final ? 0 : currentImage + 1)
    }

    const showPrevImage = () => {
        const final = imageArray.length - 1;
        setCurrentImage(currentImage === 0 ? final : currentImage - 1)
    }

    return (
        <>
            <div id="actual-image">
            {
                imageArray.map((image, index) => {
                    return (
                        <div  key={index}>{
                            index === currentImage && <img src={image} alt="post" height={250} width={250} />
                        }</div>
                    )
                })
            }
            </div>
            <>
                {imageArray.map > 1 && 
                    <>
                        <button className="slide-control prev-image" onClick={showPrevImage}><LeftArrowIcon /></button>
                        <button className="slide-control next-image" onClick={showNextImage}><RightArrowIcon /></button>
                    </>
                }
            </>
        </>
    )
}

export default PostImage