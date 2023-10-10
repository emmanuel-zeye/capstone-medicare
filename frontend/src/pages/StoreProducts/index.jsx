import StoreLayout from "../../layout/StoreLayout.jsx";
import {useReadQuery} from "../../api/defaultApi.js";
import {useState} from "react";
import styles from './storeProducts.module.css';
import StoreProduct from "../../components/StoreProduct.jsx";
import {Container} from "react-bootstrap";

const StoreProducts = ()=> {

    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(30)

    const{data: products, isLoading, refetch} = useReadQuery(['products',{page,pageSize}], {refetchOnMountOrArgChange: true} );

    // console.log({products})
    return <StoreLayout>
<section></section>
        <Container>
            <section className={styles.storeProductsGrid}>
                {
                    products.content?.map(product => {
                        return <StoreProduct key={product.id} product={product} />
                    })
                }
            </section>
        </Container>

    </StoreLayout>
}

export default StoreProducts;