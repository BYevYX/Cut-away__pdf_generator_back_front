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

        if (options.paperWidthForReverse) {
            const paperWidth = options.paperWidthForReverse;
            doc.image(cur.value, paperWidth - x - width, y, { width, height });
        } else {
            doc.image(cur.value, x, y, { width, height,  });
        }
        cur = cur.next!;
    })
}

export default addImagesToFile;
