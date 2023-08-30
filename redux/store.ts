import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '@/redux/card';
import creditcardReducer from '@/redux/creditcard';
import filterReducer from '@/redux/filter';
import userReducer from '@/redux/user';
import cookieReducer from '@/redux/cookie';
import csrfReducer from '@/redux/csrf';
import initialedReducer from '@/redux/initialed';
import browserReducer from '@/redux/browser';

const store = configureStore({
  reducer: {
    card: cardReducer,
    creditcard: creditcardReducer,
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