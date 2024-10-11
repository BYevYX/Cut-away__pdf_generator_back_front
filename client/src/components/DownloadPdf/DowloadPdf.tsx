import axios from 'axios';
import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addPdfURL } from '../../Redux/features/downloadPdfSlice/downloadPdf';
import { selectPdfURL } from '../../Redux/features/downloadPdfSlice/selectors';

import './DownloadPdf.css';

const DownloadPdf: FC = () => {
    const pdfUrl = useSelector(selectPdfURL); // Получаем URL PDF из состояния
    const dispatch = useDispatch();
    const [isDownloading, setIsDownloading] = useState(false); // Стейт для отслеживания процесса загрузки

    const handleDownload = async () => {
        if (!pdfUrl) return;

        setIsDownloading(true); // Устанавливаем состояние загрузки

        try {
            // Делаем запрос к API для получения файла в формате blob
            const response = await axios.get(
                `http://localhost:5000/pdf/${pdfUrl}`,
                {
                    responseType: 'blob', // Ожидаем бинарный файл
                }
            );

            // Создаем URL для blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'result.pdf'); // Имя скачиваемого файла

            // Добавляем ссылку на страницу и автоматически инициируем клик для скачивания
            document.body.appendChild(link);
            link.click();
            link.remove(); // Удаляем ссылку после завершения скачивания

            // Очищаем состояние после скачивания
            dispatch(addPdfURL({ pdfURL: '' }));
        } catch (error) {
            console.error('Ошибка при скачивании файла:', error);
            alert('Не удалось скачать файл.');
        } finally {
            setIsDownloading(false); // Завершаем состояние загрузки
        }
    };

    return (
        <div className="downloadPdfContainer">
            {pdfUrl ? (
                <button
                    onClick={handleDownload}
                    className="downloadPdf"
                    disabled={isDownloading} // Делаем кнопку неактивной во время загрузки
                >
                    {isDownloading ? 'Скачивание...' : 'Скачать файл'}
                </button>
            ) : (
                'Здесь можно будет скачать файл с визитками'
            )}
        </div>
    );
};

export default DownloadPdf;
