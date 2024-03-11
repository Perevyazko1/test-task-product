import {memo, ReactNode, useEffect} from 'react';
import cls from "./ListPage.module.scss"
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {PageWrapper} from "../../../shared/ui/PageWrapper/PageWrapper";
import {TableList} from "../../../widgets/TableList/Table";
import {Button} from "react-bootstrap";
import {postApi} from "../../../providers/api/RtkService";
import {useAppdispatch} from "../../../shared/lib/hooks/Redux/redux";
import {ProductTypesSlice} from "../../../providers/api/slice/ProductTypesSlice";

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

    const mods: Mods = {};


    return (
        <PageWrapper>
            <div
                className={classNames(cls.ListPage, mods, [className])}
                {...otherProps}
            >
                <div className={cls.headerBlock}>
                    <div className={cls.header}>Список выпускаемой продукции</div>
                    <Button className={cls.button}>Создать тип продукции</Button>

                </div>
                <TableList/>
            </div>
        </PageWrapper>
    );
});
export default ListPage