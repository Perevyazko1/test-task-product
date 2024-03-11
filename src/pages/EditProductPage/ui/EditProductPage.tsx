import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {PageWrapper} from "../../../shared/ui/PageWrapper/PageWrapper";
import {Button} from "react-bootstrap";
import {FormInputProduct} from "../../../shared/ui/FormInputProduct/FormInputProduct";
import cls from "./EditProductPage.module.scss"
import {useNavigate} from "react-router-dom";
import {Confirmation} from "../../../shared/ui/Confirmation/Confirmation";
import {postApi} from "../../../providers/api/RtkService";

interface CreateProductPageProps {
    className?: string
    children?: ReactNode
}


const EditProductPage = memo((props: CreateProductPageProps) => {
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
                className={classNames(cls.EditProductPage, mods, [className])}
                {...otherProps}
            >
                <FormInputProduct header={"Редактирование типа продукции"}>
                    <Button
                        className={classNames(cls.button, {}, ["mx-5"])}
                        onClick={() => navigate(`/`)}
                    >Создать
                    </Button>
                    <Button
                        className="mx-5"
                        variant="dark"
                        onClick={() => navigate(`/`)}
                    >Отмена
                    </Button>
                </FormInputProduct>
            </div>

        </PageWrapper>
    );
});
export default EditProductPage