import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface FilesErrorsState {
    errorsList: Set<string>;
}

interface addPayload {
    errors: string[];
}

interface deletePayload {
    errorToDelete: string;
}

const initialState: FilesErrorsState = {
    errorsList: new Set<string>(),
};

const filesErrorsSlice = createSlice({
    name: 'filesErrors',
    initialState,
    reducers: {
        addErrors(state, action: PayloadAction<addPayload>) {
            const errors = action.payload.errors;
            errors.forEach((err) => state.errorsList.add(err));
        },

        deleteError(state, action: PayloadAction<deletePayload>) {
            const error = action.payload.errorToDelete;
            state.errorsList.delete(error);
        },
        deleteAllErrors(state) {
            state.errorsList.clear();
        },
    },
});

const filesErrorsReducer = filesErrorsSlice.reducer;

export const { addErrors, deleteError, deleteAllErrors } =
    filesErrorsSlice.actions;

export default filesErrorsReducer;
