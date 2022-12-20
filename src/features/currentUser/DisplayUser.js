import React from "react";

const DisplayUser = ({ user }) => {

    return (
        <div className="user-details">
            <img src={user.photoURL} alt={user.displayName}/>
            <p>{user.displayName}</p>
        </div>
    )
}

export default DisplayUser