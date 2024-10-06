import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface downloadPdfState {
    pdfURL: string | null;
}

interface addPdfURLPayload {
    pdfURL: string,
}

const initialState: downloadPdfState = {
    pdfURL: null,
}

const downloadPdfSlice = createSlice({
    name: 'downloadPdf',
    initialState,
    reducers: {
        addPdfURL(state, action: PayloadAction<addPdfURLPayload>) {
            const pdfURL = action.payload.pdfURL;
            state.pdfURL = pdfURL;
        }
    }
});

const downloadPdfReducer = downloadPdfSlice.reducer;

export const { addPdfURL } = downloadPdfSlice.actions;

export default downloadPdfReducer;
