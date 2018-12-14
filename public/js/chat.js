var socket = io();
socket.on('connect' , function ()  {
  console.log('Connected to server');

  var params = jQuery.deparam(window.location.search);

  socket.emit('join' , params , function(err){
     if(err){
      alert(err);
      window.location.href = '/';
     }
     else{
       console.log('No error');
     }

  });
});


socket.on('disconnect' , function () {
  console.log('Disonnected from server');
});

socket.on('updateUserList' ,function (users) {
  //console.log('Users List' , users);
  var ol = jQuery('<ol></ol>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

function scrollToBottom () {

    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');

    var newMesssageHeight = newMessage.innerHeight();
    var lastMesssageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop +lastMesssageHeight+newMesssageHeight >=
    scrollHeight)
    messages.scrollTop(scrollHeight);



}



// socket.emit('createMessage' ,{
//   from:'neha',
//   text:'hi guys'
// }, function(data){
//   console.log('Got it !', data);
// });

socket.on('newMessage' , function(mes) {
  console.log('Message is :', mes);

   var formattedTime = moment(mes.createdAt).format('h:mm a');
   var template = jQuery('#message-template').html();
   var html = Mustache.render(template,{
      text:mes.text,
      from:mes.from,
    createdAt:formattedTime
   });

   jQuery('#messages').append(html);
    scrollToBottom();
  // var li = jQuery('<li></li>');
  // li.text(`${mes.from} ${formattedTime} : ${mes.text}`);
  //
  // jQuery('#messages').append(li);
});


socket.on('newLocationMessage',function(message){

     var formattedTime = moment(message.createdAt).format('h:mm a');

     var template = jQuery('#messageLocation-template').html();
     var html = Mustache.render(template,{
        url:message.url,
        from:message.from,
      createdAt:formattedTime
     });

     jQuery('#messages').append(html);
          scrollToBottom();

  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My Current Location</a>');
  // li.text(`${message.from} ${formattedTime}: `)
  // a.attr('href',message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  } ,function () {
     jQuery('[name=message]').val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click' , function(){
  if(!navigator.geolocation){
  return alert('Geolocation Api is not supported on your browser');
}

locationButton.attr('disabled','disabled').text('Sending Location ...');
navigator.geolocation.getCurrentPosition(function(position){
  //console.log(position);
  locationButton.removeAttr('disabled').text('Send Location');
  socket.emit('createLocationMessage',{
    latitude:position.coords.latitude,
    longitude:position.coords.longitude
  });

}, function(){
  locationButton.removeAttr('disabled').text('Send Location');
  alert('Unable to fetch location');
});
});
