import "./post.css";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    console.log(id);
    navigate(`/post/${id}`);
  };

  return (
    <div className="post">
      <img
        src={
          post.img ||
          "https://shinmoney.files.wordpress.com/2017/08/1b9a9e6a.jpeg"
        }
        alt=""
        className="postImg"
        onClick={() => handleClick(post._id)}
      />
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((cate, index) => (
            <span key={index} className="postCat">
              {cate}
            </span>
          ))}
        </div>
        <span onClick={() => handleClick(post._id)} className="postTitle">
          {post.title}
        </span>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
        <p onClick={() => handleClick(post._id)} className="postDesc">
          {post.desc}
        </p>
      </div>
    </div>
  );
};

export default Post;
