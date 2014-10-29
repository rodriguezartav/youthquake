var StateSlider = require("./stateSlider");

function init(){
	var _3vot = document.querySelector("._3vot")
	_3vot.onclick = onSocialClick	
}

function onSocialClick(e){
	var target = e.target;
	if( target.classList.contains("social") == false ) return false;
	if(target.dataset.type == "facebook") return share(target);
	if(target.dataset.type == "twitter") return onTweet(target);
}

function share(target){
	var data = target.dataset;
	var link = window.location.href
	var image = "{3vot}/images/youthquake2014.jpg"

	if(image.indexOf("http:")==-1) image = "http:" + image

	FB.ui({
	  method: 'feed',
	  show_error: true,
    name: "If more young Americans voted, how might that influence elections?",
    link: link,
    picture: image,
    description: "If the 18-29yo voter turnout in "+StateSlider.state.longName+" is "+parseInt(StateSlider.state.youngTurnoutPercent)+"%, here’s who’s likely to be the next Senator: " + getWinner()
	})
}

function onTweet(target){
	var data = target.dataset;
	var link = "http://fusion.net/story/22733/youthquake-2014-senate-election-tool/";
	var twitter = "text=" + encodeURIComponent("If the 18-29yo voter turnout in "+StateSlider.state.longName+" is "+parseInt(StateSlider.state.youngTurnoutPercent)+"%, here’s who’s likely to be the next Senator: " + getWinner()) + "&url=" + link	
	var url ="https://twitter.com/share?" + twitter
	window.open(url,'_blank');
}

function getWinner(){
	var result = ""
	if( StateSlider.state.result > 0.50) result = StateSlider.state.cantidate_r;	
	else result = StateSlider.state.cantidate_d;
	return result;
}

module.exports = init;