import "./write.css";
import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { addPost } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

const Write = () => {
  const [inputs, setInputs] = useState("");
  const [categories, setCategories] = useState([]);
  const [checkboxCats, setCheckboxCats] = useState([]);
  const [file, setFile] = useState(null);

  const formRef = useRef();
  const navigate = useNavigate();

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

  // FUNCTION & REDUX:
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.user.currentUser);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filename = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;

          default:
            return;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const post = {
            ...inputs,
            categories: checkboxCats,
            username,
            img: downloadURL,
          };
          addPost(dispatch, post);
          formRef.current.reset();
          navigate("/");
        });
      }
    );
  };

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

  return (
    <>
      <Topbar />
      <div className="write">
        {file && (
          <img
            src={
              URL.createObjectURL(file) ||
              "https://3nhann.files.wordpress.com/2017/06/anh-ce1bba7a.jpg"
            }
            alt=""
            className="writeImg"
          />
        )}
        <form className="writeForm" ref={formRef}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              id="fileInput"
              style={{ display: "none" }}
            />
            <input
              type="text"
              placeholder="Title"
              className="writeInput"
              autoFocus={true}
              name="title"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="writeFormGroup">
            <textarea
              placeholder="Description"
              type="text"
              className="writeInput textAreSm"
              style={{ resize: "none" }}
              name="desc"
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <div className="writeFormGroup">
            <textarea
              placeholder="Tell people your story...."
              type="text"
              className="writeInput writeText"
              style={{ resize: "none" }}
              name="content"
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>

          <div className="writeCats">
            <p className="writeSelect">Categories:</p>
            {categories.map((cat, index) => (
              <div key={index} className="writeSelectBoxContainer">
                <input
                  className="writeSelectBox"
                  type="checkbox"
                  value={`${cat.name}`}
                  onChange={handleCheckbox}
                />
                {cat.name}
              </div>
            ))}
          </div>

          <button onClick={handleSubmit} className="writeSubmit">
            Publish
          </button>
        </form>
      </div>
    </>
  );
};

export default Write;
