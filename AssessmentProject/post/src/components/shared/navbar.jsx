import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {
    return ( 
        <React.Fragment>
            <nav style={{background:"lightgrey",height:"50px"}}>
                <Link style={{marginRight:"300px"}} to="/">Home</Link>
                <Link style={{marginRight:"300px"}} to="/posts">Posts</Link>
                <Link style={{marginRight:"300px"}} to="/posts/id/comments">Posts Id</Link>
            </nav>
        </React.Fragment>
     );
}
 
export default Navbar;