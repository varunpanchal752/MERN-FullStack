import React, {Component} from 'react';
import axios from 'axios';
import postsId from './PostsId'

class Posts extends Component {
    state = {posts:[] }

    componentDidMount(){
        axios('http://127.0.0.1:3001/posts')
        .then((response)=>
                ( 
                    this.setState({posts:response.data})
                )
        )
        .catch(()=>{console.log('error occured during calling posts')});
    }
    render() { 
        this.componentDidMount();
        return ( 
        <h1>{this.state.posts.map((post) => {
            <postId pro = {this.state.posts}/>
        }
        )}</h1> );
    }
}
 
export default Posts;