import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './provider/AuthContext';
import { useHistory } from 'react-router-dom';
import { Box, Button, Input, Divider, Alert } from '@chakra-ui/react';
import ErrorIcon from '@material-ui/icons/Error';
import * as Constants from './Constants';

function Signup() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAuth();

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        console.log(nameRef.current.value);
        console.log(emailRef.current.value);
        console.log(passwordRef.current.value);
        console.log(confirmPasswordRef.current.value);

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Password do not match');
        }

        setIsLoading(true);
        setError("");

        await signup(
            emailRef.current.value, passwordRef.current.value, nameRef.current.value
        )
            .then(() => {
                setIsLoading(false);
                history.push('/');
            })
            .catch((error) => {
                setIsLoading(false);
                return setError(error.message);
            })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit}>
                <Box background={Constants.light_white} display="flex" borderWidth="2px" paddingBottom="10px" borderRadius="10px" paddingLeft="30px" borderColor={Constants.primary_color} paddingRight="30px" height="70vh" width="60vh" flexDirection="column" alignItems="center" justifyContent="space-evenly" maxW="sm" overflow="hidden">
                    {error.length > 0 && <Alert status="error" variant="left-accent">
                        <ErrorIcon style={{ fill: 'red' }} />
                        {error}
                    </Alert>}
                    <span style={{ background: Constants.light_white, fontFamily: 'PT Sans Caption', color: Constants.accent_color,fontSize: '30px', fontWeight: 'bold' }}>Sign Up</span>
                    <Input borderColor="" ref={emailRef} type="email" placeholder="Email" />
                    <Input borderColor="" ref={nameRef} type="text" placeholder="Name" />
                    <Input borderColor="" ref={passwordRef} type="password" placeholder="Password" />
                    <Input borderColor="" ref={confirmPasswordRef} type="password" placeholder="Confirm Password" />

                    <div style={{ width: "100%", background: Constants.light_white, display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "space-between", marginTop: '10px' }}>
                    <Button display="flex" _hover={{ bg: Constants.accent_color }} type="submit" isLoading={isLoading}  justifyContent="center" background={Constants.primary_color} color="white" width="100%" height="50px" fontSize="20px">Sign Up</Button>
                        <Link style={{ marginTop: '10px' }} to="/login">Already have an account?</Link>
                    </div>
                </Box>
            </form>
        </div>
    )
}

export default Signup