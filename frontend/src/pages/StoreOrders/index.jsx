import StoreLayout from "../../layout/StoreLayout.jsx";
import {useReadQuery} from "../../api/defaultApi.js";
import {useMemo} from "react";
import {Button, Col, Container, Form, FormControl, FormSelect, Image, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import {Link, useNavigate} from "react-router-dom";

const StoreCart = () => {

    const navigate = useNavigate();

    const {data: orders,isLoading} = useReadQuery(['orders', {}], {refetchOnMountOrArgChange: true});
    const {data: orderItems} = useReadQuery(['orders-items/all', {}], {refetchOnMountOrArgChange: true});

    console.log("Orders are ", orders?.content);
    const columns = useMemo(() => {
        return [
            {
                name: "Order Date",
                sortable: true,
                selector: ({createdAt}) => createdAt,
            },
            {
                name: "Total Cost",
                sortable: true,
                selector: ({orderItems}) => orderItems.reduce((prev, curr) => prev+(curr.price*curr.quantity), 0),
            },
            {
                name: "Status",
                sortable: true,
                selector: ({status}) => status,
            },
            {
                name: "Products",
                selector: ({product}) => product,
                cell: ({orderItems}) => <ul>
                    {
                        orderItems.map(({product}) => <li key={product.id}>{product.name}</li>)
                    }
                </ul>
            }
        ]
    }, []);

    // console.log({products})
    return <StoreLayout cartCount={orderItems?.length}>
        <Container>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <h2>Orders</h2>
            </div>

            <Row>
                <Col>
                    <DataTable
                        columns={columns}
                        data={orders?.content || []}
                        progressPending={isLoading}
                        paginationTotalRows={orders?.length}
                        pagination
                    />
                </Col>
            </Row>
        </Container>

    </StoreLayout>
}

export default StoreCart;