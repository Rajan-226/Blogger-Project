import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './provider/AuthContext';
import { useHistory } from 'react-router-dom';
import { Box, Button, Input, Divider, Alert } from '@chakra-ui/react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ErrorIcon from '@material-ui/icons/Error';

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
            {/* <form onSubmit={handleSubmit}>
                <Pane elevation={1} display="flex" alignItems="center" flexDirection="column" justifyContent="center" border="default">
                    <Heading size={900} marginBottom={10}>Sign Up</Heading>
                    <Pane display="flex" paddingLeft="30px" type="email" paddingRight="30px" marginBottom="10px" flexDirection="column" width="100%" justifyContent="flex-start">
                        {error.length > 0 && <Alert title={error} intent="danger" marginBottom={10} />}

                        <TextInputField ref={nameRef} width="100%" label="Full Name" placeholder="Please Enter Full name" required />
                        <TextInputField ref={emailRef} width="100%" label="Email" placeholder="Please Enter email" required />
                        <TextInputField ref={passwordRef} width="100%" type="password" label="Password" placeholder="Please Enter Password" required />

                        <TextInputField ref={confirmPasswordRef} width="100%" type="password" label="Confirm Password" placeholder="Please Enter Confirm Password" required />

                        <Button disabled={isLoading} appearance="primary" intent="success">Sign Up</Button>
                    </Pane>
                    <Pane marginBottom={30}>
                        Already have an account? <Link to="/login">Log In</Link>
                    </Pane>
                </Pane>
            </form> */}
            <form onSubmit={handleSubmit}>
                <Box display="flex" borderWidth="2px" paddingBottom="30px" borderRadius="10px" paddingLeft="30px" paddingRight="30px" height="60vh" width="50vh" flexDirection="column" alignItems="center" justifyContent="space-evenly" maxW="sm" overflow="hidden">
                    {error.length > 0 && <Alert status="error" variant="left-accent">
                        <ErrorIcon style={{ fill: 'red' }} />
                        {error}
                    </Alert>}
                    <span style={{ fontSize: '30px', fontWeight: 'bold' }}>Sign up</span>
                    <Input ref={emailRef} type="email" placeholder="Email" />
                    <Input ref={nameRef} type="text" placeholder="Name" />
                    <Input ref={passwordRef} type="password" placeholder="Password" />
                    <Input ref={confirmPasswordRef} type="password" placeholder="Confirm Password" />

                    <Button _hover={{ bg: '#4089ff' }} type="submit" isLoading={isLoading} justifyContent="space-between" background="#0061FF" color="white" width="100%" rightIcon={<ArrowForwardIosIcon style={{ fill: 'white' }} />}>Sign up</Button>
                    <Divider />
                    <Link to="/login">Already have an account?</Link>
                </Box>
            </form>
        </div>
    )
}

export default Signup