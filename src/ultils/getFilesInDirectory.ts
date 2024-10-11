import fs from 'fs/promises';
import path from 'path';
import convertTiffToPng from "./convertTiffToPng";

const getFilesInDirectory = async (directoryPath: string): Promise<string[] | undefined> => {
    try {
        const files = await fs.readdir(directoryPath);
        
        // Фильтрация только файлов (не папок)
        const fileList = await Promise.all(files.filter(async file => {
            const filePath = path.join(directoryPath, file);
            const stats = await fs.stat(filePath);
            return stats.isFile() ? file : null;
        }));

        const filePaths = fileList.map(file => path.join(directoryPath, file));

        const promises = await Promise.all(filePaths.map(async filePath => {
            return convertTiffToPng(filePath);
        }));

        return promises;
    } catch (err) {
        console.error('Ошибка при чтении директории:', err);
    }
};

export default getFilesInDirectory;
