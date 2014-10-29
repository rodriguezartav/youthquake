var Layout = require("./layout")
require("../../lib/drag");
var Domify = require("domify");
StateSlider.state = null;

function StateSlider(container, state){
	this.sliders = [];
	this.state = state;
	this.el = Domify( Layout(state) );
	StateSlider.state = this.state;

	this.slider_young = this.el.querySelector(".slider_1")
	this.slider_old = this.el.querySelector(".slider_2")
	this.slider_participation = this.el.querySelector(".slider_3")
	container.appendChild(this.el);

	var that=this;
	this.drag_slider_young = new Dragdealer( this.slider_young, { slide: false, x: this.state.youngDemocratPercent, animationCallback: function(e){ return that.on_drag_slider_young_SliderDrag(e) } } );	
	this.drag_slider_old = new Dragdealer( this.slider_old, { slide: false, x: this.state.oldDemocratPercent, animationCallback: function(e){ return that.on_drag_slider_oldSliderDrag(e) } } );	
	this.drag_slider_participation = new Dragdealer( this.slider_participation, {slide: false, x: this.state.youngTurnoutPercent/ 100, animationCallback: function(e){ return that.on_drag_slider_participation_SliderDrag(e) } } );	
	this.state.calculateResult();

	this.setLabels();

}

StateSlider.prototype.setLabels = function(){
	this.slider_young.querySelector("span").innerHTML = parseInt(this.state.youngDemocratPercent * 100) + "%";
	this.slider_old.querySelector("span").innerHTML = parseInt(this.state.oldDemocratPercent * 100)+ "%";
	this.slider_participation.querySelector("span").innerHTML = parseInt(this.state.youngTurnoutPercent)+ "%";
}

StateSlider.prototype.on_drag_slider_young_SliderDrag = function (e){
	this.state.youngReplublicanPercent = 1 - e
	this.state.save()
	this.state.calculateResult();
	this.renderResult();
	this.setLabels();
}

StateSlider.prototype.on_drag_slider_oldSliderDrag = function(e){
	this.state.oldRepublicanPercent = 1 - e
	this.state.updateRatio();
	this.state.save()
	this.state.calculateResult();
	this.renderResult();
	this.setLabels();
}

StateSlider.prototype.on_drag_slider_participation_SliderDrag= function(e){
	this.state.youngTurnoutPercent = e * 100;
	this.state.save()
	this.state.calculateResult();
	this.renderResult();
	this.setLabels();
}

StateSlider.prototype.renderResult =function(){
	//console.log(this.state.result);
}




module.exports = StateSlider