import {
  loginStart,
  loginSuccess,
  loginFailed,
  logout,
  updateStart,
  updateSuccess,
  updateFailed,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getPostsStart,
  getPostsSuccess,
  getPostsFailed,
  addPostStart,
  addPostSuccess,
  addPostFailed,
  deletePostStart,
  deletePostSuccess,
  deletePostFailed,
  updatePostStart,
  updatePostSuccess,
  updatePostFailed,
} from "./postsRedux";

// LOGIN:
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailed());
  }
};

// LOGOUT:
export const logoutFunction = (dispatch) => {
  dispatch(logout());
};

// UPDATE USER:
export const updateUser = async (dispatch, user) => {
  const { id, ...rest } = user;
  dispatch(updateStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateSuccess(res.data));
  } catch (err) {
    dispatch(updateFailed());
  }
};

// ======================================================
// GET ALL POSTS:
export const getPosts = async (dispatch, user, category) => {
  dispatch(getPostsStart());
  try {
    let res = [];
    if (user) {
      res = await publicRequest.get(`/posts?user=${user}`);
    } else if (category) {
      res = await publicRequest.get(`/posts?category=${category}`);
    } else {
      res = await publicRequest.get("/posts");
    }
    dispatch(getPostsSuccess(res.data));
  } catch (err) {
    dispatch(getPostsFailed());
  }
};

// ADD ONE POST:
export const addPost = async (dispatch, post) => {
  dispatch(addPostStart());
  try {
    const res = await userRequest.post("/posts", post);
    dispatch(addPostSuccess(res.data));
  } catch (err) {
    dispatch(addPostFailed());
  }
};

// DELETE ONE POST:
export const deletePost = async (dispatch, postId, username) => {
  dispatch(deletePostStart());
  try {
    const res = await userRequest.delete(`/posts/${postId}`, username);
    dispatch(deletePostSuccess(postId));
  } catch (err) {
    dispatch(deletePostFailed());
  }
};

// UPDATE ONE POST:
export const updatePost = async (dispatch, updateInfo) => {
  const { id, ...rest } = updateInfo;
  dispatch(updatePostStart());
  try {
    const res = await userRequest.put(`/posts/${id}`, rest);
    dispatch(updatePostSuccess(res.data));
  } catch (err) {
    dispatch(updatePostFailed());
  }
};

// {
//   id:
//   username:
//   newPost:
// }
