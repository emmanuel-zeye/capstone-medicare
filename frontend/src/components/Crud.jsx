import {useMemo, useState} from "react";
import {useCreateMutation, useDeleteMutation, useReadQuery, useUpdateMutation} from "../api/defaultApi.js";
import {Button, Col, Container, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "react-bootstrap";
import {Delete, Edit, PlusCircle} from "react-feather";
import DataTable from "react-data-table-component";
import {toast} from "react-toastify";
import sweetAlert from "sweetalert2";

const Crud = ({schema, enableCreate = true, enableDelete = true, enableEdit = true, enableRead = true}) => {
    const {url = '', schema: actualSchema = [], name: schemaName = '', hasMultipartData} = schema;
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [formData, setFormData] = useState({});
    const {data, isLoading, refetch} = useReadQuery([url, {page, pageSize}], {refetchOnMountOrArgChange: true});
    const [createAsync, {isLoading: isCreating}] = useCreateMutation();
    const [deleteAsync, {isLoading: isDeleting}] = useDeleteMutation();
    const [updateAsync, {isLoading: isUpdating}] = useUpdateMutation();
    const [showModal, setShowModal] = useState(false);

    const onEdit = data => {
        setItemToEdit(data);
        setFormData({...data})
        setShowModal(true);
    }

    const onDelete = data => {
        sweetAlert.fire({
            title: "Are you sure?",
            text: "You are about to delete this " + name,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel please!",
            closeOnConfirm: false,
            closeOnCancel: false
        }).then(resp => {
            if (resp.isConfirmed) return deleteAsync({url, id: data.id})
                .unwrap().then(data => {
                    console.log("Delete data: ", data)
                    toast.success("Deleted successfully");
                })
                .catch(e => {
                    console.error("Deletion failed:", e)
                    toast.error(`Could not delete ${name}. \n${e.data.message}`)
                });
            return undefined;
        })
    }

    const [itemToEdit, setItemToEdit] = useState()

    const columns = useMemo(() => {
        return [
            ...actualSchema.filter(d => d.display).map(s => ({
                name: s.name,
                sortable: true,
                selector: (d) => d[s.code] || '',
                cell: s.onDisplay
            })),
            {
                name: 'Actions',
                cell: (data) => {
                    return <Row>
                        {enableEdit && <Col><Button className='btn btn-link'
                                                    onClick={() => onEdit(data)}><Edit/> Edit</Button></Col>}
                        {enableDelete && <Col><Button className='btn btn-link'
                                                      onClick={() => onDelete(data)}><Delete/> Delete</Button></Col>}
                    </Row>
                }
            }
        ]
    }, [actualSchema]);

    const onAdd = () => {
        setItemToEdit(undefined)
        setFormData({})
        setShowModal(true);
    }

    const onSubmit = (e) => {
        console.log({formData})
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([k, v]) => {
            console.log("Adding", k, v)
            data.append(k, v);
        });
        const finalUrl = hasMultipartData ? `${url}/with-attachments` : url;

        const func = itemToEdit ? updateAsync : createAsync;
        func({url: finalUrl, data: hasMultipartData ? data : formData, id: formData.id}).unwrap()
            .then(() => {
                refetch();
                setShowModal(false)
                setItemToEdit(undefined);
                toast.success(`${name} created successfully`)
            })
            .catch(() => toast.error("Could not create"))
    }

    const onChange = (e) => {
        const {name, value, checked, files, type, selectedOptions} = e.target;
        const mapping = {
            'checkbox': checked,
            'file': files,
            'select-multiple': Array.from(selectedOptions || []).map(option => option.value)
        }
        const v = mapping[type] || value;
        console.log("Handling change", {name, v, type, selectedOptions})
        setFormData(formData => ({...formData, [name]: v}))
    }

    return <Container fluid>
        <Row className='align-items-center justify-content-between'>
            <Col className='text-start'><h2>{schemaName}</h2></Col>
            {enableCreate && <Col className='text-end text-success'><span className='btn-link'
                                                                          onClick={onAdd}><PlusCircle/>Create New</span></Col>}
        </Row>
        <Row className='rounded'>
            <Col>
                {enableRead && <DataTable
                    columns={columns}
                    data={data?.content || []}
                    progressPending={isLoading}
                    onChangeRowsPerPage={size => setPageSize(size)}
                    onChangePage={page => setPage(page - 1)}
                    paginationTotalRows={data?.totalElements}
                    // paginationPerPage={pageSize}
                    // paginationDefaultPage={page}
                    paginationServer
                    pagination
                />}
            </Col>
        </Row>
        <Modal show={showModal} onHide={() => setShowModal(false)} size='xl'>
            <Form onSubmit={onSubmit}>
                <ModalHeader closeButton><h2>{itemToEdit ? "Update" : "Create"} {schemaName}</h2></ModalHeader>
                <ModalBody>

                    <Row>
                        {
                            actualSchema.filter(s => {
                                if (itemToEdit) return true;
                                return s.insertable;
                            }).map(s => <Col key={s.name} md={6} xl={6} sm={12}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>{s.name}</Form.Label>
                                    <s.Component
                                        value={formData[s.code]}
                                        {...(s.props || {})}
                                        name={s.code}
                                        disabled={itemToEdit && !s.updatable}
                                        onChange={onChange}
                                    />
                                </Form.Group>
                            </Col>)
                        }
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <Button type='submit'>{itemToEdit ? "Update" : "Create"}</Button>
                </ModalFooter>
            </Form>
        </Modal>
    </Container>
}

export default Crud;