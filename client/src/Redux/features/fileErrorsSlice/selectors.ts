import { RootState } from "../../store"

export const selectErrors = (state: RootState) => {
    return state.fileErrors.errorsList;
}
