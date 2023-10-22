import {Button, Card, FormControl, InputGroup} from "react-bootstrap";
import styles from './storeProduct.module.css'
import logo from "../assets/react.svg";
import {useCreateMutation} from "../api/defaultApi.js";
import {toast} from "../utils/index.js";
import {Minus, Plus} from "react-feather";

const StoreProduct = ({product, orderItem}) => {
    const [addProductToCart,] = useCreateMutation()

    const {name, imageUrl, description} = product;
    const onLoadFailed = (e) => {
        console.log("Image loading failed", e.target);
        e.target.src = logo;
    }

    const addToCart = (quantity=1) => {
        addProductToCart({
            url: '/order-items', data: {
                product,
                quantity
            }
        })
            .unwrap()
            .then(() => toast.success("Added to cart"))
            .catch(() => toast.error("Could not add to cart"))
    }

    const handleIncrement = () => addToCart(1)
    const handleDecrement = ()=> addToCart(-1)


    return (
        <Card
            className="product-card"
        >
            <img src={imageUrl || logo} alt={name} className={styles.productImage} onError={onLoadFailed}/>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>

                {
                    orderItem ?  <InputGroup className='mt-3'>
                    <Button variant="secondary" onClick={handleDecrement}><Minus /></Button>
                    <FormControl className='text-center' value={orderItem?.quantity} readOnly />
                    <Button variant="secondary" onClick={handleIncrement}><Plus /></Button>
                </InputGroup> : <Button variant="primary" onClick={()=>addToCart(1)}>
                        Add to cart
                    </Button>
                }
            </Card.Body>
        </Card>
    );
}

export default StoreProduct;