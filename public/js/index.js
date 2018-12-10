var socket = io();
socket.on('connect' , function ()  {
  console.log('Connected to server');
});


socket.on('disconnect' , function () {
  console.log('Disonnected from server');
});

socket.on('newEmail' , function (email){
  console.log('New Email',email);
});

socket.emit('createMessage',{
  to:'tgraju54@gmail.com',
  text:'money!!cash binny binny'
});


socket.emit('createEmail',{
  to:'tgraju54@gmail.com',
  text:'ujkkoll'
});


socket.on('newMessage' , function(mes) {
  console.log('Message is :', mes);
});
