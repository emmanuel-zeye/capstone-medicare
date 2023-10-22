import {FormSelect} from "react-bootstrap";
import {useReadQuery} from "../api/defaultApi.js";

const CategoryPicker = (props) => {
    const {data} = useReadQuery(['product-categories/all'])

    return <>
        <FormSelect {...props}>
            {
                data?.map(({id, name}) => <option value={id} key={id}>{name}</option>)
            }
        </FormSelect>
    </>
}

export default CategoryPicker;