import BlogList from './BlogList';
import firebase from './firebase';
import { useState, useEffect } from 'react';
import { useAuth } from './provider/AuthContext';
import { Skeleton } from '@chakra-ui/react';

const Home = () => {

    const [blogs, setBlogs] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        setIsPending(true);

        const database = firebase.database().ref('blogs');
        database.on('value', (snapshot) => {
            let rawBlogs = snapshot.val();
            let blog = [];

            for (let id in rawBlogs) {
                blog.push({
                    title: rawBlogs[id].title,
                    author: rawBlogs[id].author,
                    body: rawBlogs[id].body,
                    createdDate: rawBlogs[id].createdDate,
                    createdTime: rawBlogs[id].createdTime,
                    id: id
                });
            }
            setBlogs(blog);
            setIsPending(false);
        }, (errorObject) => {
            setError(errorObject.name);
            setIsPending(false);
        });
    }, []);

    function getSkeleton() {
        return (<div className="blog-preview">
            <Skeleton height="16px" width="30%" marginBottom="8px" />
            <Skeleton height="12px" width="100%" />
        </div>)
    }

    return (

        <div className="home">
            {/* Failed to fetch will come, when you have not linked your db */}
            {error && <div>{error}</div>}
            {/* It will show Loading... in fetching period */}
            {isPending && <div>
                {getSkeleton()}
                {getSkeleton()}
                {getSkeleton()}
                {getSkeleton()}
                {getSkeleton()}
                {getSkeleton()}
            </div>}
            {blogs && <BlogList blogs={blogs}/>}

        </div>
    );
}

export default Home;