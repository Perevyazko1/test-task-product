import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./FormInputProduct.module.scss"
import {Button, Col, Form, Row} from "react-bootstrap";
import {ProductTypes} from "../../../providers/api/models/ProductTypes";
import {SliceProductEdit, TypesEditSlice} from "../../../providers/api/slice/TypesEditSlice";
import {useAppdispatch, useAppSelector} from "../../lib/hooks/Redux/redux";
import {useParams} from "react-router-dom";
import {postApi} from "../../../providers/api/RtkService";

interface FormInputProductProps {
    className?: string
    children?: ReactNode
    header: string
    data?: SliceProductEdit

}


export const FormInputProduct = memo((props: FormInputProductProps) => {
    const dispatch = useAppdispatch()

    const {packsNumber} = TypesEditSlice.actions
    const {packageType} = TypesEditSlice.actions
    const {isArchived} = TypesEditSlice.actions
    const {description} = TypesEditSlice.actions
    const [valueInputPacksNumber, setValueInputPacksNumber] = useState("")
    const [isInputQuantityEmpty, setIsInputQuantityEmpty] = useState<boolean>()



    const handleInputChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(packsNumber(Number(event.target.value)))
        setValueInputPacksNumber(String(event.target.value));
        if(event.target.value === ""){
            setIsInputQuantityEmpty(true)
        }else {
            setIsInputQuantityEmpty(false)
        }

    };
    useEffect(() => {
        if(data){
            setValueInputPacksNumber(String(data?.product.packsNumber))
            setIsInputQuantityEmpty(false)
        }else {
            setIsInputQuantityEmpty(true)
        }
    }, []);

    const {
        className,
        children,
        header,
        data,
        ...otherProps
    } = props

    const mods: Mods = {};

    return (
        <div
            className={classNames(cls.FormInputProduct, mods, [className])}
            {...otherProps}
        >
            <div className={cls.header}>{header}</div>
            <Form>
                <Form.Group className="mt-5 " as={Row} controlId="numericInput">
                    <Form.Label column sm="3">Кол-во пачек *</Form.Label>
                    <Col sm="9">
                        <Form.Control onChange={handleInputChangeQuantity}
                                      isInvalid={isInputQuantityEmpty} type="text"
                                      pattern="[0-9]*" inputMode="numeric"
                                      value={valueInputPacksNumber}

                        />
                    </Col>
                </Form.Group>

                <Form.Group className="mt-3" as={Row} controlId="singleLineText">
                    <Form.Label column sm="3">Тип упаковки *</Form.Label>
                    <Col sm="9">
                        <Form.Select
                            value={data?.product.packageType}
                            onChange={(event) => dispatch(packageType(event.target.value))}

                        >
                            <option value="компрессия">компрессия</option>
                            <option value="не компрессия">не компрессия</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mt-3" controlId="formBasicCheckbox">
                    <Form.Label column sm="3">Архивировано</Form.Label>
                    <Col className="mt-2" sm="9">
                        <Form.Check
                            type="checkbox"
                            checked={data?.product.isArchived}
                            onChange={(event) => dispatch(isArchived(event.target.checked))}
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="mt-3 mb-5" as={Row} controlId="multiLineText">
                    <Form.Label column sm="3">Описание</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={data?.product.description}
                            onChange={(event) => dispatch(description(event.target.value))}

                        />
                    </Col>
                </Form.Group>
            </Form>

            <div className={cls.buttonGroup}>
                {children}
            </div>
        </div>
    );
});