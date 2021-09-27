import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './provider/AuthContext';
import { Box, Button, Input, Divider, Alert, AlertIcon } from '@chakra-ui/react';
import ErrorIcon from '@material-ui/icons/Error';
import * as Constants from './Constants';


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
                <Box background={Constants.light_white} display="flex" borderWidth="2px" borderColor={Constants.primary_color} paddingBottom="10px" borderRadius="10px" paddingLeft="30px" paddingRight="30px" height="60vh" width="60vh" flexDirection="column" alignItems="center" justifyContent="space-evenly" maxW="sm" overflow="hidden">
                    {error.length > 0 && <Alert status="error" variant="left-accent">
                        <ErrorIcon style={{ fill: 'red' }} />
                        {error}
                    </Alert>}
                    <span style={{ background: Constants.light_white, fontFamily: 'PT Sans Caption', color: Constants.accent_color,fontSize: '30px', fontWeight: 'bold' }}>Login</span>
                    <Input borderColor="" ref={emailRef} type="email" placeholder="Email" />
                    <Input borderColor="" ref={passwordRef} type="password" placeholder="Password" />

                    <div style={{ width: "100%", background: Constants.light_white, display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "space-between", marginTop: '10px' }}>
                        <Button display="flex" _hover={{ bg: Constants.accent_color }} type="submit" isLoading={isLoading}  justifyContent="center" background={Constants.primary_color} color="white" width="100%" height="50px" fontSize="20px">Log In</Button>
                        <Link style={{ marginTop: '15px', color: Constants.primary_color }} to="/signup">Need an account?</Link>
                    </div>
                </Box>
            </form>
        </div>
    )
}

export default Login