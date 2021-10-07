const initialState = {
  data: [],
};
const reducer = (state, action) => {
  if (action.type === 'GET_DATA') {
    console.log(action.payload);
  }
  return state;
};
export default reducer;
