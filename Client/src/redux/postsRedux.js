import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    postsList: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // GET ALL POSTS:
    getPostsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getPostsSuccess: (state, action) => {
      state.isFetching = false;
      state.postsList = action.payload;
    },
    getPostsFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // ADD POST:
    addPostStart: (state) => {
      state.isFetching = true;
    },
    addPostSuccess: (state, action) => {
      state.isFetching = false;
      state.postsList.push(action.payload);
    },
    addPostFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // DELETE POST:
    deletePostStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deletePostSuccess: (state, action) => {
      state.isFetching = false;
      state.postsList.splice(
        state.postsList.findIndex((post) => post._id === action.payload),
        1
      );
    },
    deletePostFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // UPDATE POST:
    updatePostStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updatePostSuccess: (state, action) => {
      state.isFetching = false;
      state.postsList[state.postsList.findIndex(action.payload.id)] =
        action.payload.newPost;
    },
    updatePostFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
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
} = postsSlice.actions;

export default postsSlice.reducer;
