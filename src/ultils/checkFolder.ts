import fs from 'fs';

export async function checkFolder(filePath: string) {
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
    }
}

export default checkFolder;
