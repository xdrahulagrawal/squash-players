import { combineReducers } from '@reduxjs/toolkit';
import userLoginReducer from '../pages/login/userLoginSlice';
import venueReducer from '../pages/venue/venueSlice';
import gameReducer from '../pages/games/gameSlice';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  venue: venueReducer,
  game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
