import StoreLayout from "../../layout/StoreLayout.jsx";
import {useReadQuery} from "../../api/defaultApi.js";
import {useMemo} from "react";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import {Delete} from "react-feather";
import {QuantityButton} from "../../components/QuantityButton.jsx";
import {Link} from "react-router-dom";

const StoreCart = () => {

    const {data: orderItems,isLoading} = useReadQuery(['order-items/all', {}], {refetchOnMountOrArgChange: true});

    const columns = useMemo(() => {
        return [
            {
                name: "Product Name",
                sortable: true,
                selector: ({product}) => product.name || '',
            },
            {
                name: "Product Image",
                sortable: true,
                selector: ({product}) => product.name || '',
                cell: ({product}) => <><Image src={product.imageUrl} width={100} height={100}/></>,
            },
            {
                name: "Unit Price",
                sortable: true,
                selector: ({product}) => product.price || '',
            },
            {
                name: "Quantity",
                sortable: true,
                selector: ({quantity}) => quantity || '',
                cell: ({product,quantity}) => <QuantityButton quantity={quantity} product={product}/>
            },
            {
                name: "Total Cost",
                sortable: true,
                selector: ({quantity, product: {price}}) => quantity*price || '',
            },
            // {
            //     name: 'Actions',
            //     cell: (data) => {
            //         return <Row>
            //         {/*<Col><Button className='btn btn-link'*/}
            //         {/*                                  onClick={() => onDelete(data)}><Delete/> Delete</Button></Col>*/}
            //         </Row>
            //     }
            // }
        ]
    }, []);

    const totalCost = useMemo(()=>{
        let sum = 0;
        orderItems?.forEach(({quantity,product}) => {
            sum += (quantity*product.price)
        })
        return "GHS " + sum.toFixed(2);
    },[orderItems]);

    // console.log({products})
    return <StoreLayout cartCount={orderItems?.length}>
        <Container>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Link to='/store/products'><h3>Go Back</h3></Link>
                <h2>Cart</h2>
                <h2>Total Cost: {totalCost}</h2>
            </div>
            <DataTable
                columns={columns}
                data={orderItems || []}
                progressPending={isLoading}
                paginationTotalRows={orderItems?.length}
                pagination
                // onChangeRowsPerPage={size => setPageSize(size)}
                // onChangePage={page => setPage(page - 1)}
                // paginationPerPage={pageSize}
                // paginationDefaultPage={page}
                // paginationServer
            />
            {orderItems?.length > 0 && <Link to='/store/checkout' className='btn btn-primary my-5'>Checkout</Link>}
        </Container>

    </StoreLayout>
}

export default StoreCart;