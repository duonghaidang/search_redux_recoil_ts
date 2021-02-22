import {REDUX} from '../store/types';
const initialState = {
  searchList: [],
};

interface Action {
  type: string;
  payload: Object;
}
interface State {
  // searchList: Array;
}

const searchReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case REDUX.ADD_SEARCH: {
      return {
        ...state,
        searchList: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default searchReducer;
