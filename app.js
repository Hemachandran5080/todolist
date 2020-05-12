//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const items = [];
const workItems = [];
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){

    const date = new Date();
    const options = {
        weekday:"long",
        month:"long",
        day:"numeric",
        year:"numeric"
    }

    const day = date.toLocaleDateString("en-US",options);

    res.render("list",
    {
        listTitle:day,
        newItems:items
    });
});

app.post("/", function(req,res){
    const item = req.body.newListItem;
    if(req.body.list === "WorkList"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", function(req,res){
    res.render("list", {listTitle:"WorkList",newItems:workItems});
});

app.get("/about", function(req,res){
    res.sendFile(__dirname + "/index.html");
});


app.listen(3000, function(req,res){
    console.log("Server running on port 3000");
});
