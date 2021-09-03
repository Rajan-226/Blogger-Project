import { useState } from "react";
import { useHistory } from 'react-router-dom';
import TextEditor from "./TextEditor";
import firebase from "./firebase";
import { useAuth } from './provider/AuthContext';
import { Input } from "@chakra-ui/input";

const Create = () => {
    const { currentUser } = useAuth();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    var today = new Date();

    function getDate() {
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yy = today.getFullYear();
        return dd + '-' + mm + '-' + yy;
    }
    function getTime() {
        let hh = String(today.getHours()).padStart(2, '0');
        let mm = String(today.getMinutes()).padStart(2, '0');
        let ss = String(today.getSeconds()).padStart(2, '0');
        return hh + ":" + mm + ":" + ss;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const blog = {
            title: title,
            body: body,
            author: currentUser.displayName,
            likes: [''],
            dislikes: [''],
            comments: [''],
            createdDate: getDate(),
            createdTime: getTime(),
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
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>

                <Input borderColor="" required onChange={(e) => setTitle(e.target.value)} placeholder="Enter the blog title"/>
                
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