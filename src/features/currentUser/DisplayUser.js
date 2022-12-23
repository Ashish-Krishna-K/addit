import React from "react";

const DisplayUser = ({ user }) => {

    return (
        <div className="user-details">
            <img src={user.photoURL} alt={user.displayName}/>
            <h2>{user.displayName}</h2>
        </div>
    )
}

export default DisplayUser