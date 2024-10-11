import fs from 'fs';
import unzipper from 'unzipper';
import path from 'path';

const extractZipFile = async (zipFile: Express.Multer.File, outputDir: string) => {
    return new Promise((resolve, reject) => {
        // Распаковка zip файла
        fs.createReadStream(zipFile.path)
            .pipe(unzipper.Extract({ path: outputDir }))
            .on('close', async () => {
                try {
                    // Получение содержимого директории outputDir
                    const files = await fs.promises.readdir(outputDir, { withFileTypes: true });

                    const folder = files.find(file => zipFile.originalname.endsWith(`${file.name}.zip`));

                    if (folder) {
                        // Возвращаем путь к разархивированной папке
                        const extractedFolderPath = path.join(outputDir, folder.name);
                        resolve(extractedFolderPath);
                    } else {
                        // Если папка не найдена, возвращаем сам outputDir
                        resolve(outputDir);
                    }
                } catch (err) {
                    reject(`Ошибка при чтении директории ${outputDir}: ${err}`);
                }
            })
            .on('error', reject);
    }).catch(err => {
        console.error("Ошибка при распаковке: ", err);
        throw err;
    });
};

export default extractZipFile;
