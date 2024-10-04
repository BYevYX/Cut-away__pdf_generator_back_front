import React from "react";
import { FC } from "react";
import FileDropzone from "../FileDropZone/FileDropZone";
import { cardSide } from "../commonTypes";

import './FileInput.css';

enum filesLabels {
    front = "Лицевые файлы: ",
    back = "Оборотные файлы: ",
}

interface props {
    type: cardSide;
}

const FileInput: FC<props> = ({ type }) => {
    const labelText = filesLabels[type];

    // TODO добавить диспатч экшена
    return (
        <div className="fileInputContainer">
            <label>{labelText}</label>
            <input 
                className="fileInput"
                type="file"
                onChange={(e) => null}
                multiple 
            />
            <FileDropzone />
        </div>
    );
}

export default FileInput;
