// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import rickAndMortyReducer from './ricky-morty-slice';
import { rickAndMortyEpics } from '../ricky-morty-service-epic';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    rickAndMorty: rickAndMortyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
});

epicMiddleware.run(combineEpics(...rickAndMortyEpics));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;