import React from 'react';
import { Switch,Route, Redirect } from 'react-router-dom';


import Navbar from './components/shared/navbar';
import Home from './components/Home';
import Posts from './components/Posts';
import Footer from './components/shared/Footer'
import PageNotFound from './components/shared/PageNotFound';
import PostsIdComments from './components/PostsIdComments';

const App = () => {
    return ( 
        <React.Fragment>
            <Navbar />
            <div>            
            <Switch>
                <Route path="/posts/id/comments" exact component={PostsIdComments} />
                <Route path="/posts" exact component={Posts} />
                <Route path="/page-not-found" exact component={PageNotFound} />
                <Route path="/" exact component={Home} />
                <Redirect to="/page-not-found" />
            </Switch>
            </div>
            <Footer />
        </React.Fragment>
     );
}
 
export default App;
