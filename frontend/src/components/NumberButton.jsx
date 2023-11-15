import {Button, FormControl, InputGroup} from "react-bootstrap";
import {Minus, Plus} from "react-feather";
import * as PropTypes from "prop-types";

export function NumberButton({increment, decrement, value}) {
    return <InputGroup className="mt-3">
        <Button variant="secondary" onClick={decrement}><Minus/></Button>
        <FormControl className="text-center" value={value} readOnly/>
        <Button variant="secondary" onClick={increment}><Plus/></Button>
    </InputGroup>;
}

NumberButton.propTypes = {
    increment: PropTypes.func,
    value: PropTypes.number,
    decrement: PropTypes.func
};