//796694167041552','796697407041228'
window.fbAsyncInit = function() {
  FB.init({
    appId      : '796694167041552',
    xfbml      : true,
    version    : 'v2.0'
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
