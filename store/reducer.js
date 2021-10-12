const initialState = {
  token: 'A',
};
const reducer = (state = initialState, action) => {
  if (action.type === 'setToken') {
    return {...state, token: action.payload.token};
  }
  return state;
};
export default reducer;
