import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post("/login", userData);
    setAuthrorizationHeader(res.data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    return history.push("/");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getUserData = () => async dispatch => {
  dispatch({ type: LOADING_USER });
  try {
    const res = await axios.get("/user");
    dispatch({ type: SET_USER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const signupUser = (newUser, history) => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post("/signup", newUser);
    setAuthrorizationHeader(res.data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    return history.push("/");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const logoutUser = () => async dispatch => {
  try {
    localStorage.removeItem("FBIdToken");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: SET_UNAUTHENTICATED });
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = formData => async dispatch => {
  dispatch({ type: LOADING_USER });
  try {
    await axios.post("/user/image", formData);
    dispatch(getUserData());
  } catch (error) {
    console.log(error);
  }
};

export const editUserDetails = userDetails => async dispatch => {
  dispatch({ type: LOADING_USER });
  try {
    axios.post("/user", userDetails);
    dispatch(getUserData());
  } catch (error) {
    console.log(error);
  }
};
export const markNotificationsRead = notificationIds => async dispatch => {
  try {
    await axios.post("/notifications", notificationIds);
    dispatch({ type: MARK_NOTIFICATIONS_READ });
  } catch (error) {
    console.log(error);
  }
};

const setAuthrorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
