import React from "react";
import type { FC } from "react";
import Input from "../Input";

import './Form.css';
import { cardSide, cardStateName } from "../commonTypes";
import FileInput from "../FileInput/FileInput";

const Form: FC = () => {

    // TODO: добавить селекторы

    return (
        <section className="container">
            <form className="form" onSubmit={() => "handleSubmit"}>
                <div className="form-group">
                <label>Формат бумаги: </label>
                    <select value={"paperSize"} onChange={(e) => null}>
                        <option value="A5">A5</option>
                        <option value="A4">A4</option>
                        <option value="A3">A3</option>
                        <option value="A2">A2</option>
                        <option value="A1">A1</option>
                        <option value="A0">A0</option>
                    </select>
                </div>
                <div className="form-group">
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
                        stateName={cardStateName.rightMargin}
                        labelText="Отступ между визитками снизу: "
                    />
                </div>
                <div className="form-files-group">
                    <FileInput type={cardSide.front} />
                    <FileInput type={cardSide.back} />
                </div>

                <button className="submit-button" type="submit">Сгенерировать PDF</button>
            </form>
        </section>
    );
};

export default Form;
