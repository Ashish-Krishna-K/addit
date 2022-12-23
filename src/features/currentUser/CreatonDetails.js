import React from "react";
import { Link } from "react-router-dom";

const CreationDetails = ({ createdBy, createdAt }) => {

    return (
        <>
            <Link to="/profile" state={createdBy} key={createdBy.uid} className="show-createdby">
                <img src={createdBy.photoURL} alt={createdBy.displayName} className="tiny-image"/>
                <span>{createdBy.displayName}</span>
                </Link>
            <span className="created-when">{createdAt}</span>
        </>
    )

}

export default CreationDetails;