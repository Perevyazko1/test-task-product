import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {PageWrapper} from "../../../shared/ui/PageWrapper/PageWrapper";
import {FormInputProduct} from "../../../shared/ui/FormInputProduct/FormInputProduct";
import cls from "./CreateProductPage.module.scss"
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


interface CreateProductPageProps {
    className?: string
    children?: ReactNode
}


const CreateProductPage = memo((props: CreateProductPageProps) => {
    const navigate = useNavigate()
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
                    <Button className="mr-5" variant="danger">Удалить</Button>
                    <Button
                        className="mx-5"
                        variant="dark"
                        onClick={() => navigate(`/`)}
                    >Отмена
                    </Button>
                    <Button className={cls.button}>Сохранить</Button>
                </FormInputProduct>
            </div>
        </PageWrapper>
    );
});
export default CreateProductPage