const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');

const app = express();
// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const PORT = process.env.PORT || 3142;
const server = http.createServer(app);
server.listen(PORT);
console.log('Server listening on: ', PORT);
