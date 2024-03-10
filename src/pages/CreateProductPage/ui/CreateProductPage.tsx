import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";


interface CreateProductPageProps {
    className?: string
    children?: ReactNode
}


const CreateProductPage = memo((props: CreateProductPageProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames('', mods, [className])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
export default CreateProductPage