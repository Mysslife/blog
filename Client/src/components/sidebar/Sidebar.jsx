import "./sidebar.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleClick = (category) => {
    const lowerCate = category?.toLowerCase();

    navigate({
      pathname: `/`,
      search: `?category=${lowerCate}`,
    });
  };

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

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <div className="sidebarTitle">ABOUT ME</div>
        <img
          src="https://afamilycdn.com/150157425591193600/2020/3/20/nana19-1474192068230-15846728489531308483799.jpg"
          alt=""
        />
        <p>
          I came to learn about this great writer for the first time when we all
          had to read “The old man and the sea” in our high school. Of course,
          back then, I had no clue whatsoever about what actually made a great
          writer. But, as I grew older and started to read more and more books,
          I eventually understood the tricks of being a great writer.
        </p>
      </div>
      <div className="sidebarItem">
        <div className="sidebarTitle">CATEGORIES</div>
        <ul className="sidebarList">
          {categories.map((category) => (
            <li
              onClick={() => handleClick(category.name)}
              key={category._id}
              className="sidebarListItem"
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <div className="sidebarTitle">FOLLOW US</div>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-twitter"></i>
          <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
