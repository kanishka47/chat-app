var socket = io();
socket.on('connect' , function ()  {
  console.log('Connected to server');
});


socket.on('disconnect' , function () {
  console.log('Disonnected from server');
});





// socket.emit('createMessage' ,{
//   from:'neha',
//   text:'hi guys'
// }, function(data){
//   console.log('Got it !', data);
// });

socket.on('newMessage' , function(mes) {
  console.log('Message is :', mes);
  var li = jQuery('<li></li>');
  li.text(`${mes.from} : ${mes.text}`);

  jQuery('#messages').append(li);
});



jQuery('#message-form').on('submit',function (e) {
  e.preventDefault();

  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  } ,function () {

  });
});
