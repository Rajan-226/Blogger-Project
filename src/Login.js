import React, { useRef, useState } from 'react'
// import { Button, Pane, TextInputField, Heading, Alert } from 'evergreen-ui';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './provider/AuthContext';
import { Box, Button, Input, Divider, Alert, AlertIcon } from '@chakra-ui/react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ErrorIcon from '@material-ui/icons/Error';

function Login() {

    const emailRef = useRef('');
    const passwordRef = useRef('');
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        setIsLoading(true);
        
        try {
            setError("");
            await login(emailRef.current.value, passwordRef.current.value);
            setIsLoading(false);
            history.push("/");
        } catch {
            setIsLoading(false);
            setError("Failed to log in!")
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit}>
                <Box display="flex" borderWidth="2px" paddingBottom="10px" borderRadius="10px" paddingLeft="30px" paddingRight="30px" height="45vh" width="50vh" flexDirection="column" alignItems="center" justifyContent="space-evenly" maxW="sm" overflow="hidden">
                    { error.length > 0 && <Alert status="error" variant="left-accent">
                        <ErrorIcon style={{ fill: 'red' }} />
                        {error}
                    </Alert>}
                    <span style={{fontSize: '30px', fontWeight: 'bold'}}>Log In</span>
                    <Input ref={emailRef} type="email" placeholder="Email" />
                    <Input ref={passwordRef} type="password" placeholder="Password" />

                    <Button _hover={{ bg: '#434e7d' }} type="submit" isLoading={isLoading} justifyContent="space-between" background="#000E4A" color="white" width="100%" rightIcon={ <ArrowForwardIosIcon style={{ fill:'white' }} /> }>Log In</Button>
                    <Divider />
                    <Link to="/signup">Need an account?</Link>
                </Box>
            </form> 
        </div>
    )
}

export default Login