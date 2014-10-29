var State = require("./models/state");


var co = State.create(
{	
	"citizens":"coloradians",
	"longName": "Colorado",	
	"name": "CO",	
	"label":"Democratic",
	"youngReplublicanPercent": 26.6, 
	"oldRepublicanPercent": 50.11, 
	"youngVoters": 308,
	"oldVoters": 1311, 
	"youngTurnoutPercent": 	37.4, 
	"oldTurnoutPercent": 70.7 , 
	"prediction": 0, 
	"result": 0.51,
	"cantidate_d":"Udall (D)",
	"cantidate_r":"Gardner (R)"
})

var ga = State.create(
{
	"citizens":"georgians",
	"longName": "Georgia",
	"label":"Democratic",
	"name": "GA",	
	"youngReplublicanPercent": 42.5, 
	"oldRepublicanPercent": 61, 
	"youngVoters": 349,
	"oldVoters": 1559, 
	"youngTurnoutPercent": 	28.9, 
	"oldTurnoutPercent": 60.2 , 
	"prediction": 0, 
	"result": 0.59,
	"cantidate_d":"Nunn (D)",
	"cantidate_r":"Perdue (R)"
})

var io = State.create(
{
	"citizens":"iowans",
	"label":"Democratic",
	"longName": "Iowa",
	"name": "IO",	
	"youngReplublicanPercent": 52.9, 
	"oldRepublicanPercent": 69.8, 
	"youngVoters": 341,
	"oldVoters": 1219, 
	"youngTurnoutPercent": 	34, 
	"oldTurnoutPercent": 67.1 , 
	"prediction": 0, 
	"result": 0.67,
	"cantidate_d":"Braley (D)",
	"cantidate_r":"Ernst (R)"
})


var ka = State.create(
{
	"citizens":"kansanians",
	"longName": "Kansas",
	"name": "KA",	
	"label":"Independent",
	"youngReplublicanPercent": 47.8, 
	"oldRepublicanPercent": 73.7, 
	"youngVoters": 306,
	"oldVoters": 1031, 
	"youngTurnoutPercent": 	22.6, 
	"oldTurnoutPercent": 60.4, 
	"prediction": 0, 
	"result": 0.71,
	"cantidate_d":"Orman (I)",
	"cantidate_r":"Roberts (R)"
})


var request = require("superagent")
var url = "https://api.import.io/store/data/0453ea2e-8222-4b50-a4aa-4d3b649c492f/_query?input/webpage/url=http%3A%2F%2Fprojects.fivethirtyeight.com%2Fsenate-2014%2Findex.html%3Fv%3D100%26initialWidth%3D1024%26childId%3Dframediv&_user=acb5893f-e604-44b7-9efa-1f7bfd504c7d&_apikey=HR17VdBypMuJpmH4Vd9p/HnKdM295YFJx4r57eg0DUB1mVnC7N9Y35iujyxXD3NruZV3zXFL8SROoluIVRFPyQ==";
request.get(url, function(res){
	var results = res.body.results;
	for (var i = results.length - 1; i >= 0; i--) {
		var result = results[i];
		var state = false;
		if(result.state == "Colo.") state = co;
		else if(result.state == "Ga.") state = ga;
		else if(result.state == "Iowa") state = io;
		else if(result.state == "Kan.") state = ka;

		if(state){
			state.prediction = transformPrediction(result.leader);
			state.save();
			console.log(state);
		}
	};

	co.initialize();
	ga.initialize();
	ka.initialize();
	io.initialize();

	State.trigger("SELECTED", State.first());

});

function transformPrediction(prediction){
	var prediction = prediction.replace("I","D");
	var parts = prediction.split("+")
	var direction =-1;
	if(parts[0]=="R") direction = 1;
	
	var split = parseInt(parts[1]);

	return Math.abs((0.5 * direction) + ( split * 0.005 ));

}


