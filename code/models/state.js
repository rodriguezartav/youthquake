var _3Model = require("clay-model")
var Ajax = require("clay-model");

State = _3Model.setup("State",  ["label","citizens","longName","cantidate_r", "cantidate_d", "name", "youngReplublicanPercent", "oldRepublicanPercent", "oldDemocratPercent", "youngDemocratPercent" ,"youngVoters","ratio", "oldVoters", "youngTurnoutPercent", "oldTurnoutPercent", "prediction", "result"] );

State.prototype.updateRatio= function(){
	this.ratio = parseInt( (this.oldRepublicanPercent / this.youngReplublicanPercent) * 100 ) / 100
}

State.prototype.initialize= function(){

	this.ratio = parseInt( ( this.oldRepublicanPercent / this.youngReplublicanPercent ) * 100 ) / 100

	var GC = this.youngTurnoutPercent * this.youngVoters
	var DH = this.oldVoters * this.oldTurnoutPercent
	var DH_ratio = this.ratio * this.oldVoters * this.oldTurnoutPercent

	//E = I(GC+DH)/(GC+1.88DH)

	var top = this.prediction * ( GC + DH )
	var bottom = ( GC + DH_ratio )

	this.youngReplublicanPercent = top / bottom;

	this.oldRepublicanPercent = this.youngReplublicanPercent * this.ratio;
	this.oldDemocratPercent = 1- this.oldRepublicanPercent;
	this.youngDemocratPercent = 1-this.youngReplublicanPercent;
	this.save();
//c = youngVoters
//d = oldVoters
//e = youngReplublicanPercent
//f = oldRepublicanPercent
//g = youngTurnoutPercent
//h = oldTurnoutPercent
//i= Result (%R)
//E = I(GC+DH)/(GC+1.88DH)

}

State.prototype.calculateResult = function(){
	//(EGC+1.88EDH)/(GC+DH)
	//I = (EGC+FDH)/(GC+DH)

	var EGC = this.youngReplublicanPercent * this.youngTurnoutPercent * this.youngVoters;
	var ratio_EDH = this.oldRepublicanPercent * this.oldVoters * this.oldTurnoutPercent
	var GC = this.youngTurnoutPercent * this.youngVoters
	var DH = this.oldVoters * this.oldTurnoutPercent

	var top = EGC+ ratio_EDH
	var bottom = GC + DH;

	this.result = top/ bottom;
	this.oldDemocratPercent = 1- this.oldRepublicanPercent;
	this.youngDemocratPercent = 1-this.youngReplublicanPercent;

	this.save();
}

module.exports= State