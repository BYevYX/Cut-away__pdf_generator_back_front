import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { FC } from "react";

import { cardStateName } from "../commonTypes";
import { changeCardState } from "../../Redux/features/cardSize/cardSizeSlice";

import './Input.css';
import { makeSelectCardParametr } from "../../Redux/features/cardSize/selectors";

interface props {
    stateName: cardStateName;
    labelText: string;
    type?: string;
}

const Input: FC<props> = ({ stateName, labelText, type = "number" }) => {
    const dispatch = useDispatch();
    const value = useSelector(makeSelectCardParametr(stateName));

    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        dispatch(changeCardState({
            name: stateName,
            newState: Number(e.target.value),
        }));
    }

    return (
        <div className="inputContainer">
            <label>{labelText}</label>
            <input
                className="input"
                type={type}
                placeholder={String(value)}
                onChange={changeHandler}
            />
        </div>
    )
}

export default Input;
