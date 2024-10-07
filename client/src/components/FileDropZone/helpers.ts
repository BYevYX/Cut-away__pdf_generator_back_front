export const checkFiles = (
    files: FileList,
    allFilesCount: number
): [string[], File[]] => {
    const MAX_FILE_COUNT = 2;
    const MAX_FILE_SIZE_MB = 5; // Максимальный размер каждого файла
    const MAX_TOTAL_SIZE_MB = 50; // Максимальный размер всех загрузок

    let allSize = 0;
    const newFilesList: File[] = [];
    const errorMessages: string[] = [];
    const toReturn: [string[], File[]] = [errorMessages, newFilesList];

    if (!files.length) {
        return toReturn;
    }

    if (allFilesCount + files.length > MAX_FILE_COUNT) {
        errorMessages.push(
            `Фалов слишком много. Максимальное количество файлов ${MAX_FILE_COUNT}`
        );
        return toReturn;
    }

    for (const file of Array.from(files)) {
        const fileSizeMB = file.size / (1024 * 1024); // Размер файла в MB
        allSize += fileSizeMB;

        // Проверяем, если любой файл больше разрешенного размера
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
            errorMessages.push(
                `Файл ${file.name} слишком большой. Максимальный размер: ${MAX_FILE_SIZE_MB}MB.`
            );
            continue;
        }

        // Проверяем совокупный размер файлов
        if (allSize > MAX_TOTAL_SIZE_MB) {
            errorMessages.push(
                `Всего файлов слишком много. Максимальный общий размер: ${MAX_TOTAL_SIZE_MB}MB.`
            );
            break;
        }

        // Добавляем файл в список, если он прошел проверки
        newFilesList.push(file);
    }

    return toReturn;
};
