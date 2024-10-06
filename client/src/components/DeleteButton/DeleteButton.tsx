import React from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { deleteFile } from "../../Redux/features/fileSlice/fileSlice";

import './DeleteButton.css';
import { deleteError } from "../../Redux/features/fileErrorsSlice/fileErrorsSlice";

interface props {
    type: 'errors' | 'files'
    toDelete: string;
    onDeleteClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const DeleteButton: FC<props> = ({ type, toDelete, onDeleteClick }) => {
    const dispatch = useDispatch();

    const onDeleteFile: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if (type === 'files') {
            dispatch(deleteFile({ fileToDelete: toDelete }));
        } else {
            dispatch(deleteError({ errorToDelete: toDelete }));
        }
    }

    return (
        <button
            className="deleteFileButton"
            onClick={onDeleteClick || onDeleteFile}
        >
        x
        </button>
    );
}

export default DeleteButton;
