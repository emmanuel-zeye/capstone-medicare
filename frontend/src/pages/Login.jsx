import {useLoginMutation} from "../api/authApi.js";
import {useState} from "react";
import {Button, Card, CardBody, Col, Container, Form, Row} from 'react-bootstrap';
import {parseJwt, toast} from "../utils/index.js";
import {setCredentials} from "../store/slices/authSlice.js";
import {useAppDispatch} from "../store/store.js";
import {Link, useNavigate} from "react-router-dom";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log('handling login')
        login({email, password}).unwrap().then(data => {
            console.log({data})
            toast.success("Login successful");
            const {token, refreshToken} = data;
            if (data) {
                const user = parseJwt(token);
                dispatch(
                    setCredentials({
                        user,
                        token,
                        refreshToken
                    })
                );
                navigate(user.userType === 'admin' ? "/dashboard/home" : '/store/products', {replace: true});
            }
        })
            .catch(() => toast.error("Invalid username or password. Please check and try again"))
    }

    return (
        <Container fluid>
            <Row className="justify-content-center align-items-center min-vh-100">
                <Col md={4} sm={6}>
                    <Card><h2 className="text-center">Login</h2>
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

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="button"
                                block
                                onClick={handleLogin}
                                disabled={isLoading}
                                className='mt-4'
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                            <Link to='/signup'>Create an Account instead</Link>
                        </Form></CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
