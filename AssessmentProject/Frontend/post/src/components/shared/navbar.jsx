import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {
    return ( 
        <React.Fragment>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/posts">Posts</Link>
                <Link to="/posts/id">Posts Id</Link>
            </nav>
        </React.Fragment>
     );
}
 
export default Navbar;