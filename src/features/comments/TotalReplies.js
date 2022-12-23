import React from "react";
import { ReactComponent as Comment } from '../../images/comment.svg'

const TotalReplies = ({ repliesArray }) => {
    return (
        <>
            <span className="total-replies-icon"><Comment /></span>
            <span>{repliesArray.length}</span>
        </>
    )
}

export default TotalReplies