var express = require("express");

var path = require("path");
var session = require('express-session');

var app = express();
var bodyParser = require('body-parser');
const server = app.listen(1337);

app.use(express.static( __dirname + '/public/dist/public' ));

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
}))

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authors');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({
  limit: '5mb'
}));

var AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must enter name"],
    minlength: [3, "Name must be longer than 2 characters"]
  }
}, {
  timestamps: true
})
mongoose.model('Author', AuthorSchema);
var Author = mongoose.model('Author');


app.get('/authors', (req, res) => {
    Author.find({}, (err, authors) => {
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
           res.json({message: "Success", data: authors})
        }
     })
})

app.get('/authors/:id', (req, res) => {
  var ObjectId = mongoose.Types.ObjectId
    Author.findOne({_id: new ObjectId(req.params.id)}, (err, authors) => {
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
           res.json({message: "Success", data: authors})
        }
     })
})

app.post('/authors', (req,res) => {
  Author.create(req.body, (err, authors) => {
    if(err){
       console.log("Returned error", err);
       res.json({message: "Error", error: err})
    }
    else {
       res.json({message: "Success", data: authors})
    }
  })
})

app.put('/authors/:id', (req,res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, {runValidators:true, new: true}, (err, authors) =>{
    if(err){
       console.log("Returned error", err);
       res.json({message: "Error", error: err})
    }
    else {
       res.json({message: "Success", data: authors})
    }
  })
})

app.delete('/authors/:id', (req,res) => {
  Author.findByIdAndRemove(req.params.id, (err) => {
    if(err){
       console.log("Returned error", err);
       res.json({message: "Error", error: err})
    }
    else {
       res.json({message: "Success"})
    }
  })
})

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"))
});
