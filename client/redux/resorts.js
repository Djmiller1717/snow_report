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
  switch (action.type) {
    case GET_RESORTS:
      return action.resorts;
    default:
      return state;
  }
}
