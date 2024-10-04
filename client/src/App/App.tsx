import React, { useState } from 'react';
import { PaperSize } from './App.types';
import Form from '../components/Form/Form';
import axios from 'axios';

import './App.css';

const App: React.FC = () => {
  // Стейты для хранения файлов
  const [frontFiles, setFrontFiles] = useState<FileList | null>(null);
  const [backFiles, setBackFiles] = useState<FileList | null>(null);
  const [paperSize, setPaperSize] = useState<PaperSize>(PaperSize.A4);
  const [cardWidth, setCardWidth] = useState(90);
  const [cardHeight, setCardHeight] = useState(50);

  // Функция для отправки данных на сервер
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!frontFiles || !backFiles) {
      alert('Пожалуйста, загрузите лицевые и оборотные файлы.'); // TODO сделать нотификашку
      return;
    }

    const formData = new FormData();
    // Добавляем параметры заказа
    formData.append('paperSize', paperSize);
    formData.append('cardWidth', cardWidth.toString());
    formData.append('cardHeight', cardHeight.toString());

    // Добавляем файлы лицевой стороны
    Array.from(frontFiles).forEach((file) => formData.append('frontFiles', file));
    // Добавляем файлы оборотной стороны
    Array.from(backFiles).forEach((file) => formData.append('backFiles', file));

    try {
      // Отправляем запрос на сервер
      const response = await axios.post('/generate-pdf', formData, {
        responseType: 'blob', // Ожидаем файл PDF в ответе
      });

      // Создаем ссылку для скачивания PDF
      const pdfFile = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = pdfFile;
      link.setAttribute('download', 'result.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Произошла ошибка при генерации PDF:", error);
    }
  };

  return (
    <div className="app">
      <h1 className='title'>Генерация PDF с визитками</h1>
      <Form />
    </div>
);
};

export default App;