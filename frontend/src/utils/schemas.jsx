import {FormCheck, FormControl, FormSelect, Image} from "react-bootstrap";
import CategoryPicker from "../components/CategoryPicker.jsx";

const defaultSchema = [
    {
        code: 'id',
        name: 'ID',
        updatable: false,
        insertable: false,
        display: false,
        Component: FormControl,
        props: {type: 'text'},
    },
    {
        code: 'createdAt',
        name: 'Date Created',
        updatable: false,
        insertable: false,
        display: true,
        Component: FormControl,
        props: {type: 'text'},
    },
    {
        code: 'createdBy',
        name: 'Created By',
        updatable: false,
        insertable: false,
        display: true,
        Component: FormControl,
        props: {type: 'text'},
    },
]
export const productSchema = {
    name: 'Products',
    url: 'products',
    hasMultipartData: false,
    schema: [
        {
            code: 'name',
            name: 'Name',
            updatable: true,
            insertable: true,
            display: true,
            Component: FormControl,
            props: {type: 'text'},
        },
        {
            code: 'description',
            name: 'Description',
            updatable: true,
            insertable: true,
            display: true,
            Component: FormControl,
            props: {as: 'textarea', row: 3},
        },
        {
            code: 'quantity',
            name: 'Quantity',
            display: true,
            updatable: true,
            insertable: true,
            Component: FormControl,
            props: {type: 'number'},
        },
        {
            code: 'price',
            name: 'Price (GHS)',
            display: true,
            updatable: true,
            insertable: true,
            Component: FormControl,
            props: {type: 'number'},
        },
        {
            code: 'categories',
            name: 'Categories',
            updatable: true,
            display: true,
            insertable: true,
            Component: CategoryPicker,
            onDisplay: (row) => <div>{row.categories.map(({id,name}) => <div key={id}>{name}</div>)}</div>,
            props: {multiple: true},
        },
        {
            code: 'imageUrl',
            name: 'Image',
            updatable: true,
            display: true,
            insertable: true,
            Component: FormControl,
            onDisplay: (row) => <><Image src={row.imageUrl} width={100} height={100} /></>,
            props: {type: 'text'},
        },
        ...defaultSchema
    ]
}

export const productCategoriesSchema = {
    name: 'Product Category',
    url: 'product-categories',
    hasMultipartData: false,
    schema: [
        {
            code: 'name',
            name: 'Name',
            updatable: true,
            insertable: true,
            display: true,
            Component: FormControl,
            props: {type: 'text'},
        },
        ...defaultSchema
    ]
}

export const orderSchema = {
    name: 'Orders',
    url: 'orders',
    hasMultipartData: false,
    schema: [
        {
            code: 'name',
            name: 'Name',
            updatable: true,
            insertable: true,
            display: true,
            Component: FormControl,
            props: {type: 'text'},
        },
        ...defaultSchema
    ]
}
export const userSchema = {
    name: 'User',
    url: 'users',
    hasMultipartData: false,
    schema: [
        {
            code: 'firstName',
            name: 'First Name',
            updatable: true,
            insertable: true,
            display: true,
            Component: FormControl,
            props: {type: 'text'},
        },
        {
            code: 'lastName',
            name: 'Last Name',
            updatable: true,
            insertable: true,
            display: true,
            Component: FormControl,
            props: {type: 'text'},
        },
        {
            code: 'email',
            name: 'Email',
            updatable: true,
            insertable: true,
            display: true,
            Component: FormControl,
            props: {type: 'text'},
        },
        {
            code: 'phoneNumber',
            name: 'Phone Number',
            updatable: true,
            insertable: true,
            display: true,
            Component: FormControl,
            props: {type: 'text'},
        },
        {
            code: 'enabled',
            name: '',
            updatable: true,
            insertable: true,
            display: true,
            Component: FormCheck,
            props: {type: 'switch', label: 'User Enabled'},
        },
        {
            code: 'password',
            name: 'Password',
            updatable: false,
            insertable: true,
            display: false,
            Component: FormControl,
            props: {type: 'text'},
        },
        {
            code: 'userType',
            name: 'User Role',
            updatable: true,
            insertable: true,
            display: true,
            Component: FormSelect,
            props: {as: 'select', children: [<><option hidden>Select...</option>{['admin', 'customer'].map(d=> <option key={d} value={d}>{d}</option>)}</>]},
        },
        ...defaultSchema
    ]
}


