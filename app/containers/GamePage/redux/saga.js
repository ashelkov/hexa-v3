import { put, takeEvery } from 'redux-saga/effects';
import { GENERATE_FIELD, START_NEW_GAME } from './reducer';
// utils
import generateField from '../utils/generateField';

/**
 * Worker Saga
 */
export function* onStartNewGame() {
  const field = generateField({ colors: 6 });
  yield put({
    type: GENERATE_FIELD,
    field,
  });
}

/**
 * Watcher Saga
 */
export default function* githubData() {
  yield takeEvery(START_NEW_GAME, onStartNewGame);
}
