const server = require('./server.js');
const http = require('http')
const port=process.env.PORT || 5000;
const app = http.createServer(server);
const io = require('socket.io')(app) 
io.on('connection', socket=>{
    socket.on('convo', message=>{
        let newArray=message.map(item=>{
            if(item.senderOrReceiver==="sender"){
                return {...item,senderOrReceiver:'receiver'};
            }
            if(item.senderOrReceiver==="receiver"){
                return {...item,senderOrReceiver:'sender'};
            }
        })
        socket.broadcast.emit('server-message',newArray)
    })//receiving information
})

app.listen(port,()=> console.log(`\n*** Running on port ${port}`))