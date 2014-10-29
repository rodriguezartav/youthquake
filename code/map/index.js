var Layout = require("./layout")
var Domify = require("domify");
var State = require("../models/state")

function Map(container, state){
	this.state = state;
	this.state.initialize();
	this.el = Domify( Layout(state) );

	this.d_percent = this.el.querySelector(".d_percent")
	this.r_percent = this.el.querySelector(".r_percent")
	this.mapImage = this.el.querySelector("img");


	if(state.name == "KA"){
		this.d_percent.classList.remove("blue");
		this.d_percent.classList.add("green");
	}

	container.appendChild(this.el);

	var mapInstance = this;
	State.bind("update", function(){ mapInstance.onStateChange() })
	this.onStateChange();
}

Map.prototype.onStateChange = function(){
	var result = this.state.result * 100;
	result = parseInt( result * 1000  ) / 1000  ;
	if(result > 100) result=100;
	if(result < 0) result = 0;
	var mult = 100;
	if(isMobile.any()) mult = 10;
	this.r_percent.innerHTML = (parseInt(result * mult) / mult)  + "%";
	this.d_percent.innerHTML = (parseInt( ( mult - result ) * mult) / mult)  + "%";

	this.setMap(result)
}

Map.prototype.setMap = function(result){
	var state = this.state
	var modifier = ""
	if(isMobile.any() == null ) modifier ="_l"
	var src;
	if(result > 50) src= this.mapImage.dataset.base + "/images/" + state.name.toLowerCase() + "_r" + modifier + ".png"
	else src = this.mapImage.dataset.base + "/images/"+ state.name.toLowerCase()  +"_d" + modifier +".png"

	this.mapImage.src = src;

}

module.exports = Map