import { useHistory, useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import TextEditor from "./TextEditor";
import firebase from "./firebase";
import { useAuth } from './provider/AuthContext';
import { ThumbsUpIcon, ThumbsDownIcon, toaster, Pane, SendMessageIcon, TextInputField } from 'evergreen-ui'

const BlogDetails = () => {

    const [isPending, setIsPending] = useState(true);
    const [editingMode, setEditingMode] = useState(false);
    const [NewBody, setNewBody] = useState(null);
    const [blog, setBlog] = useState(null);
    const { currentUser } = useAuth();
    const { id } = useParams(); //picks the id from the link
    const database = firebase.database().ref('blogs/' + id);
    const history = useHistory();
    const commentRef = useRef('');

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

    function addComment(e) {
        e.preventDefault();
        if (commentRef.current.value.length === 0) {
            toaster.warning('Comment cannot be empty', { id: 'forbidden-action' });
            return;
        }
        if (!currentUser) {
            toaster.warning('Please login first to comment on this blog', { id: 'forbidden-action' });
            e.target.reset();
            return;
        }

        let NewComments = blog.comments;
        NewComments.push([commentRef.current.value, currentUser.displayName]);

        database.update({
            comments: NewComments
        });

        e.target.reset();
    }

    function handleOpinion(opinion) {
        let likes = blog.likes;
        let dislikes = blog.dislikes;
        if (likes.indexOf(currentUser.uid) != -1 || dislikes.indexOf(currentUser.uid) != -1) {
            toaster.warning('You cannot vote twice', { id: 'forbidden-action' });
            return;
        }
        if (opinion === 1) {
            likes.push(currentUser.uid);
            database.update({
                likes: likes
            });
        } else {
            dislikes.push(currentUser.uid);
            database.update({
                dislikes: dislikes
            });
        }
    }

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {blog && (
                <>
                    <article>
                        <h2>{blog.title}</h2>
                        <p>Written by <span className="authorName">{blog.author}</span></p><br />
                        {editingMode && <TextEditor setBody={setNewBody} lastValue={blog.body} />}
                        {!editingMode && <div dangerouslySetInnerHTML={{ __html: blog.body }} />}
                    </article>

                    <br />
                    {
                        !currentUser &&
                        <>
                            <ThumbsUpIcon cursor="pointer" onClick={() => toaster.warning('Please log in first to like this blog', { id: 'forbidden-action' })} size={40} />
                            &emsp;{blog.likes && blog.likes.length - 1}
                            &emsp;&emsp;
                            <ThumbsDownIcon cursor="pointer" onClick={() => toaster.warning('Please log in first to unlike this blog', { id: 'forbidden-action' })} size={40} />
                            &emsp;{blog.dislikes.length - 1}

                            <br />
                            <br />
                            <br />
                            <h1>Comments</h1>
                            {
                                blog.comments && blog.comments.map((comment, i) => {
                                    if (i)
                                        return (
                                            <Pane elevation={3} height="50px" marginTop="10px" display="flex" alignItems="center" flexDirection="column" justifyContent="center" border="default">
                                                {comment[0] + " written by " + comment[1]}
                                            </Pane>
                                        )
                                })
                            }
                            <form onSubmit={addComment} >
                                <Pane display="flex" justifyContent="center" alignItems="center" border="2px solid black" marginTop="30px">
                                    <TextInputField ref={commentRef} width="80%" height="1" placeholder="Enter your comment" />
                                    &emsp;
                                    <button type="submit"><SendMessageIcon cursor="pointer" size={35} /></button>
                                </Pane>
                            </form>

                        </>
                    }
                    {
                        currentUser && currentUser.uid === blog.id &&
                        <>
                            {!editingMode && <button id="delEdit" onClick={handleEdit}>Edit</button>}
                            {editingMode && <button id="delEdit" onClick={handleSubmit}>Submit</button>}
                            &emsp;
                            <button id="delEdit" onClick={handleDelete}>Delete</button>
                            <br /><br /><br />

                            <ThumbsUpIcon cursor="pointer" onClick={() => toaster.warning('You cannot like your own blog', { id: 'forbidden-action' })} size={40} />
                            &emsp;{blog.likes && blog.likes.length - 1}
                            &emsp;&emsp;
                            <ThumbsDownIcon cursor="pointer" onClick={() => toaster.warning('You cannot unlike your own blog', { id: 'forbidden-action' })} size={40} />
                            &emsp;{blog.dislikes.length - 1}

                            <br />
                            <br />
                            <br />
                            <h1>Comments</h1>

                            {
                                blog.comments.map((comment, i) => {
                                    if (i)
                                        return (
                                            <Pane elevation={3} height="50px" marginTop="10px" display="flex" alignItems="center" flexDirection="column" justifyContent="center" border="default">
                                                {comment[0] + " written by " + comment[1]}
                                            </Pane>
                                        )
                                })
                            }

                            <form onSubmit={addComment} >
                                <Pane display="flex" justifyContent="center" alignItems="center" border="2px solid black" marginTop="30px">
                                    <TextInputField ref={commentRef} width="80%" height="1" placeholder="Enter your comment" />
                                    &emsp;
                                    <button type="submit"><SendMessageIcon cursor="pointer" size={35} /></button>
                                </Pane>
                            </form>
                        </>
                    }
                    {
                        currentUser && currentUser.uid !== blog.id &&
                        <>
                            <ThumbsUpIcon cursor="pointer" onClick={() => handleOpinion(1)} size={40} />
                            &emsp;{blog.likes && blog.likes.length - 1}
                            &emsp;&emsp;
                            <ThumbsDownIcon cursor="pointer" onClick={() => handleOpinion(0)} size={40} />

                            &emsp;{blog.dislikes.length - 1}

                            <br />
                            <br />
                            <br />
                            <h1>Comments</h1>
                            {
                                blog.comments.map((comment, i) => {
                                    if (i)
                                        return (
                                            <Pane elevation={3} height="50px" marginTop="10px" display="flex" alignItems="center" flexDirection="column" justifyContent="center" border="default">
                                                {comment[0] + " written by " + comment[1]}
                                            </Pane>
                                        )
                                })
                            }
                            <form onSubmit={addComment} >
                                <Pane display="flex" justifyContent="center" alignItems="center" border="2px solid black" marginTop="30px">
                                    <TextInputField ref={commentRef} width="80%" height="1" placeholder="Enter your comment" />
                                    &emsp;
                                    <button type="submit"><SendMessageIcon cursor="pointer" size={35} /></button>
                                </Pane>
                            </form>
                        </>
                    }
                </>
            )
            }
        </div >
    );
}

export default BlogDetails;