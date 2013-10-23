var request  = require('request');
var fs       = require('fs');
var formData = require('form-data');
var http     = require('http');
var moment   = require('moment');

var config = require('../config/index'),
    apiUrl = config.apiUrl,
    env    = config.env,
    logger = config.logger,
    v1     = apiUrl + '/api/v1';
    
var getUrl    = '/product/';
var userUrl   = '/user/';
var uploadImg = '/imageupload/';


exports.createNew = function(req, res){

	var key = req.session.key;
	var user = req.session.user;
	var pUser = '?api_key=' + key + '&username=' + user;
	var path = v1 + getUrl + pUser;
	var data = req.body;

	var rawForm = {
		bought_price: data.bought,
		description: data.des,
		gender: data.gender,
		title: data.title,
		size: data.size,
		sold_price: data.sold,
		product_status: data.status
	};

	var form =JSON.stringify(rawForm);

	request(
		{ method: 'POST',
			uri: path, 
			headers: {
				'content-type': 'application/json; type=' + data.type
			},
			body: form
		}, 
		function(err, response, body){
			if (!err && response.statusCode == 201) {
				
				var objID = response.headers.location.split('/');
				var productID = objID[objID.length-2];
				console.log('createBody:',form);
				
				res.send({
					status: 'ok',
					id: productID
				});
			
			} else {
				logger.error("create failure :", response);
				res.send(null);
			}
		}
	);
}

exports.uploadImg = function(req, res){
	
	var form = new formData();
	var key = req.session.key;
	var user = req.session.user;
	var pUser = '?api_key=' + key + '&username=' + user;
	var path = v1 + uploadImg + pUser;
	var id = req.body.ObjectId //'5235ce660b36712d4f7ad36f'

	form.append('image', fs.createReadStream(req.files.images.path));
	form.append('ObjectId', id);
	form.submit(path, function(err, response) {
		if(err) { 
      res.send(err);
    } else {
      res.send('done');
    }
	});

}

