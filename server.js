const express = require('express');
const cors = require('cors');

const postsRouter = require('./posts/posts-router');

const server = express();
server.use(express.json());
server.use(cors());

server.use('/api/posts', postsRouter);

server.get('/', (req,res) => {
  res.status(200).json({
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    greeting: process.env.GREETING
  });
});

module.exports = server;

