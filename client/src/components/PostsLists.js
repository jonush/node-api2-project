import React from 'react';
import { Link } from 'react-router-dom';

const PostsList = ({ posts }) => {
  return (
    <div>
      {
        posts.map((post, index) => {
          return (
              <Link key={index} to={`/${post.id}`}>
                  <div className='titles'>
                    <h2>{post.title}</h2>
                  </div>
              </Link>
          )})
      }
    </div>
  )
};

export default PostsList;