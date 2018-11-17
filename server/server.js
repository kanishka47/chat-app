const path = require('path');
const express = require('express');

var app = express();

publicPath=path.join(__dirname ,'../public');
const port = process.env.PORT || 5000;

app.use(express.static(publicPath));

app.get('/', (req,res) => {
  res.send();
});

app.listen(port, () =>{
  console.log(`Server is running on port ${port}`);
});
