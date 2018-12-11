const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message.js');

var app = express();


publicPath=path.join(__dirname ,'../public');
const port = process.env.PORT || 5000;

var server = http.createServer(app);
var io = socketIO(server);
io.on('connection' , (socket) => {
  console.log('New User Connected');


   // socket.on('createEmail', (newEmail) =>{
   //
   //   console.log('createEmail',newEmail);
   // });
     socket.emit('newMessage', generateMessage('Admin', 'Welcome to the ChatApp')

     );

   socket.broadcast.emit('newMessage',generateMessage('Admin', 'New User Joined'));

   socket.on('createMessage' ,(message,callback) =>{
     console.log('CreateMessage :', message);
     io.emit('newMessage', generateMessage(message.from, message.text)
     );
      callback('This is from the server');

   });



  socket.on('disconnection' , () => {
    console.log(' User Disconnected');
  });

  // socket.emit('newEmail',{
  //   from:'kanishka',
  //   text:'hello !! Welcome everyone',
  //   createdAt:23456
  // });

});




app.use(express.static(publicPath));

app.get('/', (req,res) => {
  res.send();
});

server.listen(port, () =>{
  console.log(`Server is running on port ${port}`);
});
