import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import PostsList from './components/PostsLists';
import PostForm from './components/PostForm';
import Post from './components/Post';
import './App.css';
import axios from 'axios';

function App() {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [])

  const fetchPosts = () => {
    axios.get('http://localhost:3000/api/posts')
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <Route exact path='/'>
        <h1>Posts</h1>
        <PostForm fetchPosts={fetchPosts} />
        <PostsList posts={posts} /> 
      </Route>

      <Route path='/:id'>
        <Post fetchPosts={fetchPosts} /> 
      </Route>
    </div>
  );
}

export default App;
