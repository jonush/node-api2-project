import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialPost = {
  title: '',
  contents: '',
  created_at: new Date(),
  updated_at: new Date()
}

const PostForm = ({ fetchPosts }) => {
  const [ post, setPost ] = useState(initialPost);
  const [ posting, setPosting ] = useState(false);

  const handleInput = e => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/posts', post)
      .then(res => {
        fetchPosts();
        setPosting(false);
      })
      .catch(err => console.log(err));
    setPost(initialPost);
  }

  return (
    <div>
      {
        !posting ? 
        <button onClick={() => setPosting(true)}>Create a new post</button> :
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='title'
              placeholder='Title'
              value={post.title}
              onChange={handleInput}
            />

            <input
              type='text'
              name='contents'
              placeholder='Content'
              value={post.contents}
              onChange={handleInput}
            />      

            <button type='submit'>Post</button>
            <button onClick={() => setPosting(false)}>Cancel</button>
          </form>
        </div>
      }
    </div>
  )
};

export default PostForm;