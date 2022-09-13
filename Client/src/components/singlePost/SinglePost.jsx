import { useLocation, useNavigate } from "react-router-dom";
import "./singlePost.css";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../../redux/apiCalls";
import { useState, useEffect } from "react";
import axios from "axios";
import { updatePost } from "../../redux/apiCalls";

const SinglePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [checkboxCats, setCheckboxCats] = useState([]);

  const { username } = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  // USE-EFFECT: GET SINGLE POST:
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/posts/find/${postId}`
        );
        setPost(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.log(err);
      }
    };

    getPost();
  }, [username, postId]);

  // USE-EFFECT:
  useEffect(() => {
    const getCates = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getCates();
  }, []);

  // HANDLE CLICK TRANSFER TO PAGE OF USER's POSTS:
  const handleClick = (user) => {
    navigate({
      pathname: "/",
      search: `?user=${user}`,
    });
  };

  // HANDLE DELETE POST:
  const handleDelete = (id) => {
    deletePost(dispatch, id, { data: { username: username } });
    alert("Deleted successfully!");
    navigate("/");
  };

  // UPDATE MODE:
  const handleUpdate = () => {
    updatePost(dispatch, {
      id: postId,
      username,
      content,
      title,
      categories: checkboxCats,
    });
    alert("Updated successfully!");
    window.location.reload();
  };

  if (updateMode) {
    console.log(post.categories.join(", "));
  }

  // HANDLE CHECKBOX VALUES:
  const handleCheckbox = (e) => {
    const value = e.target.value.toLowerCase();
    setCheckboxCats((prev) => {
      const isChecked = checkboxCats.includes(value);

      if (isChecked) {
        return checkboxCats.filter((cat) => cat !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          src={
            post.img ||
            "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          }
          alt=""
          className="singlePostImg"
        />
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
            {username === post.username && (
              <div className="singlePostEdit">
                <i
                  onClick={() => setUpdateMode(true)}
                  className="singlePostIcon fa-solid fa-pen-to-square"
                ></i>
                <i
                  onClick={() => handleDelete(post._id)}
                  className="singlePostIcon fa-solid fa-trash-can"
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:{" "}
            <span
              className="authorName"
              onClick={() => handleClick(post.username)}
            >
              {post.username}
            </span>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostContentInput"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <p className="singlePostContent">{post.content}</p>
        )}
        {updateMode && (
          <>
            <div className="categories">
              <p className="select">Categories:</p>
              {categories.map((cat, index) => (
                <div key={index} className="selectBoxContainer">
                  <input
                    className="selectBox"
                    type="checkbox"
                    value={`${cat.name}`}
                    onChange={handleCheckbox}
                  />
                  {cat.name}
                </div>
              ))}
            </div>

            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
