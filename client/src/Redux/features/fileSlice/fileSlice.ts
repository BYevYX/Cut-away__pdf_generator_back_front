import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface FilesState {
    filesList: File[];
}

interface addPayload extends FilesState {}
interface deletePayload {
    fileToDelete: string;
}


const initialState: FilesState = {
    filesList: [],
}

const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        addFiles(state, action: PayloadAction<addPayload>) {
            const files = action.payload.filesList;
            state.filesList.push(...files);
        },

        deleteFile(state, action: PayloadAction<deletePayload>) {
            const fileName = action.payload.fileToDelete;
            state.filesList = state.filesList.filter((file) => file.name !== fileName);
        },
    }
});

const filesReducer = filesSlice.reducer

export const {addFiles, deleteFile} = filesSlice.actions;

export default filesReducer;
