import { RootState } from '../../store';

export const selectPdfURL = (state: RootState) => {
    return state.downloadPdf.pdfURL;
};
