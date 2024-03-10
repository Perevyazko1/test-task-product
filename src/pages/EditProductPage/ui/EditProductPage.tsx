import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {PageWrapper} from "../../../shared/ui/PageWrapper/PageWrapper";

interface CreateProductPageProps {
    className?: string
    children?: ReactNode
}


const EditProductPage = memo((props: CreateProductPageProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <PageWrapper>
            <div
                className={classNames('', mods, [className])}
                {...otherProps}
            >
                {children}
                Эдит
            </div>
        </PageWrapper>
    );
});
export default EditProductPage