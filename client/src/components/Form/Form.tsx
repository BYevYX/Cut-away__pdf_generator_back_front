import axios from 'axios';
import React from 'react';
import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCardSize } from '../../Redux/features/cardSize/selectors';
import { addPdfURL } from '../../Redux/features/downloadPdfSlice/downloadPdf';
import { selectFiles } from '../../Redux/features/fileSlice/selectors';
import { selectPaperFormat } from '../../Redux/features/paperFormatSlice/selectors';
import { cardStateName } from '../commonTypes';
import DowloadPdf from '../DownloadPdf/DowloadPdf';
import FileInput from '../FileInput/FileInput';
import FormBlock from '../FormBlock/FormBlock';
import Input from '../Input';
import './Form.css';
import Select from '../Select/Select';

const Form: FC = () => {
    const files = useSelector(selectFiles);
    const paperFormat = useSelector(selectPaperFormat);
    const { width, height, rightMargin, bottomMargin } =
        useSelector(selectCardSize);

    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!files.length) {
            alert('Пожалуйста, загрузите лицевые и оборотные файлы.'); // TODO сделать нотификашку
            return;
        }

        const formData = new FormData();
        // Добавляем параметры заказа
        formData.append('paperSize', paperFormat);
        formData.append('cardWidth', width.toString());
        formData.append('cardHeight', height.toString());
        formData.append('cardRightMargin', rightMargin.toString());
        formData.append('cardBottomMargin', bottomMargin.toString());

        // Добавляем файлы
        Array.from(files).forEach((file) =>
            formData.append('frontFiles', file)
        );

        try {
            // Отправляем запрос на сервер
            const response = await axios.post('/generate-pdf', formData, {
                responseType: 'blob', // Ожидаем файл PDF в ответе
            });

            // Создаем ссылку для скачивания PDF
            const pdfURL = window.URL.createObjectURL(
                new Blob([response.data])
            ).toString();
            dispatch(addPdfURL({ pdfURL }));
        } catch (error) {
            console.error('Произошла ошибка при генерации PDF:', error);
            alert('Что-то пошло не так, попробуйте еще раз');
        }
    };

    return (
        <form className="form" onSubmit={() => 'handleSubmit'}>
            <div className="main-form-group">
                <FormBlock>
                    <Select />
                    <Input
                        stateName={cardStateName.width}
                        labelText="Ширина визитки (мм): "
                    />
                    <Input
                        stateName={cardStateName.height}
                        labelText="Высота визитки (мм): "
                    />
                    <Input
                        stateName={cardStateName.rightMargin}
                        labelText="Отступ между визитками сбоку: "
                    />
                    <Input
                        stateName={cardStateName.bottomMargin}
                        labelText="Отступ между визитками снизу: "
                    />
                </FormBlock>
                <div>
                    <FormBlock className="form-input-files">
                        <FileInput text="Выберите файлы" />
                    </FormBlock>

                    <FormBlock className="download-pdf-files">
                        <DowloadPdf />
                    </FormBlock>
                </div>
            </div>
            <div className="submit-button-container">
                <button
                    className="submit-button"
                    type="submit"
                    onSubmit={handleSubmit}
                >
                    Сгенерировать PDF
                </button>
            </div>
        </form>
    );
};

export default Form;
