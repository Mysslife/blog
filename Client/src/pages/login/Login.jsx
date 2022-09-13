import "./login.css";
import { Link } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);

  // REDUX:
  const dispatch = useDispatch();
  // const posts = useSelector((state) => state.posts);
  // useEffect(() => {
  //   setError(false);
  //   if (posts.error === true) {
  //     setError(true);
  //   }
  // }, [posts.error]);

  // FUNCTION:
  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <span className="loginTitle">Login</span>
        <form className="loginForm">
          <label>Username</label>
          <input
            name="username"
            className="loginInput"
            type="text"
            placeholder="Your email"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            className="loginInput"
            type="password"
            placeholder="Your password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin} className="loginButton">
            Login
          </button>
        </form>
        <Link to={"/register"} className="link">
          <button className="loginRegisterButton">Register</button>
        </Link>
        {error && (
          <span style={{ color: "red" }}>
            Username or password is wrong. Please try again.
          </span>
        )}
      </div>
    </div>
  );
};

export default Login;
