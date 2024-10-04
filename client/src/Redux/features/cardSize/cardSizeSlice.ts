import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { cardStateName } from "../../../components/commonTypes";

interface payload {
    name: cardStateName;
    newState: number,
}

const initialState = {
    width: 90,
    height: 50,
    rightMargin: 0,
    bottomMargin: 0,
}

const cardSize = createSlice({
    name: 'cardSize',
    initialState,
    reducers: {
        changeCardState(state, action: PayloadAction<payload>) {
            const stateName = action.payload.name;
            state[stateName] = action.payload.newState;
        },
    }
});

const cardSizeReducer = cardSize.reducer;

export const { changeCardState } = cardSize.actions;

export default cardSizeReducer;
