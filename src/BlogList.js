import { Link } from "react-router-dom";
import { Tag } from '@chakra-ui/react';

const BlogList = ({ blogs, title }) => {
    
    return (
        <div className="blog-list">
            <h2>{title}</h2>
            {blogs && blogs.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        <h2> {blog.title} </h2>
                        {/* <p><Tag>Written by</Tag> {blog.author}</p> */}
                        <p>{console.log(blog.createdTime)}</p>
                        <p>{blog.createdTime}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default BlogList;