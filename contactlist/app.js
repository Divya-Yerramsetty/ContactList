//importing modules for git
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

//function calling from another folder
const route = require('./routes/route');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

//on connection
mongoose.connection.on('connected',()=>{
	console.log('Connected to database mongodb @ 27017');
})

mongoose.connection.on('error',(err)=>{
	if(err)
	{
		console.log('Error in db connection:'+err);
	}

});	


//define port num
const port = 3000;

//body -parser
app.use(bodyparser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});	

app.use('/api', route);

//add middleware - cors
app.use(cors());


 
//static files
app.use(express.static(path.join(__dirname, 'public')));

//testing server
app.get('/',(req,res)=>{
	res.send('foobar');
});


app.listen(port,()=>{
	console.log('Server started at port:'+port);
});