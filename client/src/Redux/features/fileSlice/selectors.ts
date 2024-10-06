import { RootState } from "../../store"

export const selectFiles = (state: RootState) => {
    return state.files.filesList;
}
