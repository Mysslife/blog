import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/apiCalls";
import { useLocation } from "react-router-dom";

const Home = () => {
  // REDUX:
  const posts = useSelector((state) => state.posts.postsList);
  const dispatch = useDispatch();
  const location = useLocation();
  let user;
  let category;
  if (location.search.includes("user")) {
    user = location.search.split("=")[1];
  } else {
    category = location.search.split("=")[1];
  }

  useEffect(() => {
    getPosts(dispatch, user, category);
  }, [dispatch, user, category]);

  return (
    <>
      <Topbar />
      <Header />
      <div className="home">
        <Posts postsList={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
