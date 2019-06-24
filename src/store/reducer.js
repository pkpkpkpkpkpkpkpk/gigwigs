import * as actionTypes from './actions';

const initialState = {
  selectedDate: new Date(),
  where: 'sydney'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DATE_SELECTED:
      return {
        ...state,
        selectedDate: action.payload
      }
    case actionTypes.WHERE_SELECTED:
      return {
        ...state,
        where: action.payload
      }
    case actionTypes.GIGS_POPULATED:
      return {
        ...state,
        gigs: action.payload
      }
    case actionTypes.SPOTIFY_TOKEN:
      return {
        ...state,
        spotifyToken: action.payload
      }
    default:
      return state;
  }
}

export default reducer;