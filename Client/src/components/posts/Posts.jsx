import "./posts.css";
import Post from "../post/Post";

const Posts = ({ postsList }) => {
  return (
    <div className="posts">
      {postsList.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};

export default Posts;
