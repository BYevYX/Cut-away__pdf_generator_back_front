import React, { useCallback, useState } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import FileDropzone from "../FileDropZone/FileDropZone";
import { checkFiles } from "../FileDropZone/helpers";
import { selectFiles } from "../../Redux/features/fileSlice/selectors";

import './FileInput.css';
import { addFiles } from "../../Redux/features/fileSlice/fileSlice";
import DeleteButton from "../DeleteButton/DeleteButton";
import { selectErrors } from "../../Redux/features/fileErrorsSlice/selectors";
import { addErrors, deleteAllErrors } from "../../Redux/features/fileErrorsSlice/fileErrorsSlice";

interface props {
    text: string;
}

type event = React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>;

const FileInput: FC<props> = ({ text }) => {
    const errors = useSelector(selectErrors);
    const files = useSelector(selectFiles);
    const dispatch = useDispatch();

    const handleFiles = useCallback((e: event, inputFiles: FileList | null) => {
        e.preventDefault();
        e.stopPropagation();

        if (!inputFiles) {
            return;
        }

        const [errorMessages, newFilesList] = checkFiles(inputFiles, files.length);
        
        if (errorMessages.length > 0) {
            dispatch(addErrors({ errors: errorMessages }));
        } else {
            dispatch(deleteAllErrors());
            dispatch(addFiles({ filesList: newFilesList }));
        }
         
    }, [files, dispatch]);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => handleFiles(e, e.dataTransfer.files), [handleFiles]);

    const listItems = () => {
        let lis: React.ReactElement[] = [];

        if (errors.size) {
            lis.push(...[...Array.from(errors)].map((str) => (
                <li className="errorLi" >
                    {str}
                    <DeleteButton toDelete={str} type='errors' />
                </li>
            )));
        }

        if (files?.length) {
            lis.push(...[...files].map((file) => (
                <li className="fileLi">{`${file.name} ${(file.size / 1024).toFixed(1)} KB`}
                    <DeleteButton toDelete={file.name} type='files' />
                </li>
            )));
        }

        return lis.length ? lis : 'Файлы не выбраны';
    }

    // TODO добавить диспатч экшена
    return (
        <div className="file-input-container">
            <label className="file-upload-label">
                {text}
                <input 
                    className="file-input"
                    type="file"
                    onChange={(e) => handleFiles(e, e.target.files)}
                    multiple 
                />
            </label>
            <FileDropzone handleDrop={handleDrop} />

            <ul className="list">
                { listItems() }
            </ul>
        </div>
    );
}

export default FileInput;
