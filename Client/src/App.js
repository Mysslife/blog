import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  // let user = false;
  // const userReducer = useSelector((state) => state.user);
  // if (userReducer) {
  //   user = userReducer.currentUser;
  // }

  // console.log(userReducer);
  // console.log(user);

  // const user = JSON.parse(localStorage.getItem("user"));

  const user = useSelector((state) => state.user.currentUser);

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

      <Route path="/write" element={<Write />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/post/:postId" element={<Single />} />

      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />
    </Routes>
  );
}

export default App;
