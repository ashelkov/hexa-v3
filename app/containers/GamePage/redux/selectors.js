import { createSelector } from 'reselect';
import { initialState } from '../redux/reducer';

const selectGameState = state => state.get('game', initialState);

const selectField = () =>
  createSelector(selectGameState, gameState => gameState.get('field'));

const selectPalette = () =>
  createSelector(selectGameState, gameState => gameState.get('palette'));

export { selectGameState, selectField, selectPalette };
