import LinkedList from "./linkedList";
import { Card } from "../Types";

const addImagesToFile = (
    doc: PDFKit.PDFDocument,
    filePathsArray: string[],
    imagesPositions: Card[],
    options: {
        paperWidthForReverse?: number,
        needRotate: boolean,
    } = { needRotate: false },
) => {
    const fileList = new LinkedList(filePathsArray);
    let cur = fileList.head!;

    imagesPositions.forEach(async (imagePosition) => {
        const { x, y, width, height } = imagePosition;
        const cutMargin = 3;

        if (options.paperWidthForReverse) {
            const paperWidth = options.paperWidthForReverse;
            const reverseX = paperWidth - x - width;

            doc.rect(reverseX, y, width, height).stroke();
            doc.rect(reverseX - cutMargin, y - cutMargin, width + cutMargin * 2, height + cutMargin * 2).stroke();

            doc.image(cur.value, reverseX, y, { width, height });
        } else {
            doc.rect(x, y, width, height).stroke();
            doc.rect(x - cutMargin, y - cutMargin, width + cutMargin * 2, height + cutMargin * 2).stroke();

            doc.image(cur.value, x, y, { width, height });
        }
        cur = cur.next!;
    })
}

export default addImagesToFile;
