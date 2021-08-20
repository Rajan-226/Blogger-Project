import React, { useRef, useState } from 'react';
import { Button, Pane, TextInputField, Heading, Alert } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import { useAuth } from './provider/AuthContext';

function Signup() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [error, setError] = useState('');

    const { signup, currentUser, updateName } = useAuth();
    
    async function handleSubmit(e) {
        e.preventDefault();
        
        if(passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Password do not match');
        }
        
        console.log(emailRef);
        console.log(emailRef.current.value);
        console.log(passwordRef.current.value);
        
        try {
            setError("");
            await signup(emailRef.current.value, passwordRef.current.value);
            await updateName(nameRef.current.value);
        } catch {
            return setError("Failed to create an account");
        }
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Pane elevation={1} display="flex" alignItems="center" flexDirection="column" justifyContent="center" border="default">
                    <Heading size={900} marginBottom={10}>Sign Up</Heading>
                    <Pane display="flex" paddingLeft="30px" type="email" paddingRight="30px" marginBottom="10px" flexDirection="column" width="100%" justifyContent="flex-start">
                        { error.length > 0 && <Alert title={error} intent="danger" marginBottom={10}/>}

                        <TextInputField ref={nameRef} width="100%" label="Full Name" placeholder="Please Enter Full name" required />
                        <TextInputField ref={emailRef} width="100%" label="Email" placeholder="Please Enter email" required />
                        <TextInputField ref={passwordRef} width="100%" type="password" label="Password" placeholder="Please Enter Password" required />

                        <TextInputField ref={confirmPasswordRef} width="100%" type="password" label="Confirm Password" placeholder="Please Enter Confirm Password" required />
                        <Button appearance="primary" intent="success">Sign Up</Button>
                    </Pane>
                    <Pane marginBottom={30}>
                        Already have an account? <Link to="/login">Log In</Link>
                    </Pane>
                </Pane>
            </form>
        </div>
    )
}

export default Signup
