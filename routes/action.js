var request = require('request');
var config  = require('../config/index'),
    apiUrl  = config.apiUrl,
    env     = config.env,
    logger  = config.logger,
    v1      = apiUrl + '/api/v1';
  
var getUrl  = '/product/';
var userUrl = '/user/';


exports.transaction = function(req, res){

	var key  = req.session.key;
	var user = req.session.user;
	
	var action = req.query.action + '/';
	var productId = req.query.id + '/';
	var buyerId = '&to=' + req.query.buyer;
	var method = req.query.method || 'post';

	var pUser = '?api_key=' + key + '&username=' + user;
	var path;

	if(req.query.buyer) {
		path = v1 + getUrl + productId + action + pUser + buyerId;
	} else {
		path = v1 + getUrl + productId + action + pUser; 
	}

	request(
		{	method: method
		, url: path				
		}
	, function(err, respond, body){
			var data = JSON.parse(body);
			if(data.message == 'Transaction done.') {
				res.send({msg: 'ok'});
			} else if(data.error) {
				logger.error("transaction request failure, path:", path);
				res.send({msg: 'failure'});
			} else {
				res.send(data);
			}
		}
	);
};

exports.delProduct = function(req, res) {
	
  var id = req.params.id + '/';
	var userKey = '?api_key='+ req.session.key;
	var userName = '&username=' + req.session.user;
	var path = v1 + getUrl + id + userKey + userName;
  var isOwner;
  
  request.get(path, function(err, respond, body) { 
		var product = JSON.parse(body);
    if(req.session.user === product.seller.username) {
      isOwner = true;
    } else {
      isOwner = false;
    }
  });

  if(isOwner) {
    request.del(path, function(err, respond, body) {
      console.log('delBody:', body);
      res.send({'msg': 'ok'});
    });
  } else {
    res.send({'msg': 'Bad Attempt, You\'re not the owner.'});
  }
}

