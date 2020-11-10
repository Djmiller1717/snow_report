import axios from 'axios';

const GET_RESORTS = 'GET_RESORTS';

const fetchResorts = (resorts) => ({
  type: GET_RESORTS,
  resorts,
});

export const fetchedResorts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/resorts');
    dispatch(fetchResorts(data));
  } catch (err) {
    console.log(err);
  }
};

export default function resortsReducer(state = [], action) {
  if (action.type === GET_RESORTS) {
    state = [...action.resorts];
  }
  return state;
}
