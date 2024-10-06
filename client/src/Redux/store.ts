import { configureStore } from '@reduxjs/toolkit';
import cardSizeReducer from './features/cardSize/cardSizeSlice';
import filesReducer from './features/fileSlice/fileSlice';
import filesErrorsReducer from './features/fileErrorsSlice/fileErrorsSlice';
import paperFormatReducer from './features/paperFormatSlice/paperFormatSlice';
import downloadPdfReducer from './features/downloadPdfSlice/downloadPdf';

// Конфигурация основного хранилища
// Добавляйте сюда все ваши slice (куски состояния)
const store = configureStore({
  reducer: {
    cardSize: cardSizeReducer,
    files: filesReducer,
    fileErrors: filesErrorsReducer,
    paperFormat: paperFormatReducer,
    downloadPdf: downloadPdfReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;