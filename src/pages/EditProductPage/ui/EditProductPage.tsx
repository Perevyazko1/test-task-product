import {memo, ReactNode, useEffect} from 'react';
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

interface CreateProductPageProps {
    className?: string
    children?: ReactNode
}


const EditProductPage = memo((props: CreateProductPageProps) => {
    const navigate = useNavigate()
        const dispatch = useAppdispatch()
        const product = useAppSelector(state => state.TypesEditSlice)



        const {id} = useParams()
    const {data, isLoading, error} = postApi.useGetUnitQuery({param: "", source: `productTypes/${id}`});
    const [updateUnit] = postApi.useUpdateUnitMutation()
    useEffect(() => {
        data && dispatch(typesEdit(data))
    }, [data]);
    const updatePost = async () => {
  if (product && id) {
    try {
      const result = await updateUnit({ id, product:product.product });
      console.log('Успешно обновлено:', result);
    } catch (error) {
      console.error('Произошла ошибка при обновлении записи:', error);
    }
  }
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
            >
                <FormInputProduct data={product} header={"Редактирование типа продукции"}>
                    <Button
                        className={classNames(cls.button, {}, ["mx-5"])}
                        onClick={updatePost}
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