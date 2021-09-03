import { Link } from "react-router-dom";
import { Tag, Box, Badge } from '@chakra-ui/react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const BlogList = ({ blogs }) => {

    return (
        <div className="blog-list">
            {blogs.map((blog) => (
                <Link to={`/blogs/${blog.id}`}>
                    <Box className="blog-preview" key={blog.id} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                        <div>
                            <h2> {blog.title} </h2>
                            <AccountCircleIcon/><Badge fontSize="17px" color="#222831" background="#DDDDDD">{blog.author}</Badge>
                        </div>
                        <div style={{display:'flex',alignItems:"flex-end", flexDirection:"column"}}>
                            <Badge fontSize="18px" marginBottom="5px" background="#DDDDDD" color="#B42B51">{blog.createdDate}</Badge>
                            <Badge fontSize="large" colorScheme="orange" colorScheme="orange" variant="outline">{blog.createdTime}</Badge>
                        </div>
                    </Box>
                </Link>

            ))}
        </div>
    );
}

export default BlogList;