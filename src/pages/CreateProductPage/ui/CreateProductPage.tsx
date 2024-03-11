import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {PageWrapper} from "../../../shared/ui/PageWrapper/PageWrapper";
import {FormInputProduct} from "../../../shared/ui/FormInputProduct/FormInputProduct";
import cls from "./CreateProductPage.module.scss"
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Confirmation} from "../../../shared/ui/Confirmation/Confirmation";


interface CreateProductPageProps {
    className?: string
    children?: ReactNode
}


const CreateProductPage = memo((props: CreateProductPageProps) => {
    const navigate = useNavigate()
    const [showModalConfirm, setShowModalConfirm] = useState(false)
    const handleConConfirmDelete = () => {
        navigate(`/`)
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
                        onClick={() => navigate(`/`)}
                    >Отмена
                    </Button>
                    <Button
                        className={cls.button}
                        onClick={() => navigate(`/`)}
                    >Сохранить
                    </Button>
                </FormInputProduct>
            </div>
            <Confirmation show={showModalConfirm} onHide={handleCloseModalConfirm} conConfirm={handleConConfirmDelete}/>

        </PageWrapper>
    );
});
export default CreateProductPage