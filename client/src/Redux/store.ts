import { configureStore } from '@reduxjs/toolkit';
import cardSizeReducer from './features/cardSize/cardSizeSlice';

// Конфигурация основного хранилища
// Добавляйте сюда все ваши slice (куски состояния)
const store = configureStore({
  reducer: {
    cardSize: cardSizeReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;