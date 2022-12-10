import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import CurrentUser from "./features/currentUser.js/CurrentUser";

function App() {

  return (
    <div className="App">
      hello
      <CurrentUser />
    </div>
  );
}

export default App;
