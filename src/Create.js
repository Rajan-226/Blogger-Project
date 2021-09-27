import { useState } from "react";
import { useHistory } from 'react-router-dom';
import TextEditor from "./TextEditor";
import firebase from "./firebase";
import { useAuth } from './provider/AuthContext';
import { Input, Box, Button } from "@chakra-ui/react";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import * as Constants from './Constants';

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
        <div className="create" style={{ marginLeft: '-55px' }}>
            <form onSubmit={handleSubmit}>
                <Box marginLeft="0px" width="800px" borderWidth="2px" borderColor="black" height="660px" paddingBottom="10px" display="flex" flexDirection="column" justifyContent="space-between" borderRadius="10px" padding="35px">
                    <div>
                        <label style={{ color: `${Constants.accent_color}`, fontWeight: 'bold', fontSize: '20px', marginBottom: '7px' }}>Blog Title:</label>
                        <Input borderColor="" borderWidth="2px" backgroundColor="#F6F6F6" required onChange={(e) => setTitle(e.target.value)} placeholder="Enter the blog title" />
                    </div>

                    <div>
                        <label style={{ color: Constants.accent_color, fontWeight: 'bold', fontSize: '20px', marginBottom: '7px' }}>Blog Body:</label>
                        <TextEditor setBody={setBody} lastValue={''} />
                    </div>

                    <div >
                        {!isPending && <Button type="submit" background={Constants.primary_color} color="white" width="130px" height="45px"  _hover={{ bg: Constants.accent_color }} fontSize="17px"  leftIcon={<AddCircleIcon style={{ fill: 'white' }} />}>Add Blog</Button>}
                        {isPending && <Button width="130px"background={Constants.primary_color} color="white" width="130px" height="45px" fontSize="17px" _hover={{ bg: Constants.accent_color }} isLoading >Adding Blog...</Button>}
                    </div>
                </Box>
            </form>
        </div>
    );
}

export default Create;