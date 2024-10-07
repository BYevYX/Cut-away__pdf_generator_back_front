import { createSelector } from '@reduxjs/toolkit';

import { cardStateName } from '../../../components/commonTypes';
import { RootState } from '../../store';

export const selectCardSize = (state: RootState) => {
    return state.cardSize;
};

export const makeSelectCardParametr = (stateName: cardStateName) => {
    return createSelector(selectCardSize, (cardSize) => cardSize[stateName]);
};
