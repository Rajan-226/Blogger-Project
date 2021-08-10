import React from 'react'
import { useState } from "react";
import { useHistory } from 'react-router-dom';

const AddUser = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = { name, description };

        setIsPending(true);

        fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(() => {
            console.log("new User added");
            setIsPending(false);
            history.push('/Create');
        });

    }

    return (
        <div className="create">
            <h2>Add a new User</h2>
            <form onSubmit={handleSubmit}>
                <label>User Name:</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Description:</label>
                <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {!isPending && <button>Add User</button>}
                {isPending && <button disabled>Adding User...</button>}
            </form>
        </div>
    )
}

export default AddUser
