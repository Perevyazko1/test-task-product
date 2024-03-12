import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {PageWrapper} from "../../../shared/ui/PageWrapper/PageWrapper";
import {Button} from "react-bootstrap";
import {FormInputProduct} from "../../../shared/ui/FormInputProduct/FormInputProduct";
import cls from "./EditProductPage.module.scss"
import {useNavigate, useParams} from "react-router-dom";
import {postApi} from "../../../providers/api/RtkService";
import {typesEdit, TypesEditSlice} from "../../../providers/api/slice/TypesEditSlice";
import {useAppdispatch, useAppSelector} from "../../../shared/lib/hooks/Redux/redux";
import {ProductTypes} from "../../../providers/api/models/ProductTypes";
import {Confirmation} from "../../../shared/ui/Confirmation/Confirmation";

interface CreateProductPageProps {
    className?: string
    children?: ReactNode
}


const EditProductPage = memo((props: CreateProductPageProps) => {
    const navigate = useNavigate()
    const [showModalConfirm, setShowModalConfirm] = useState(false)
    const [disableButton, setDisableButton] = useState(true)


    const dispatch = useAppdispatch()
    const product = useAppSelector(state => state.TypesEditSlice)


    const {id} = useParams()
    const [getUnit, {data, isLoading}] = postApi.useGetUnitMutation();
    const [updateUnit] = postApi.useUpdateUnitMutation()
    const {resetToInitialState} = TypesEditSlice.actions
    const [deleteUnit] = postApi.useDeleteUnitMutation()

    useEffect(() => {
        getUnit({param: `${id}`, source: `productTypes/`})
    }, []);


    useEffect(() => {
        data && !isLoading && dispatch(typesEdit(data))
    }, [data]);
    useEffect(() => {
        if (product.product.packsNumber === 0) {
            setDisableButton(true)
        } else {
            setDisableButton(false)
        }
    }, [product.product.packsNumber]);

    const updatePost = async () => {
        if (product && id) {
            try {
                await updateUnit({id, product: product.product});
                navigate("/")
            } catch (error) {
                console.error('Произошла ошибка при обновлении записи:', error);
            }
        }
    }
    const deletePost = async () => {
        if (id) {
            try {
                await deleteUnit(id);
                dispatch(resetToInitialState())
                navigate(`/`)
            } catch (error) {
                console.error('Произошла ошибка при обновлении записи:', error);

            }

        }
    }

    const handleCloseModalConfirm = () => {
        setShowModalConfirm(false)
        navigate(`/`)
    }


    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {};

    return (
        <PageWrapper>
            <div
                className={classNames(cls.EditProductPage, mods, [className])}
                {...otherProps}
            >{isLoading ? <p>Загрузка...</p> :
                <FormInputProduct data={data} header={"Редактирование типа продукции"}>
                    <Button
                        className="mr-5"
                        variant="danger"
                        onClick={() => setShowModalConfirm(true)}
                    >Удалить
                    </Button>

                    <Button
                        className={classNames(cls.button, {}, ["mx-5"])}
                        onClick={updatePost}
                        disabled={disableButton}
                    >Создать
                    </Button>
                    <Button
                        className="mx-5"
                        variant="dark"
                        onClick={() => navigate(`/`)}
                    >Отмена
                    </Button>
                </FormInputProduct>

            }

                <Confirmation show={showModalConfirm} onHide={handleCloseModalConfirm}
                              conConfirm={deletePost}/>

            </div>

        </PageWrapper>
    );
});
export default EditProductPage