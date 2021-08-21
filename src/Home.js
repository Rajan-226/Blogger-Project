import BlogList from './BlogList';
import firebase from './firebase';
import { useState, useEffect } from 'react';
import { useAuth } from './provider/AuthContext';

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
            
            for(let id in rawBlogs) {
                blog.push({
                    title: rawBlogs[id].title,
                    author: rawBlogs[id].author,
                    body: rawBlogs[id].body,
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
    
    return (
        
        <div className="home">
            {/* Failed to fetch will come, when you have not linked your db */}
            {error && <div>{error}</div>}
            {/* It will show Loading... in fetching period */}
            {isPending && <div>Loading....</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs" />}
        </div>
    );
}

export default Home;