import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './provider/AuthContext';
import { Box, Button, Input, Divider, Alert, AlertIcon } from '@chakra-ui/react';
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
                <Box background="#EBEBEB" display="flex" borderWidth="2px" paddingBottom="10px" borderRadius="10px" paddingLeft="30px" paddingRight="30px" height="60vh" width="60vh" flexDirection="column" alignItems="center" justifyContent="space-evenly" maxW="sm" overflow="hidden">
                    {error.length > 0 && <Alert status="error" variant="left-accent">
                        <ErrorIcon style={{ fill: 'red' }} />
                        {error}
                    </Alert>}
                    <span style={{ fontSize: '30px', fontWeight: 'bold', background: '#EBEBEB' }}>LOGIN</span>
                    <Input borderColor="" ref={emailRef} type="email" placeholder="Email" />
                    <Input borderColor="" ref={passwordRef} type="password" placeholder="Password" />

                    <div style={{ width: "100%", background:"#EBEBEB", display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "space-between", marginTop: '10px' }}>
                        <Button display="flex" _hover={{ bg: '#F05454' }} type="submit" isLoading={isLoading}  justifyContent="center" background="#000E4A" color="white" width="100%" height="50px" fontSize="20px">Log In</Button>
                        <Link style={{ marginTop: '15px' }} to="/signup">Need an account?</Link>
                    </div>
                </Box>
            </form>
        </div>
    )
}

export default Login