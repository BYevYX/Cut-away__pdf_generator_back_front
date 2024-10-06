import { RootState } from "../../store"

export const selectPaperFormat = (state: RootState) => {
    return state.paperFormat.format;
}
