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

    const [getData, {data, isLoading}] = postApi.useGetDataMutation();
    const dispatch = useAppdispatch()
    const {isProductType} = ProductTypesSlice.actions
    const navigate = useNavigate()
    const [showModalConfirm, setShowModalConfirm] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const product = useAppSelector(state => state.ProductTypesSlice)
    const [deleteUnit] = postApi.useDeleteUnitMutation()
    const [clickId, setClickId] = useState("")


    const fetchData = async () => {
        try {
            await getData({param: "", source: "productTypes"});
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData()
    }, [showModalConfirm]);

    const deletePost = async (id: string) => {
        try {
            await id && deleteUnit(id);
            setShowModalConfirm(false)
        } catch (error) {
            console.error('Произошла ошибка при обновлении записи:', error);

        }
    }

    useEffect(() => {
        data && dispatch(isProductType(data))
    }, [data]);
    const handleCloseModalConfirm = () => {
        setShowModalConfirm(false)
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
        >{isLoading ?
            <p>Идет загрузка</p> :
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
                {product && product.product
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
                                     onClick={() => {setShowModal(true); setClickId(item.id)}}
                            /></td>
                            <td>
                                <img className={cls.pencil} onClick={() => navigate(`/edit_product/${item.id}`)}
                                     src={pencil}/>
                                <img className={cls.delete} onClick={() => {setShowModalConfirm(true); setClickId(item.id)}}
                                     src={delete_icon}/>
                            </td>
                        </tr>
                    ))}

                </tbody>
                <ModalTooltype
                    show={showModal}
                    onHide={handleCloseModal}
                >
                    {product && product.product
                    .filter((item) => item.id === clickId)
                        .map((i)=>(
                            <>
                                <p>Кол-во пачек: {i.packsNumber}</p>
                                <p>Тип упаковки: {i.packageType}</p>
                                 <p>Архив: {i.isArchived ? 'Архив' : 'Активно'}</p>
                                 <p>Описание: {i.description}</p>
                                 <p>Дата создания: {moment(i.createdAt).format("DD.MM.YYYY")}</p>

                            </>
                        ))

                    }
                </ModalTooltype>
                <Confirmation show={showModalConfirm}
                              onHide={handleCloseModalConfirm}
                              conConfirm={() => deletePost(clickId)}
                />

            </Table>

        }
        </div>

    );
});