import { configureStore } from '@reduxjs/toolkit';
import basketReducer from '@/redux/basket';
import filterReducer from '@/redux/filter';
import userReducer from '@/redux/user';
import cookieReducer from '@/redux/cookie';

const store = configureStore({
  reducer: {
    basket: basketReducer,
    filter: filterReducer,
    cookie: cookieReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;