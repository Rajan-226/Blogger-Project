import { useState } from "react";
import { useHistory } from 'react-router-dom';
import TextEditor from "./TextEditor";
import useFetch from './useFetch';

const Create = () => {

    const [title, setTitle] = useState(null);
    const [body, setBody] = useState(null);
    const [author, setAuthor] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [optionLoaded, setOptionLoaded] = useState(false);
    const [optionItems, setOptionItems] = useState(null);
    const history = useHistory();

    const { data: users, isPendingo, error } = useFetch('http://localhost:8000/users');

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log("new blog added");
            console.log(blog);
            setIsPending(false);
            history.push('/');
        });
    }

    if (users && !optionLoaded) {
        setOptionItems(() => users.map((user) => {
            console.log(user);
            return (<option value={user.name}>{user.name}</option>);
        })
        );
        setOptionLoaded(true);
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
                <label>Blog body:</label>

                {/* <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea> */}

                <br />
                <TextEditor setBody={setBody} lastValue={''} />

                <br />
                <label>Blog author:</label>
                <select id="MyOptions"
                    value={author}
                    required
                    onChange={(e) => {
                        console.log(e.target.value); setAuthor(e.target.value)
                    }}
                >

                    {
                        users && users.length ?
                            <option disabled selected value>Select an author</option> :
                            <option disabled selected value>No authors</option>
                    }

                    {optionItems}
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div>
    );
}

export default Create;