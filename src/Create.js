import { useState } from "react";
import { useHistory } from 'react-router-dom';
import TextEditor from "./TextEditor";
import firebase from "./firebase";
import { useAuth } from './provider/AuthContext';

const Create = () => {
    const { currentUser } = useAuth();

    const [title, setTitle] = useState(null);
    const [body, setBody] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const blog = {
            title: title,
            body: body,
            author: currentUser.displayName,
            id: currentUser.uid
        };

        setIsPending(true);

        const blogRef = firebase.database().ref('blogs');
        blogRef.push(blog);

        setIsPending(false);
        history.push('/');
    }

    return (

        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <label>Blog body:</label>
                <br />
                
                <TextEditor setBody={setBody} lastValue={''} />
                <br />

                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div>
    );
}

export default Create;