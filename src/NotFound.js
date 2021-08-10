import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
      <div className="not-found">
          <h1>404</h1>
          <p>Page cannot be found</p><br/>
          <p>You are on wrong address</p><br/>
          <Link to="/">Back to the homepage</Link>
      </div>  
    );
}

export default NotFound;