import StoreLayout from "../../layout/StoreLayout.jsx";
import {useCheckoutMutation, useReadQuery} from "../../api/defaultApi.js";
import {useCallback, useMemo, useState} from "react";
import {Button, Col, Container, Form, FormControl, FormSelect, Image, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "../../utils/index.js";

const StoreCart = () => {

    const [checkoutData,setCheckoutData] = useState({})
    const [checkoutAsync] = useCheckoutMutation();
    const navigate = useNavigate();

    const {data: orderItems,isLoading} = useReadQuery(['order-items/all', {}], {refetchOnMountOrArgChange: true});

    const columns = useMemo(() => {
        return [
            {
                name: "Product",
                sortable: true,
                selector: ({product}) => product.name || '',
                cell: ({product}) => <div>
                    <Image src={product.imageUrl} width={70} height={70}/>
                </div>,
            },
            {
                name: "Price",
                sortable: true,
                selector: ({product, quantity}) => <div>{product.price} x {quantity} = {product.price * quantity}</div>,
            }
        ]
    }, []);

    const pay = useCallback(()=>{
        checkoutAsync(checkoutData).unwrap()
            .then(()=> {
                toast.success("Checkout complete")
                navigate('/store/products');
            })
            .catch(error=>console.error("Error checking out", error));
    },[checkoutData]);

    const onUpdate = (e) => {
        const {name,value} = e.target;
        setCheckoutData(data => {
            return {...data,[name]: value};
        })
    }

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
                <Link to='/store/cart'><h3>Go Back</h3></Link>
                <h2>Checkout</h2>
            </div>

            <Row>
                <h2>Address Information</h2>
                <Col xs={8}>
                    <Form.Group className="mb-3">
                        <Form.Label>Street</Form.Label>
                        <FormControl type='text' name='street' onChange={onUpdate} value={checkoutData['street']} />
                        <Form.Label>City</Form.Label>
                        <FormControl type='text' name='city'  onChange={onUpdate} value={checkoutData['city']} />
                        <Form.Label>Country</Form.Label>
                        <FormControl type='text' name='country' onChange={onUpdate} value={checkoutData['country']}  />
                        <Form.Label>State</Form.Label>
                        <FormControl type='text' name='state'  onChange={onUpdate} value={checkoutData['state']} />
                    </Form.Group>
                </Col>
                <Col xs={4}>
                    <DataTable
                        columns={columns}
                        data={orderItems || []}
                        progressPending={isLoading}
                        paginationTotalRows={orderItems?.length}
                        pagination
                    />
                    <h4>Total Cost: {totalCost}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Payment Information</h2>
                    <Form.Group className="mb-3">
                        <Row>
                            <Col xs={4}>
                                <Form.Label>Payment Channel</Form.Label>
                                <FormSelect type='select' required name='paymentChannel'value={checkoutData['paymentChannel']}  onChange={onUpdate} >
                                    <option hidden>Select One</option>
                                    <option value='visa'>VISA</option>
                                    <option value='mastercard'>Mastercard</option>
                                </FormSelect>
                            </Col>
                            <Col xs={4}>
                            <Form.Label>Payment Card/Account</Form.Label>
                            <FormControl required type='text' name='paymentAccount' value={checkoutData['paymentAccount']} onChange={onUpdate} />
                        </Col>
                            <Col xs={4}>
                            <Form.Label>CVV/CVC</Form.Label>
                            <FormControl required type='password' name='cvv'  />
                        </Col>
                    </Row>
        </Form.Group>
                </Col>
            </Row>

            {orderItems?.length > 0 && <Button className='my-3' onClick={pay}>Pay</Button>}
        </Container>

    </StoreLayout>
}

export default StoreCart;