import {useLoginMutation} from "../api/authApi.js";
import {useState} from "react";
import Button from "../components/Button/index.jsx";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, {isLoading}] = useLoginMutation()

    const performLogin = () => {
        console.log('handling login')
        login({email, password})
    }

    return (<main className='container-fluid d-flex justify-content-center align-items-center w-100 h-100'>
        <form className='w-50 h-50 bg-body-secondary p-5'>
            <p className='fw-bolder h1 pb-3'>Login</p>
            <div className="input-group mb-3">
                <input autoComplete='email' value={email} onChange={e=> setEmail(e.target.value)} type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-3">
                <input autoComplete='current-password' onChange={e=> setPassword(e.target.value)} value={password} type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon2"/>
            </div>
            <div className="input-group mb-3 justify-content-center">
                <Button isLoading={isLoading} disabled={isLoading} type='button' onClick={performLogin} className='btn btn-primary'> Login </Button>
            </div>
        </form>

    </main>)
}

export default Login;