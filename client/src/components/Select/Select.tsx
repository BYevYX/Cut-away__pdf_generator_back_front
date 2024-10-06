import { FC } from "react";

import './Select.css';
import { useDispatch, useSelector } from "react-redux";
import { selectPaperFormat } from "../../Redux/features/paperFormatSlice/selectors";
import { changeFormat } from "../../Redux/features/paperFormatSlice/paperFormatSlice";
import { PaperSize } from "../../App/App.types";

interface props {
    options?: string[];
}

const Select: FC<props> = ( { options }) => {
    const format = useSelector(selectPaperFormat);
    const dispatch = useDispatch();

    const selectOptions = options || ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'];

    const changeHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        dispatch(changeFormat({ format: e.target.value as PaperSize }));
    }

    return (
        <div className="select-container">
            <label>Формат бумаги: </label>
            <select value={format} onChange={changeHandler}>
                {selectOptions.map(( val ) => (
                    <option value={val}>{val}</option>
                ))}
            </select>
        </div>
    )
}

export default Select;
