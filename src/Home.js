import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {

    let { data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs');
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