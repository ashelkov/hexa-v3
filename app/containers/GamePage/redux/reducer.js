import { fromJS } from 'immutable';
import generateField from '../utils/generateField';

// constants
export const START_NEW_GAME = 'game/START_NEW_GAME';
export const GENERATE_FIELD = 'game/GENERATE_FIELD';

// action creators
export const startNewGame = () => ({
  type: START_NEW_GAME,
});

const saturation = 50;

export const initialState = fromJS({
  started: false,
  palette: [
    `hsla(0,   ${saturation}%, 50%, 1)`,
    `hsla(60,  ${saturation}%, 50%, 1)`,
    `hsla(120, ${saturation}%, 50%, 1)`,
    `hsla(180, ${saturation}%, 50%, 1)`,
    `hsla(240, ${saturation}%, 50%, 1)`,
    `hsla(300, ${saturation}%, 50%, 1)`,
  ],
}).set('field', generateField({ colors: 6 }));

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
