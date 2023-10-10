import {Button, Card, Image, OverlayTrigger, Tooltip} from "react-bootstrap";
import styles from './storeProduct.module.css'
import logo from "../assets/react.svg";

const StoreProduct = ({product})=>{
    console.log({product})

    const {name, imageUrl, description}=product;
    const onLoadFailed = (e)=>{
        console.log("Image loading failed", e.target);
        // e.target.src = logo;
        e.target.src = 'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?w=740&t=st=1696563778~exp=1696564378~hmac=cdffbcd06ad9fd51adbb17dbd7ed5f38e17e1c9ee2108a682969d9c079545fc9';
    }
    return (
        <Card
            className="product-card"
        >
            <img src={imageUrl || logo} alt={name} className={styles.productImage} onError={onLoadFailed} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button variant="primary">
                    Buy
                </Button>
            </Card.Body>
        </Card>
    );
}

export default StoreProduct;