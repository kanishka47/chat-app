const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {isRealString} = require('./utils/validation.js');
const {generateMessage,generateLocationMessage} = require('./utils/message.js');
const {Users} = require('./utils/users.js');

var app = express();


publicPath=path.join(__dirname ,'../public');
const port = process.env.PORT || 5000;

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users() ;

io.on('connection' , (socket) => {
  console.log('New User Connected');

socket.on('join',(params,callback) =>
{
  if(!isRealString(params.name)||(!isRealString(params.room)))
  return callback('Name and Room are not valid');

  else {
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);

    io.to(params.room).emit('updateUserList' , users.getUserList(params.room));

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
     //console.log('CreateMessage :', message);
     var user = users.getUser(socket.id);

      if(user && isRealString(message.text)){
     io.to(user.room).emit('newMessage', generateMessage(user.name, message.text)
     );
      callback();
   }
   });

   socket.on('createLocationMessage',(coords) => {
     var user = users.getUser(socket.id);
     if(user)
     io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude )
     );
   });

  socket.on('disconnect' , () => {
  //  console.log(' User Disconnected');
  var user = users.removeUser(socket.id);

  if(user) {
     io.to(user.room).emit('updateUserList', users.getUserList(user.room));
     io.to(user.room).emit('newMessage', generateMessage('Admin' , `${user.name} has left`));

  }

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
