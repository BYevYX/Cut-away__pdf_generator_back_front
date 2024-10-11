import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { createTmpPath } from "../paths";

const downloadPdfRouter = Router();

const tmpPath = createTmpPath();

downloadPdfRouter.get('/download/:fileName', (req: Request, res: Response) => {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, '../tmp', fileName);

    // Проверяем, существует ли файл
    if (fs.existsSync(filePath)) {
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Ошибка при отправке файла:', err);
                res.status(500).send('Ошибка при отправке файла.');
            } else {
                setTimeout(() => fs.rmSync(tmpPath, { recursive: true, force: true }), 1000);
            }
        });
    } else {
        res.status(404).send('Файл не найден.');
    }
});

export default downloadPdfRouter;
