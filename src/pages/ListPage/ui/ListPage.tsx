import {memo, ReactNode} from 'react';
import cls from "./ListPage.module.scss"
import {classNames, Mods} from "shared/lib/classNames/classNames";

interface ListPageProps {
    className?: string
    children?: ReactNode
}


const ListPage = memo((props: ListPageProps) => {
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
            Лист Пэйдж
        </div>
    );
});
export default ListPage