import "./setting.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useState } from "react";
import { updateUser } from "../../redux/apiCalls";
import { useRef } from "react";

const Setting = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [file, setFile] = useState();
  const [inputs, setInputs] = useState();
  const formRef = useRef();

  // REDUX:
  const dispatch = useDispatch();

  // FUNCTION:
  const handleChange = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, [e.target.name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (file) {
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
            const newUser = {
              ...inputs,
              id: user._id,
              img: downloadURL,
            };
            updateUser(dispatch, newUser);
            formRef.current.reset();
            alert("Updated successfully!");
            window.location.reload();
          });
        }
      );
    } else {
      const newUser = {
        ...inputs,
        id: user._id,
      };
      updateUser(dispatch, newUser);
      formRef.current.reset();
      alert("Updated successfully!");
      window.location.reload();
    }
  };

  console.log(user._id);

  return (
    <>
      <Topbar />
      <div className="setting">
        <div className="settingWrapper">
          <div className="settingTitle">
            <span className="settingUpdateTitle">Update Your Account</span>
            <span className="settingDeleteTitle">Delete Account</span>
          </div>
          <form className="settingForm" ref={formRef}>
            <label>Profile Picture:</label>
            <div className="settingProfilePicture">
              <img
                src={
                  user.img ||
                  "https://thuvienhd.com/wp-content/uploads/2018/04/MV5BNWUxNDFjOGMtMGJjMy00OTA0LTk1MWYtNWExMTAxYzgyMjFmXkEyXkFqcGdeQXVyNzI1NzMxNzM@.jpg"
                }
                alt=""
              />
              <label htmlFor="fileInput">
                <i className="settingProfilePictureIcon fa-solid fa-user"></i>
              </label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                id="fileInput"
                style={{ display: "none" }}
              />
            </div>

            <label>Email:</label>
            <input
              type="text"
              placeholder={user.email}
              name="email"
              onChange={handleChange}
            />

            <label>Password:</label>
            <input type="password" name="password" onChange={handleChange} />

            <button onClick={handleUpdate} className="settingSubmit">
              Update
            </button>
          </form>
        </div>
        <Sidebar />
      </div>
      ;
    </>
  );
};

export default Setting;
