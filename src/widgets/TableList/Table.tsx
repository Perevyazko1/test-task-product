import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import question from 'shared/icons/question.svg'
import pencil from "shared/icons/pencil.webp"
import delete_icon from "shared/icons/delete.png"
import {Table} from "react-bootstrap";
import cls from "./TableList.module.scss"
import {postApi} from "../../providers/api/RtkService";
import {useAppdispatch, useAppSelector} from "../../shared/lib/hooks/Redux/redux";
import {ProductTypesSlice} from "../../providers/api/slice/ProductTypesSlice";
import {ProductTypes} from "../../providers/api/models/ProductTypes";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import {Confirmation} from "../../shared/ui/Confirmation/Confirmation";
import {ModalTooltype} from "../../shared/ui/ModalTooltype/ModalTooltype";


interface TableProps {
    className?: string
    children?: ReactNode
}


export const TableList = memo((props: TableProps) => {

    const {data, isLoading, error} = postApi.useGetDataQuery({param: "", source: "productTypes"});
    const dispatch = useAppdispatch()
    const {isProductType} = ProductTypesSlice.actions
    const navigate = useNavigate()
    const [showModalConfirm, setShowModalConfirm] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const product = useAppSelector(state => state.ProductTypesSlice)
    useEffect(() => {
        console.log(product)
    }, [product]);

    useEffect(() => {
        console.log(data)
        data && dispatch(isProductType(data))
    }, [data]);
    const handleConConfirmDelete = () => {
        const {data, isLoading, error} = postApi.useGetDataQuery({param: "", source: "productTypes"});
    }
    const handleCloseModalConfirm = () => {
        setShowModal(false)
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }


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
                {data && data
                    .slice() // Создаем копию массива, чтобы избежать изменения исходных данных
                    .sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt))) // Сортируем скопированный массив по дате создания
                    .map((item: ProductTypes, i) => (
                        <tr key={item.id}>
                            <td>{i + 1}</td>
                            <td>{item.packsNumber}</td>
                            <td>{item.packageType}</td>
                            <td>{moment(item.createdAt).format("DD.MM.YYYY")}</td>
                            <td>{item.isArchived ? 'Архив' : 'Активно'}</td>
                            <td><img src={question}
                                     alt="question"
                                     onClick={()=>setShowModal(true)}
                            /></td>
                            <td>
                                <img className={cls.pencil} onClick={() => navigate(`/edit_product`)} src={pencil}/>
                                <img className={cls.delete} onClick={()=>setShowModalConfirm(true)} src={delete_icon}/>
                            </td>
                            <ModalTooltype
                                show={showModal}
                                onHide={handleCloseModal}
                            >
                                <p>{item.packsNumber}</p>
                                <p>{item.packageType}</p>
                                <p>{item.isArchived}</p>
                                <p>{item.description}</p>
                                <p>{item.createdAt}</p>
                            </ModalTooltype>
                        </tr>

                    ))}
                </tbody>
            </Table>
            <Confirmation show={showModalConfirm} onHide={handleCloseModalConfirm} conConfirm={handleConConfirmDelete}/>
        </div>

    );
});