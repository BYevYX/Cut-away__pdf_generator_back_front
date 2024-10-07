import React, { FC } from 'react';

import './FileDropZone.css';

interface props {
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

const FileDropzone: FC<props> = ({ handleDrop }) => {
    return (
        <div
            className="file-drop-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            Перетащите и сбросьте файлы сюда
        </div>
    );
};

export default FileDropzone;
