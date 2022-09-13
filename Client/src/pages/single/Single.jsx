import "./single.css";
import TopBar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Single = () => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const post = useSelector((state) =>
    state.posts.postsList.find((post) => post._id === postId)
  );

  return (
    <>
      <TopBar />
      <div className="singleContainer">
        <SinglePost />
        <Sidebar />
      </div>
    </>
  );
};

export default Single;
