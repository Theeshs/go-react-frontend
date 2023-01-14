import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Input from './form/Input';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const { setJwtToken } = useOutletContext();
    const { setAllertClasName } = useOutletContext();
    const { setAllertMassage } = useOutletContext();
    const { toggleRefresh } = useOutletContext();

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("email/'pass", email, password)

        // build the request handler
        let payload = {
            email: email,
            password: password
        }

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(payload),

        }

        fetch(`${process.env.REACT_APP_BACKEND}/authenticate`, requestOptions)
            .then(response => response.json())
            .then(data => {
                // debugger
                if (data.error) {
                    setAllertClasName("alert-danger")
                    setAllertMassage(data.message)
                } else {
                    setJwtToken(data.access_token)
                    setAllertClasName("")
                    setAllertMassage("")
                    navigate("/")
                    toggleRefresh(true)
                }
            }).catch(error => {
                setAllertClasName("alert-danger")
                setAllertMassage(error)
            })
    }

    return (
        <div className="col-md-6 offset-md-3">
            <h2>
                Login
            </h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <Input
                    title="Email Address"
                    type="email"
                    className="form-control"
                    name="email"
                    autoComplete="email-new"
                    onChange={(event) => setEmail(event.target.value)}></Input>

                <Input
                    title="Password"
                    type="password"
                    className="form-control"
                    name="password"
                    autoComplete="password-new"
                    onChange={(event) => setPassword(event.target.value)}></Input>

                <hr></hr>
                <input
                    type="submit"
                    className='btn btn-primary'
                    value="Login" />
            </form>
        </div>
    )
}

export default Login;