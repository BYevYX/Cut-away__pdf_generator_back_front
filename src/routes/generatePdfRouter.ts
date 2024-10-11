import { Router, Request, Response } from "express";
import multer from "multer";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { PaperAndCards } from "../Types";
import { AFormatSizes } from '../data/paperSize';
import BinPacking from "../ultils/binPacking";
import extractZipFile from "../ultils/unzip";
import getFilesInDirectory from "../ultils/getFilesInDirectory";
import addImagesToFile from "../ultils/addImagesToFile";
import { createTmpPath, createUploadDirPath } from "../paths";

const generatePdfRouter = Router();

const uploadsDirPath = createUploadDirPath();
const upload = multer({ dest: uploadsDirPath });

generatePdfRouter.post("/generate-pdf", upload.array('files'), async (req: Request, res: Response) => {
    const tmpPath = createTmpPath();

    const body: PaperAndCards = req.body;
    const files = req.files as Express.Multer.File[];

    if (files.length !== 2) {
        res.status(400).json({
            message: "You must upload 2 files",
        });
    }

    try {
        const paperSize = AFormatSizes[body.paperSize];
        const doc = new PDFDocument({ size: paperSize });

        const pdfFileName = `business_cards_${Date.now()}.pdf`;
        const pdfFilePath = path.join(tmpPath, pdfFileName);

        const writeStream = fs.createWriteStream(pdfFilePath);

        doc.pipe(writeStream);

        const frontPath = String(await extractZipFile(files[0], tmpPath));
        const backPath = String(await extractZipFile(files[1], tmpPath));

        fs.unlinkSync(files[0].path);
        fs.unlinkSync(files[1].path);

        const frontFileNames = await getFilesInDirectory(frontPath);
        const backFileNames = await getFilesInDirectory(backPath);

        /* ********************<><><><><><><><><><><>************************* */

        const binPacking = new BinPacking({...body, paperSize});
        const { cards: cardsPositions, isRotate} = binPacking.fit();

        addImagesToFile(doc, frontFileNames!, cardsPositions, {
            needRotate: isRotate,
        });
        doc.addPage();
        addImagesToFile(doc, backFileNames!, cardsPositions, {
            paperWidthForReverse: paperSize[0],
            needRotate: isRotate,
        });

        doc.end();

        writeStream.on('finish', () => {
            const downloadUrl = `/download/${pdfFileName}`;
            res.json({ downloadUrl });
        });
        writeStream.on('error', (err) => {
            res.status(500).json({ error: 'Failed to create PDF' });
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create PDF' });
    }
});

export default generatePdfRouter;
