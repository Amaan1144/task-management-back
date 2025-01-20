const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const taskRoutes = require('./routes/taskRoutes');
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors : {
        origin : '*',
        methods : ['GET', 'POST', 'PUT', 'DELETE']
    }
});

app.use(cors());
app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes(io));

const PORT = process.env.PORT || 8080;

server.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`)
});