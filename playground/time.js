// var date = new Date();
// console.log(date.getMonth());

var moment = require('moment');

var date = moment();

date.add(2, 'months').subtract(1,'days');
console.log(date.format('MMMM  Do , YYYY'));

console.log(date.format('h:mm a'));
