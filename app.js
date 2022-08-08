//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
var _ = require("lodash");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//database setup
mongoose.connect("mongodb://localhost:27017/todolistDB"); //database connection and database name



const listSchema = {
  name: String,
};

const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {

  List.find({}, function(err, foundItems) {
    //to check if Item is empty
    if(err){
      console.log(err);
    } else {
      res.render("list", {
        newListItems: foundItems
      });
    }
  });
});

app.post("/", function(req, res) {

  const itemName = req.body.newItem;
//adding a new item to the database
  const postName = new List({
    name: itemName
  });
    postName.save();
    res.redirect("/");

});

app.post("/delete", function(req, res) {
  const checkItemId = req.body.checkbox;

    List.findByIdAndRemove(checkItemId, function(err) {
      if (!err) {
        console.log("Succesfully deleted");
      }
      res.redirect("/");
    });
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
