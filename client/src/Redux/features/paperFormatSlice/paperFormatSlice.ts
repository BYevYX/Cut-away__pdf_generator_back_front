import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { PaperSize } from "../../../App/App.types";

interface paperFormatState {
    format: PaperSize;
}

interface changeFormatPayload  extends paperFormatState{}

const initialState: paperFormatState = {
    format: PaperSize.A4,
}

const paperFormatSlice = createSlice({
    name: 'paperFormat',
    initialState,
    reducers: {
        changeFormat(state, action: PayloadAction<changeFormatPayload>) {
            const format = action.payload.format;
            state.format = format;
        }
    }
});

const paperFormatReducer = paperFormatSlice.reducer;

export const { changeFormat } = paperFormatSlice.actions;

export default paperFormatReducer;
