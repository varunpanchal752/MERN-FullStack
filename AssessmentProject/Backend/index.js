const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const { response } = require('express');

const port = 3001;

app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Role');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
  })  

app.get('/postsId',(req,res) => {
    axios(`https://jsonplaceholder.typicode.com/posts/${req.query.id}/comments`)
    .then((response) => {res.send(response.data);} )
    .catch((err)=>{console.log(err,"Error occured in posts comments")} );
});

app.get('/posts',(req,res) => {
    let  respond ;
    axios('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {respond = response.data; 
        res.send(respond);} )
    .catch((err)=>{console.log(err,"Error occured in posts")} );
});


app.listen(port,() => (
    console.log(`Server is running on ${port}`)
));
