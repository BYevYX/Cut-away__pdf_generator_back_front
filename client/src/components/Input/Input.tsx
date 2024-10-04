import React from "react";
import { useDispatch } from "react-redux";
import type { FC } from "react";

import { cardStateName } from "../commonTypes";
import { changeCardState } from "../../Redux/features/cardSize/cardSizeSlice";

import './Input.css';

interface props {
    stateName: cardStateName;
    labelText: string;
    type?: string;
}
// TODO доставать value из стейта
const Input: FC<props> = ({ stateName, labelText, type = "number" }) => {
    const dispatch = useDispatch();

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
                // value={value}
                onChange={changeHandler}
            />
        </div>
    )
}

export default Input;
