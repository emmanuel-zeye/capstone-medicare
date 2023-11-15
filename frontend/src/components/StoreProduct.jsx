import {Button, Card} from "react-bootstrap";
import styles from './storeProduct.module.css'
import logo from "../assets/react.svg";
import {useProductActions} from "../hooks/useQuantityChange.jsx";
import * as PropTypes from "prop-types";
import {QuantityButton} from "./QuantityButton.jsx";


const StoreProduct = ({product, orderItem}) => {
    const {addToCart} = useProductActions(product);

    const {name, imageUrl, description} = product;
    const onLoadFailed = (e) => {
        console.log("Image loading failed", e.target);
        e.target.src = logo;
    }

    return (
        <Card
            className="product-card"
        >
            <img src={imageUrl || logo} alt={name} className={styles.productImage} onError={onLoadFailed}/>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>

                {
                    orderItem ?  <QuantityButton quantity={orderItem.quantity} product={product}/>
                        : <Button variant="primary" onClick={()=>addToCart(1)}>
                        Add to cart
                    </Button>
                }
            </Card.Body>
        </Card>
    );
}

export default StoreProduct;