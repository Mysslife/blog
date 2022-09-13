import "./topbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutFunction } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    logoutFunction(dispatch);
    navigate("/login");
    localStorage.setItem("user", null);
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-twitter"></i>
        <i className="topIcon fa-brands fa-square-pinterest"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to={"/"} className="link">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link to={"/about"} className="link">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link to={"/contact"} className="link">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link to={"/write"} className="link">
              WRITE
            </Link>
          </li>
          <li className="topListItem">
            <Link to={"/setting"} className="link">
              SETTING
            </Link>
          </li>
          <li onClick={handleLogout} className="topListItem">
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        <Link to={"/setting"}>
          <img
            src={
              user.img ||
              "https://cdn.tgdd.vn/GameApp/2/220295/Screentshots/minion-rush-despicable-me-chay-dua-cung-minion-vui-nhon-logo-19-05-2020.png"
            }
            alt=""
            className="topImg"
          />
        </Link>
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
};
export default TopBar;
