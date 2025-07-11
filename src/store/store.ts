import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from './workoutSlice';

/**
 * Redux store to maintain information for entire app
 */
export const store = configureStore({
  reducer: {
    workout: workoutReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
export default RootState;