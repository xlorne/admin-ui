import {configureStore} from '@reduxjs/toolkit';
import {counterSlice} from './CounterSlice';

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;