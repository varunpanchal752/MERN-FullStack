import React, {Component} from 'react';
import axios from 'axios';


class Posts extends Component {
    state = {posts:[] }

    async componentDidMount(){
        const {data:posts} = await axios.get('http://127.0.0.1:3001/posts');
        this.setState({posts});        
    }

    render() { 
        return ( 
                <React.Fragment>
                    <table>
                        <thead>
                            <tr>
                                <th>UserId</th>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Body</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.posts.map((post) =>
                                (<tr key = {post.id}>
                                    <td>{post.id}</td> 
                                    <td>{post.userId}</td>
                                    <td>{post.title}</td>
                                    <td>{post.body}</td>
                                </tr>)
                                )
                            }
                        </tbody>
                    </table>
                </React.Fragment>
            );
    }
}
 
export default Posts;