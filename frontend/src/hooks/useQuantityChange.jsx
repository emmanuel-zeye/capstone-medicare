import {toast} from "../utils/index.js";
import {useCreateMutation} from "../api/defaultApi.js";

export const useProductActions = (product) => {
    const [addProductToCart,] = useCreateMutation()

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

    return {
        addToCart,
        handleIncrement,
        handleDecrement
    }
}
