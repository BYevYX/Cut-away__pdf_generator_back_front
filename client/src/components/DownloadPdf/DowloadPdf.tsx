import { FC } from 'react';

import { selectPdfURL } from '../../Redux/features/downloadPdfSlice/selectors';
import { useSelector } from 'react-redux';

import './DownloadPdf.css';

const FileDropzone: FC = () => {
  const pdfUrl = useSelector(selectPdfURL);

  return (
    <div 
      className='downloadPdfContainer'
    >
        {pdfUrl ? 
        <a href={pdfUrl} download='result.pdf' title='result.pdf' className='downloadPdf'>
            Скачать файл
        </a>
        : 'Здесь можно будет скачать файл с визитками'
        }
    </div>
  );
};

export default FileDropzone;
