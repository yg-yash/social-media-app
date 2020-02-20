import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from "../types";
import axios from "axios";

export const getScreams = () => async dispatch => {
  dispatch({ type: LOADING_DATA });
  try {
    const res = await axios.get("/screams");
    dispatch({ type: SET_SCREAMS, payload: res.data });
  } catch (error) {
    dispatch({
      type: SET_SCREAMS,
      payload: []
    });
  }
};
export const getScream = screamId => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.get(`/scream/${screamId}`);
    dispatch({ type: SET_SCREAM, payload: res.data });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    console.log(error);
  }
};

export const postScream = newScream => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post("/scream", newScream);
    dispatch({ type: POST_SCREAM, payload: res.data });
    dispatch(clearErrors);
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const likeScream = screamId => async dispatch => {
  try {
    const res = await axios.get(`/scream/${screamId}/like`);

    dispatch({ type: LIKE_SCREAM, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const unlikeScream = screamId => async dispatch => {
  try {
    const res = await axios.get(`/scream/${screamId}/unlike`);
    dispatch({ type: UNLIKE_SCREAM, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteScream = screamId => async dispatch => {
  try {
    await axios.delete(`/scream/${screamId}`);
    dispatch({ type: DELETE_SCREAM, payload: screamId });
  } catch (error) {
    console.log(error);
  }
};
export const submitComment = (screamId, commentData) => async dispatch => {
  try {
    const res = await axios.post(`/scream/${screamId}/comment`, commentData);
    dispatch({ type: SUBMIT_COMMENT, payload: res.data });
    dispatch(clearErrors());
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getUserData = userHandle => async dispatch => {
  dispatch({ type: LOADING_DATA });
  try {
    const res = await axios.get(`/user/${userHandle}`);
    dispatch({ type: SET_SCREAMS, payload: res.data.screams });
  } catch (error) {
    dispatch({
      type: SET_SCREAMS,
      payload: null
    });
  }
};

export const clearErrors = () => async dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
