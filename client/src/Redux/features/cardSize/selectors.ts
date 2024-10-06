import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store"
import { cardStateName } from "../../../components/commonTypes";

export const selectCardSize = (state: RootState) => {
    return state.cardSize;
}

export const makeSelectCardParametr = (stateName: cardStateName) => {
    return createSelector(
        selectCardSize,
        (cardSize) => cardSize[stateName]
    );
};
