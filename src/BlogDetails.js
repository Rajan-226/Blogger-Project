import { useHistory, useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import TextEditor from "./TextEditor";
import firebase from "./firebase";
import { useAuth } from './provider/AuthContext';
import { ThumbsUpIcon, ThumbsDownIcon, toaster, Pane, SendMessageIcon } from 'evergreen-ui'
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react"
import { Skeleton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ChevronRightIcon } from "@chakra-ui/icons";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {  Badge } from '@chakra-ui/react';

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
    const [likeColor, setLikeColor] = useState("gray");
    const [dislikeColor, setDislikeColor] = useState("gray");

    useEffect(() => {

        setIsPending(true);

        database.on('value', (snapshot) => {
            setBlog(snapshot.val());
            setIsPending(false);
        });

    }, []);

    useEffect(() => {
        if (!currentUser || !blog) return;

        let likes = blog.likes;
        let dislikes = blog.dislikes;

        if (likes.indexOf(currentUser.uid) != -1) {
            setLikeColor("blue");
        } else if (dislikes.indexOf(currentUser.uid) != -1) {
            setDislikeColor("blue");
        }

    }, [currentUser, database]);


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

    function pushCommentToDatabase(e) {
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

    function likeOrDislike(choice) {
        if (!currentUser) {
            toaster.warning('Please log in first to ' + choice + ' this blog', { id: 'forbidden-action' });
            return;
        }
        if (currentUser.uid === blog.id) {
            toaster.warning('You cannot ' + choice + ' your own blog', { id: 'forbidden-action' });
            return;
        }

        let likes = blog.likes;
        let dislikes = blog.dislikes;

        if (likes.indexOf(currentUser.uid) != -1 || dislikes.indexOf(currentUser.uid) != -1) {
            toaster.warning('You cannot vote twice', { id: 'forbidden-action' });
            return;
        }

        if (choice === "like") {
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

    function showAndGetComments() {
        return (
            <>
                {
                    blog.comments.map((comment, i) => {
                        if (i)
                            return (
                                <Pane elevation={1} height="50px" marginTop="10px" display="flex" alignItems="center" flexDirection="column" justifyContent="center" border="default">
                                    {comment[0] + " written by " + comment[1]}
                                </Pane>
                            )
                    })
                }
                <form onSubmit={pushCommentToDatabase} >
                    <InputGroup size="md" marginTop="20px">
                        <Input
                            ref={commentRef}
                            pr="4.5rem"
                            placeholder="Enter your comment"
                        />
                        <InputRightElement width="4.5rem">
                            <Button type="submit" h="1.75rem" size="sm">
                                <SendMessageIcon cursor="pointer" size={15} />
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </form>
            </>

        );
    }

    function getSkeleton() {
        return (
            <div>
                <Skeleton height="30px" width="100%" marginBottom="20px" />
                <Skeleton height="200px" width="100%" marginBottom="20px" />
                <Skeleton height="100px" width="100%" />
            </div>
        )
    }

    return (
        <div className="blog-details">
            {isPending && <div>{getSkeleton()}</div>}
            {blog && (
                <>
                    <article style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h2 style={{ fontSize: "30px", color:"#F05454", marginBottom: "10px",fontFamily: "Besley" ,textTransform: "capitalize"}}>{blog.title}</h2>
                        <div>
                            <AccountCircleIcon /><Badge fontSize="17px" color="#222831" background="#DDDDDD">{blog.author}</Badge>
                        </div>
                    </article>


                    {editingMode && <TextEditor setBody={setNewBody} lastValue={blog.body} />}
                    {
                        !editingMode &&
                        <Pane
                            border="2px solid black"
                            borderRadius="10px"
                            padding="10px"
                            dangerouslySetInnerHTML={{ __html: blog.body }} />
                    }

                    <br />

                    {
                        currentUser && currentUser.uid === blog.id &&
                        <>
                            {!editingMode && <Button size="md" bgColor="#30475E" color="white" leftIcon={<EditIcon />} onClick={handleEdit}>Edit</Button>}
                            {editingMode && <Button rightIcon={<ChevronRightIcon h="10" />} onClick={handleSubmit}>Submit</Button>}
                            &emsp;
                            <Button leftIcon={<DeleteIcon />} onClick={handleDelete}>Delete</Button>
                            <br /><br /><br />

                        </>
                    }

                    <Pane display="flex" alignItems="center" justifyContent="left">
                        <ThumbsUpIcon color={likeColor} display='inline' cursor="pointer" onClick={() => likeOrDislike("like")} size={40} />
                        &emsp;<h2 style={{ display: 'inline' }}>{blog.likes && blog.likes.length - 1}</h2>
                        &emsp;&emsp;
                        <ThumbsDownIcon color={dislikeColor} display='inline' cursor="pointer" onClick={() => likeOrDislike("dislike")} size={40} />
                        &emsp;<h2 style={{ display: 'inline' }}>{blog.dislikes.length - 1}</h2>
                    </Pane>

                    <br />
                    <br />
                    <h2>Comments</h2>
                    {showAndGetComments()}
                </>
            )
            }
        </div >
    );
}

export default BlogDetails;