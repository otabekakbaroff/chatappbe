const cors=require('cors');

const express = require('express');

const server = express();

const  auth_router=require('./auth/auth-router');

const message_router=require('./messages/message-router');

const user_router=require('./users/user-router');

server.use(express.json());

server.use(cors());

server.use('/api/auth', auth_router);

server.use('/message', message_router)


server.use('/user', user_router)

server.get('/', (req,res)=>{

    const test=[{Message:`*** SERVER IS UP AND RUNNING AT PORT 5000 ***`}]

    res.status(200).json(test);

})



module.exports = server;