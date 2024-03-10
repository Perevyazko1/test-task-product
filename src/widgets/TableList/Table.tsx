import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import question from 'shared/icons/question.svg'
import {Table} from "react-bootstrap";
import cls from "./TableList.module.scss"


interface TableProps {
    className?: string
    children?: ReactNode
}


export const TableList = memo((props: TableProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {};

    return (
        <div
            className={classNames(cls.TableList, mods, [className])}
            {...otherProps}
        >
            <Table
                className={"table color: red; --bs-table-striped-color: red;"}

            >
                <thead>
                <tr className={"text-muted"}>
                    <th>№</th>
                    <th>Кол-во пачек</th>
                    <th>Тип упаковки</th>
                    <th>Дата создания</th>
                    <th>Статус</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>20</td>
                    <td>компрессия</td>
                    <td>01.02.2024</td>
                    <td>Активно</td>
                    <td><img src={question} alt="question"/></td>
                    <td> </td>
                </tr>
                </tbody>
            </Table></div>
    );
});