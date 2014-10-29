var Layout = require("./layout")
var Item = require("./item")

var Domify = require("domify");

var State = require("../models/state");

function StateSelector(container, state){
	var _this = this;
	this.sliders = [];
	this.state = state;
	this.el = Domify( Layout(state) );
	this.list = this.el.querySelector(".horizontal-selector-scroll")
	this.list.onclick= function(e){ _this.onClick(e); }

	this.state = state;
	var states = State.all();

	for (var i = states.length - 1; i >= 0; i--) {
		var state = states[i];
		this.state.active = ""
		if( this.state.name == state.name ) state.active="active"
		this.list.innerHTML += Item(state);
	};

	container.appendChild(this.el);

	var items = this.list.querySelectorAll(".state_item")
	var width = 0;
	for (var i = items.length - 1; i >= 0; i--) {
		//console.dir(items[i])
		width += items[i].offsetWidth
	};

	//this.list.style.width = width + 100 + "px";

}

StateSelector.prototype.onClick = function(e){
	var target = e.target;
	var state = State.find(target.dataset.id);
	State.trigger("SELECTED", state);
}






module.exports = StateSelector