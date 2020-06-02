const express = require('express');

const postsRouter = require('./posts/posts-router');

const server = express();
server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', (req,res) => {
  res.send(`<h1>api2-project</h1>`)
});

server.listen(3000, () => {
  console.log('\n == Server running on port 3000 == \n');
});