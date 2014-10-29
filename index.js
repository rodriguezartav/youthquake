var fs = require('fs');
var insertCss = require('insert-css');
var css = fs.readFileSync(__dirname + '/css/style.css');
insertCss(css);

var container = document.querySelector("#_3vot_elections_map");

var State = require("./code/models/state");

var View  = require("./code/view")

var Social = require("./code/social");
var social; 

require("./code/data")
	
View(container);

State.bind("SELECTED", function(state){
	View.setState(state);
})

Social();