import { fromJS } from 'immutable';

// constants
export const START_NEW_GAME = 'game/START_NEW_GAME';
export const GENERATE_FIELD = 'game/GENERATE_FIELD';

// action creators
export const startNewGame = () => ({
  type: START_NEW_GAME,
});

export const initialState = fromJS({
  started: false,
  field: null,
});

// reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case START_NEW_GAME:
      return state.set('started', true);
    case GENERATE_FIELD:
      return state.set('field', action.field);
    default:
      return state;
  }
}

export default reducer;
