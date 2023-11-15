import {useSignupMutation} from "../api/authApi.js";
import {useState} from "react";
import {Button, Card, CardBody, Col, Container, Form, Row} from 'react-bootstrap';
import {toast} from "../utils/index.js";
import {useNavigate} from "react-router-dom";


function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [signup, {isLoading}] = useSignupMutation()
    const navigate = useNavigate();

    const handleCreateAccount = () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return;
        }
        console.log('handling account creation')
        signup({email, password, firstName, lastName}).unwrap().then(data => {
            console.log({data})
            toast.success("Account created successfully");
            navigate("/login", {replace: true});
        })
            .catch((e) => {
                console.log(e.message, e, e.value, e.error);
                toast.error("Could not create an account: " + e.data?.message)
            })
    }

    return (
        <Container fluid>
            <Row className="justify-content-center align-items-center min-vh-100">
                <Col md={4} sm={6}>
                    <Card><h2 className="text-center">Create Account</h2>
                        <CardBody><Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Firstname"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Lastname"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="button"
                                block
                                onClick={handleCreateAccount}
                                disabled={isLoading}
                                className='mt-4'
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </Form></CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;
