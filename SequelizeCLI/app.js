//Including dependency
var express = require('express'),
    Sequelize = require('sequelize'),
    bodyParser = require('body-parser')
    db = require('./models/index');

require('dotenv').config();

var app = express();
var port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Checking connection status
var test = db.sequelize.authenticate()
    .then(function () {
        console.log("CONNECTED! ");
    })
    .catch(function (err) {
        console.log("SOMETHING WENT WRONG");
    })
    .done();

userRouter = require('./routes/user.routes');
taskRouter = require('./routes/task.routes');

userRouter(app);
taskRouter(app);
app.get('/', function(req,res){
    res.send("Welcome");
});

app.listen(port, function(){
    console.log('Application started on PORT: ' + port);
});