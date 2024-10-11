import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Функция для конвертации TIFF в PNG
async function convertTiffToPng(inputPath: string): Promise<string> {
    if (!inputPath.toLowerCase().endsWith('.tiff')) return inputPath;
    try {
        const tempOutputPath = path.join(path.dirname(inputPath), `${Date.now()}_temp.png`);
        // Конвертируем TIFF в PNG и сохраняем во временный файл
        await sharp(inputPath)
            .png()
            .toFile(tempOutputPath);

        // Удаляем оригинальный TIFF-файл
        fs.unlinkSync(inputPath);

        const outputPath = inputPath.replace(/\.tiff?$/i, '.png');
        fs.renameSync(tempOutputPath, outputPath);

        return outputPath; // Возвращаем путь к новому PNG-файлу
    } catch (error) {
        console.error(`Ошибка при конвертации TIFF: ${inputPath}`, error);
        throw error;
    }
}

export default convertTiffToPng;
