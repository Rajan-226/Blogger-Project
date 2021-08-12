import { useHistory, useParams } from "react-router";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import TextEditor from "./TextEditor";
import firebase from "./firebase";

const BlogDetails = () => {

    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [editingMode, setEditingMode] = useState(false);
    const [NewBody, setNewBody] = useState(null);
    const [blog, setBlog] = useState(null);

    const { id } = useParams(); //picks the id from the link
    const database = firebase.database().ref('blogs/' + id);

    const history = useHistory();
    
    useEffect(() => {
        
        setIsPending(true);
        
        database.on('value', (snapshot) => {
            setBlog(snapshot.val());
            setIsPending(false);
        });
        
    }, []);

    const handleDelete = () => {
        
        database.remove();
        history.push('/');
    }


    const handleEdit = () => {
        setEditingMode(true);
    }

    const handleSubmit = () => {
        
        database.update({
            body: NewBody
        });
        
        setEditingMode(false);
    }

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by <span className="authorName">{blog.author}</span></p>
                    <br />

                    {!editingMode && <div dangerouslySetInnerHTML={{ __html: blog.body}} />}
                    {editingMode && <TextEditor setBody={setNewBody} lastValue={blog.body} />}

                    <br />

                    {!editingMode && <button onClick={handleEdit}>Edit</button>}
                    {editingMode && <button onClick={handleSubmit}>Submit</button>}

                    {' '}

                    <button onClick={handleDelete}>Delete</button>
                </article>
            )}
        </div>
    );
}

export default BlogDetails;