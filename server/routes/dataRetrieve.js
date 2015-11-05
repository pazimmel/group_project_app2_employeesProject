var express = require('express');
var router = express.Router();
var getName = require('./somepath')

//Mongoose connect and create schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/employees_group_project');
mongoose.model('Employee',
    new Schema(
        {   "name": String,
            "salary": String,
            "tenure": String,
            "frozen": Boolean},
        { collection: 'employees' }
    ));
var Employee = mongoose.model('Employee');

//Freeze Route
router.put('/freeze', function(req,res){
        //var name = getName(req.body.id)
        Employee.update({_id: req.body.id}, {frozen:true}, function(err,data){
            if (err) console.log(err);
            res.send(data);
        });
    }
);
//unfreeze Route
router.put('/unfreeze', function(req,res){
        Employee.update({_id: req.body.id}, {frozen:false}, function(err,data){
            if (err) console.log(err);
            res.send(data);
        });
    }
);
//Delete Route
router.delete('/', function(req,res){
    Employee.findByIdAndRemove({"_id": req.body.id}, function(err,data){
        if (err) console.log(err);
        res.send(data);
    });
});

//Get Routes, getting employee data from database
router.get('/', function(req, res){
    Employee.find({}, function(err, data){
        if (err) console.log(err);
        res.send(data);
    });
});

module.exports = router;