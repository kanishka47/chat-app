const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

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

   socket.on('createMessage' ,(message) =>{
     console.log('CreateMessage :', message);
     io.emit('newMessage', {
       from: message.from,
       text:message.text,
       createdAt:new Date().getTime()
     });
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
