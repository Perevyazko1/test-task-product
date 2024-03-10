import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./FormInputProduct.module.scss"
import {Button, Col, Form, Row} from "react-bootstrap";

interface FormInputProductProps {
    className?: string
    children?: ReactNode
    header: string

}


export const FormInputProduct = memo((props: FormInputProductProps) => {
    const {
        className,
        children,
        header,
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
                <Form.Group className="mt-5" as={Row} controlId="numericInput">
                    <Form.Label column sm="3">Кол-во пачек *</Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" pattern="[0-9]*" inputMode="numeric"/>
                    </Col>
                </Form.Group>

                <Form.Group className="mt-3" as={Row} controlId="singleLineText">
                    <Form.Label column sm="3">Тип упаковки *</Form.Label>
                    <Col sm="9">
                        <Form.Control type="text"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mt-3" controlId="formBasicCheckbox">
                    <Form.Label column sm="3">Архивировано</Form.Label>
                    <Col className="mt-2"  sm="9">
                        <Form.Check
                            type="checkbox"
                            // checked={isChecked}
                            // onChange={handleCheckboxChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="mt-3 mb-5" as={Row} controlId="multiLineText">
                    <Form.Label column sm="3">Описание</Form.Label>
                    <Col sm="9">
                        <Form.Control as="textarea" rows={3}/>
                    </Col>
                </Form.Group>
            </Form>

            <div className={cls.buttonGroup}>
                {children}
            </div>
        </div>
    );
});