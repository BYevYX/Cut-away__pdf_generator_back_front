import { configureStore } from '@reduxjs/toolkit';

import cardSizeReducer from './features/cardSize/cardSizeSlice';
import downloadPdfReducer from './features/downloadPdfSlice/downloadPdf';
import filesErrorsReducer from './features/fileErrorsSlice/fileErrorsSlice';
import filesReducer from './features/fileSlice/fileSlice';
import paperFormatReducer from './features/paperFormatSlice/paperFormatSlice';

// Конфигурация основного хранилища
// Добавляйте сюда все ваши slice (куски состояния)
const store = configureStore({
    reducer: {
        cardSize: cardSizeReducer,
        files: filesReducer,
        fileErrors: filesErrorsReducer,
        paperFormat: paperFormatReducer,
        downloadPdf: downloadPdfReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
