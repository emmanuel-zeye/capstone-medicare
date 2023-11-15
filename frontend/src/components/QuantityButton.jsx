import * as PropTypes from "prop-types";
import {useProductActions} from "../hooks/useQuantityChange.jsx";
import {NumberButton} from "./NumberButton.jsx";

export function QuantityButton({product, quantity}) {

    const {handleIncrement, handleDecrement} = useProductActions(product)

    return <NumberButton value={quantity} increment={handleIncrement} decrement={handleDecrement} />;
}

QuantityButton.propTypes = {
    product: PropTypes.object,
    quantity: PropTypes.number,
};