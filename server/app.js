var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var index = require('./routes/index');
var dataRetrieve = require('./routes/dataRetrieve');

//body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ expanded:true }));

app.set("port", process.env.PORT || 5000);

//routing paths
app.use('/data', dataRetrieve);
app.use("/", index);

app.listen(app.get("port"), function(){
    console.log("listening on...", app.get("port"));
});