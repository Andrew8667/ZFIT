import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from './workoutSlice';

export const store = configureStore({
  reducer: {
    workout: workoutReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
export default RootState;