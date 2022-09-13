import "./register.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register">
      <div className="registerContainer">
        <span className="registerTitle">Register</span>
        <form className="registerForm">
          <label>Username</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Your username"
          />

          <label>Email</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Your email"
          />

          <label>Password</label>
          <input
            className="registerInput"
            type="password"
            placeholder="Your password"
          />

          <button className="registerButton">Register</button>
        </form>
        <Link className="link" to={"/login"}>
          <button className="registerRegisterButton">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
