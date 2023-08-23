import { configureStore } from '@reduxjs/toolkit';
import basketReducer from '@/redux/basket';
import filterReducer from '@/redux/filter';
import userReducer from '@/redux/user';
import cookieReducer from '@/redux/cookie';
import csrfReducer from '@/redux/csrf';
import initialedReducer from '@/redux/initialed';
import browserReducer from '@/redux/browser';

const store = configureStore({
  reducer: {
    basket: basketReducer,
    filter: filterReducer,
    cookie: cookieReducer,
    user: userReducer,
    csrf: csrfReducer,
    initialed: initialedReducer,
    browser: browserReducer
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;