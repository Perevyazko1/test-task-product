import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {PageWrapper} from "../../../shared/ui/PageWrapper/PageWrapper";
import {FormInputProduct} from "../../../shared/ui/FormInputProduct/FormInputProduct";
import cls from "./CreateProductPage.module.scss"
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Confirmation} from "../../../shared/ui/Confirmation/Confirmation";
import {useAppSelector} from "../../../shared/lib/hooks/Redux/redux";
import {postApi} from "../../../providers/api/RtkService";
import {TypesEditSlice} from "../../../providers/api/slice/TypesEditSlice";
import {useDispatch} from "react-redux";


interface CreateProductPageProps {
    className?: string
    children?: ReactNode
}


const CreateProductPage = memo((props: CreateProductPageProps) => {
    const [createUnit, {data, isLoading, error}] = postApi.useCreateUnitMutation()
    const navigate = useNavigate()
    const [showModalConfirm, setShowModalConfirm] = useState(false)
    const product = useAppSelector(state => state.TypesEditSlice)
    const [disableButton, setDisableButton] = useState(true)
    const dispatch = useDispatch()
    const {resetToInitialState} = TypesEditSlice.actions

    const createPost = async () => {

        if (product) {
            try {
                await createUnit(product)
                navigate("/")

            } catch (error) {
                console.error('Произошла ошибка при обновлении записи:', error);
            }

        }
    }

    const handleConConfirmDelete = () => {
        dispatch(resetToInitialState())
        navigate(`/`)
    }
    const handleCloseModalConfirm = () => {
        setShowModalConfirm(false)
        navigate(`/`)
    }
    useEffect(() => {
        if (product.product.packsNumber === 0) {
            setDisableButton(true)
        } else {
            setDisableButton(false)
        }
    }, [product.product.packsNumber]);

    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {};

    return (
        <PageWrapper>
            <div
                className={classNames(cls.CreateProductPage, mods, [className])}
                {...otherProps}
            >
                <FormInputProduct header={"Создание типа продукции"}>
                    <Button
                        className="mr-5"
                        variant="danger"
                        onClick={() => setShowModalConfirm(true)}
                    >Удалить
                    </Button>
                    <Button
                        className="mx-5"
                        variant="dark"
                        onClick={() => {navigate(`/`); dispatch(resetToInitialState())}}
                    >Отмена
                    </Button>
                    <Button
                        className={cls.button}
                        onClick={createPost}
                        disabled={disableButton}
                    >Сохранить
                    </Button>
                </FormInputProduct>
            </div>
            <Confirmation show={showModalConfirm} onHide={handleCloseModalConfirm} conConfirm={handleConConfirmDelete}/>

        </PageWrapper>
    );
});
export default CreateProductPage