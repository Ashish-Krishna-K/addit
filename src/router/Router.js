import { 
  BrowserRouter, 
  Routes, 
  Route, 
} from "react-router-dom";

import Header from "../features/header/Header";
import HomePage from "../features/homepage/HomePage";
import CreatePost from "../features/posts/CreatePost";
import ViewPost from "../features/posts/ViewPost";
import ProfilePage from "../features/profilePage/ProfilePage";

const RouteSwitch = () => {
    return (
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/viewpost" element={<ViewPost />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  };
  
  export default RouteSwitch;
