import { useHistory, useParams } from "react-router";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import TextEditor from "./TextEditor";
//check use params

// TODO: fetch

const BlogDetails = () => {

    const [editingMode, setEditingMode] = useState(false);
    const [NewBody, setNewBody] = useState(null);

    const { id } = useParams();
    const { data: blog, isPending, error } = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();
    
    useEffect(() => {
        if(blog)
            setNewBody(blog.body);
    }, [blog])

    const handleDelete = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        });
    }


    const handleEdit = () => {
        setEditingMode(true);
        setNewBody(NewBody);
    }

    const handleSubmit = () => {
        const axios = require('axios');

        axios.put('http://localhost:8000/blogs/' + blog.id, {
            author: blog.author,
            title: blog.title,
            body: NewBody
        }).then(resp => {
            setNewBody(NewBody);
            setEditingMode(false);
        }).catch(error => {
            console.log(error);
        });

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

                    {!editingMode && <div dangerouslySetInnerHTML={{ __html: NewBody}} />}
                    {editingMode && <TextEditor setBody={setNewBody} lastValue={NewBody} />}

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