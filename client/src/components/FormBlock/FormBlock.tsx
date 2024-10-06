import { FC, PropsWithChildren } from "react";
import cn from 'classnames';

import './FormBlock.css';

interface props extends PropsWithChildren {
    className?: string;
}

const FormBlock: FC<props> = ( { className, children }) => {

    return (
        <div className={ cn(className, 'form-block') }>
            {children}
        </div>
    )
}

export default FormBlock;