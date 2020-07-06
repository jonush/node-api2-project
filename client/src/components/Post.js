import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';



const Post = ({ fetchPosts }) => {
  const [ edit, setEdit ] = useState([]);
  const [ comments, setComments ] = useState([]);
  const [ editing, setEditing ] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const [ com, setCom ] = useState(
    {
      text: '',
      created_at: new Date(),
      updated_at: new Date(),
      post_id: id,
      post: edit.contents
    }
  );

  useEffect(() => {
    getPost();
    getComments();
  }, [])

  const getPost = () => {
    axios.get(`http://localhost:3000/api/posts/${id}`)
      .then(res => {
        setEdit(res.data[0]);
      })
      .catch(err => console.log(err));
  }

  const getComments = () => {
    axios.get(`http://localhost:3000/api/posts/${id}/comments`)
      .then(res => {
        setComments(res.data);
      })
      .catch(err => console.log(err));
  }

  const handleInput = e => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/posts/${id}`, edit)
      .then(res => {
        fetchPosts();
        setEditing(false);
      })
      .catch(err => console.log(err));
  }

  const handleComment = e => {
    setCom({ ...com, [e.target.name]: e.target.value });
  }

  const postComment = e => {
    e.preventDefault();
    axios.post(`http://localhost:3000/api/posts/${id}/comments`, com)
      .then(res => {
        getComments();
      })
      .catch(err => console.log(err));
    setCom({ ...com, text: ''})
  }

  const deletePost = () => {
    axios.delete(`http://localhost:3000/api/posts/${id}`)
      .then(res => {
        setEditing(false);
      })
      .catch(err => console.log(err));
  };

  const returnHome = e => {
    e.preventDefault();
    fetchPosts();
    history.push('/');
  }

  return (
    <div className='post'>
      {
        !editing ? 
        <div>
          <h1>{edit.title}</h1>
          <h2>{edit.contents}</h2>
          <h3>Comments:</h3>

          {
            comments.map((c, index) => (
              <p key={index}>{c.text}</p>
            ))
          }

          <form className='comment' onSubmit={postComment}>
            <input
              type='text'
              name='text'
              value={com.text}
              onChange={handleComment}
            />
            <button type='submit'>Comment</button>
          </form>

          <button onClick={() => setEditing(true)}>Edit</button>
          
          <button onClick={returnHome}>Back</button>
        </div> :
        <div>
          <form onSubmit={handleSubmit}>
            <textarea
              //type='text'
              name='title'
              value={edit.title}
              onChange={handleInput}
            />

            <textarea
              //type='text'
              name='contents'
              value={edit.contents}
              onChange={handleInput}
            />      

            <button type='submit'>Save</button>
            <button className='delete' onClick={deletePost}>Delete</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </form>
        </div>
      }
    </div>
  )
};

export default Post;