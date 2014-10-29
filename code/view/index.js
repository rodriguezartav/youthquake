var StateSlider = require("../stateSlider")

var MapComponent = require("../map")

var StateSelector = require("../stateSelector")

var State = require("../models/state");
var state;
var container;
var first= true;

function View(paramContainer){
	container= paramContainer
}

View.setState = function(paramState){
	state =paramState;

	hideActualView();
}


function hideActualView(){
	if(first){
		first = false;
		return showNewView();
	}
	

	container.style.opacity = 0;
	setTimeout( function(){
		container.innerHTML = "";
		showNewView();
	} , 230 );

}


function showNewView(){
	
	new StateSelector(container,state);
	new MapComponent(container,state);
	new StateSlider(container, state);

	container.style.opacity = 1;

}

module.exports = View;


