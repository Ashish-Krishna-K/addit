import React from "react";
import { useSelector } from 'react-redux';

import Header from "./features/header/Header";
import CreatePost from "./features/posts/CreatePost";

function App() {
  const user = useSelector(state => state.loggedInUser);

  return (
    <div className="App">
      <Header />
      {
        user.displayName === null ? 
        <p>You need to login to add a new post</p> :
        <CreatePost />
      }
    </div>
  );
}

export default App;
