var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/employees_group_project');
mongoose.model('Employee', new Schema({"name": String, "salary": String, "tenure": String}, {collection: 'employees'}));
var Employee = mongoose.model('Employee');

router.delete('/data', function(req,res){
   Employee.findByIdAndRemove({"_id": req.body.id}, function(err,data){
      if (err) console.log(err);
       res.send(data);
   });
});
router.get('/data', function(req, res){
   Employee.find({}, function(err, data){
       if (err) console.log(err);
       res.send(data);
   });
});

router.get('/*', function(req, res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;