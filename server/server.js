const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {isRealString} = require('./utils/validation.js');
const {generateMessage,generateLocationMessage} = require('./utils/message.js');

var app = express();


publicPath=path.join(__dirname ,'../public');
const port = process.env.PORT || 5000;

var server = http.createServer(app);
var io = socketIO(server);
io.on('connection' , (socket) => {
  console.log('New User Connected');

socket.on('join',(params,callback) =>
{
  if(!isRealString(params.name)||(!isRealString(params.room)))
  callback('Name and Room are not valid');

  else {
    socket.join(params.room);

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the ChatApp')

    );

   socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} has joined `));

    callback();
  }



});
   // socket.on('createEmail', (newEmail) =>{
   //
   //   console.log('createEmail',newEmail);
   // });


   socket.on('createMessage' ,(message,callback) =>{
     console.log('CreateMessage :', message);
     io.emit('newMessage', generateMessage(message.from, message.text)
     );
      callback();

   });

   socket.on('createLocationMessage',(coords) => {
     io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude )
     );
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
