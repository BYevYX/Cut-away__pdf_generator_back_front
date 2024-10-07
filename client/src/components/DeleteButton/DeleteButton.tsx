import React from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { deleteError } from '../../Redux/features/fileErrorsSlice/fileErrorsSlice';
import { deleteFile } from '../../Redux/features/fileSlice/fileSlice';

import './DeleteButton.css';

interface props {
    type: 'errors' | 'files';
    toDelete: string;
    onDeleteClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const DeleteButton: FC<props> = ({ type, toDelete, onDeleteClick }) => {
    const dispatch = useDispatch();

    const onDeleteFile: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (type === 'files') {
            dispatch(deleteFile({ fileToDelete: toDelete }));
        } else {
            dispatch(deleteError({ errorToDelete: toDelete }));
        }
    };

    return (
        <button
            className="deleteFileButton"
            onClick={onDeleteClick || onDeleteFile}
        >
            x
        </button>
    );
};

export default DeleteButton;
