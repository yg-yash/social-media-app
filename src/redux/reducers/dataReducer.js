import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return { ...state, loading: true };
    case SET_SCREAMS:
      return { ...state, screams: action.payload, loading: false };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      };
    case LIKE_SCREAM:
      const likeIndex = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[likeIndex] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return { ...state };
    case UNLIKE_SCREAM:
      const unlikeIndex = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[unlikeIndex] = action.payload;
      return { ...state };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments]
        }
      };
    case DELETE_SCREAM:
      const deleteIndex = state.screams.findIndex(
        scream => scream.screamId === action.payload
      );
      state.screams.splice(deleteIndex, 1);
      return {
        ...state
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    default:
      return state;
  }
};
