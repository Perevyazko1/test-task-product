import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {Button, Modal} from "react-bootstrap";

interface ConfirmationProps {
    className?: string
    children?: ReactNode
    show: boolean
    onHide: () => void
    conConfirm: () => void


}


export const Confirmation = memo((props: ConfirmationProps) => {
    const {
        className,
        children,
        show,
        onHide,
        conConfirm,
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
                    <Modal.Title>Подтверждение удаления</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы уверены, что хотите удалить данные?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Нет
                    </Button>
                    <Button variant="danger" onClick={conConfirm}>
                        Да
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});