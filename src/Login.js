import React, { useRef, useState } from 'react'
import { Button, Pane, TextInputField, Heading, Alert } from 'evergreen-ui';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './provider/AuthContext';

function Login() {

    const emailRef = useRef('');
    const passwordRef = useRef('');
    const { login } = useAuth();
    const [error, setError] = useState("");
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError("Failed to log in!")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Pane elevation={3} display="flex" alignItems="center" flexDirection="column" justifyContent="center" border="default">
                    <Heading size={900} marginBottom="10">Login</Heading>
                    <Pane display="flex" paddingLeft="30px" paddingRight="30px" marginBottom="10px" flexDirection="column" width="100%" justifyContent="flex-start">
                        {error.length > 0 && <Alert title={error} intent="danger" marginBottom={10} />}
                        <TextInputField ref={emailRef} width="100%" label="Email" placeholder="Please Enter email" />
                        <TextInputField ref={passwordRef} width="100%" type="password" label="Password" placeholder="Please Enter Password" />
                        <Button appearance="primary">Log In</Button>
                    </Pane>
                    <Pane marginBottom={30}>
                        Already have an account? <Link to="/signup">Sign Up</Link>
                    </Pane>
                </Pane>
            </form>
        </div>
    )
}

export default Login
