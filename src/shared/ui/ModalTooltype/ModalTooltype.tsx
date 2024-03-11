import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {Button, Modal} from "react-bootstrap";

interface ModalTooltypeProps {
    className?: string
    children?: ReactNode
    show: boolean
    onHide?: () => void


}


export const ModalTooltype = memo((props: ModalTooltypeProps) => {
    const {
        className,
        children,
        show,
        onHide,
        ...otherProps
    } = props

    const mods: Mods = {};

    return (
        <div
            className={classNames('', mods, [className])}
            {...otherProps}
        >
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Описание</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
            </Modal>
        </div>
    );
});