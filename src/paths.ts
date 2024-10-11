import path from "path";
import checkFolder from "./ultils/checkFolder";

export const createTmpPath = () => {
    const tmpPath = path.join(__dirname, '/tmp');
    checkFolder(tmpPath);
    return tmpPath;
}

export const createUploadDirPath = () => {
    const uploadsDir = path.join(__dirname, '/uploads');
    checkFolder(uploadsDir);
    return uploadsDir;
}
