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


socket.on('newLocationMessage',function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');
  li.text(`${message.from}: `)
  a.attr('href',message.url);
  li.append(a);
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

var locationButton = jQuery('#send-location');
locationButton.on('click' , function(){
  if(!navigator.geolocation){
  return alert('Geolocation Api is not supported on your browser');
}

navigator.geolocation.getCurrentPosition(function(position){
  //console.log(position);
  socket.emit('createLocationMessage',{
    latitude:position.coords.latitude,
    longitude:position.coords.longitude
  });

}, function(){
  alert('Unable to fetch location');
});
});
