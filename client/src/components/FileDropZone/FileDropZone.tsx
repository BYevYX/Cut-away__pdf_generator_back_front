import React, { DragEvent, useState } from 'react';
import { checkFiles } from './helpers';

import './FileDropZone.css';

const FileDropzone: React.FC = () => {
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[] | null>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    const [errorMessages, newFilesList] = checkFiles(files);
    
    if (errorMessages.length > 0) {
      setErrors(errorMessages); // Показываем все ошибки
    } else {
      setErrors(null);
      setDroppedFiles((prev) => [...prev, ...newFilesList]); // Добавляем файлы в состояние
    }
  }

  return (
    <div>
      <div 
        className='file-drop-zone'
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        Перетащите и сбросьте файлы сюда
      </div>

      {/* Вывод ошибок */}
      {errors?.length && errors.map( err => <div style={{ color: 'red' }}>{err}</div> )}

      {/* Список загруженных файлов */}
      {droppedFiles.length > 0 ? (
        <ul>
          {droppedFiles.map((file, index) => (
            <li key={index}>
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет загруженных файлов</p>
      )}
    </div>
  );
};

export default FileDropzone;