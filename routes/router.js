
var request   = require('request');
var fs        = require('fs');
var moment    = require('moment');
var Datastore = require('nedb')
  , db        = new Datastore({
    filename: 'db/feedback.json', 
    autoload: true
  })

var config = require('../config/index'),
    apiUrl = config.apiUrl,
    env    = config.env,
    logger = config.logger,
		logout = config.logout,
    v1     = apiUrl + '/api/v1';
    
/*
var apiUrl = 'http://localhost:8000';
var v1 = 'http://localhost:8000/api/v1';
var logout = 'http://tresor.tw/logout/';

var apiUrl = 'http://pa4373.ribosome.com.tw:8000';
var v1 = 'http://pa4373.ribosome.com.tw:8000/api/v1';
var logout = 'http://pa4373.ribosome.com.tw:8000/logout';
*/

var getUrl = '/product/';
var userUrl = '/user/';

exports.index = function(req, res){
	console.log('user in:', req.session.user + ' at ' + moment().format('lll'));
	logger.info('user in:', req.session.user);
	res.render('main');
};

exports.allProduct = function(req, res){
	
	var key = req.session.key;
	var user = req.session.user;
	var filter = req.query.type || null;
	var onSell = '?transaction_status=on';
	var pUser = '&api_key=' + key + '&username=' + user;
	var reqPath = v1 + getUrl + onSell + pUser;
	
	if(filter) {
		if(filter === 'all') {
			reqPath = v1 + getUrl + onSell + pUser;
		} else {
			reqPath += '&type=' + filter;	
		}
	} else if(req.query.page) {
		reqPath = apiUrl + req.query.page;
	}

	request.get(reqPath, function(err, respond, body){
		res.send(body);
	});

};

exports.userProduct = function(req, res){
		
	var key = req.session.key;
	var user = req.session.user;
	var type = req.query.type;

	var pUser = '?api_key=' + key + '&username=' + user + type + user;
	var reqPath = v1 + getUrl + pUser;

	if(req.query.page) {
		reqPath = apiUrl + req.query.page;
	}

	request.get(reqPath, function(err, respond, body){
		
		var data = JSON.parse(body);
		var items = [];

		data.objects.forEach(function(ele) {
			var item = {};
			if(ele.image[0]) {
				item.img = ele.image[0].w236.relative_path;
			} else {
				item.img = 'img/grey.gif';
			}
			item.title = ele.title;
			item.date = moment(ele.date_added).format('lll');
			item.id = ele.id;
			item.status = ele.transaction_status;
			item.waiting = ele.wait_list.length || '0';
			items.push(item);
		});

		res.send(items);
	});

};

exports.create = function(req, res){
	res.render('create');
};

exports.user = function(req, res){

	var key = req.session.key;
	var user = req.session.user;
	var pUser = '?api_key=' + key + '&username=' + user +'&seller_username=' + user;
	var reqPath = v1 + userUrl + pUser;

	request.get(reqPath, function(err, respond, body){
		var data = JSON.parse(body)['objects'];
		var info = {
			name: data[0].facebook_name,
			img: data[0].image
		};
		res.render('user', {user: info});
	});

};

exports.product = function(req, res){

	var render = req.query.light ? 'lightbox' : 'product';

	id = req.params.id + '/';
	var userKey = '?api_key='+ req.session.key;
	var userName = '&username=' + req.session.user;
	var path = v1 + getUrl + id + userKey + userName;

	request.get(path, function(err, respond, body){
		var product = JSON.parse(body);
		var buyers = [];
		var confirmList = [];
		var line = product.wait_list.length || '0';
		var d = {}; //will be res data
	
		function dateToMil (date) {
			var x = new Date(moment(date).format());
			var mil = x.valueOf();
			return mil;
		}

		d.img = [];
		d.name = product.title;
		d.id = product.id;
		d.soldPrice = product.sold_price;
		d.boughtPrice = product.bought_price;
		d.type = product.resource_type;
		d.size = product.size || '--';
		d.status = product.product_status;
		d.description = product.description;
		d.tranStatus = product.transaction_status;
		d.owner = product.seller.facebook_name;
		d.ownerPic = product.seller.image_small;
		d.ownerFbId = product.seller.facebook_id;
		product.image.forEach(function(ele, index){
			d.img.push({
				'thumb': ele.h50.relative_path, 
				'full' : ele.w960.relative_path
			});
		});

		// generate Date label (if > x days, show details)
		var now   = moment().format('L');
		var dDate = moment(product.date_added).format('L');
		var nowMil   = dateToMil(now);
		var dDateMil = dateToMil(dDate);
		var days = 86400000 * 5;
		var diff = nowMil - dDateMil;

		if(diff > days) {
			d.date = moment(product.date_added).format('LLL');
		} else {
			d.date = moment(product.date_added, "YYYY-MM-DDTHH:mm:ss").fromNow();
		}

		// if user isn't Authenticated

			if(d.tranStatus === 'closed') {
				res.render(render, {
					item: d,
					closed: true
				});
			}

			// if the user is seller
			if(product.seller.username === req.session.user) {

				if(product.confirm_list.length > 0) {
					product.confirm_list.forEach(function(ele){
						var confirm = {};
						if(ele.seller_confirm) {
							confirm.id = ele.bidder.id;
							confirm.name = ele.bidder.facebook_name;
							confirm.fb = ele.bidder.facebook_id;
							confirm.img = ele.bidder.image_small;
							confirmList.push(confirm);
						}
					});
				}

				if(product.wait_list.length > 0) {
					product.wait_list.forEach(function(ele){
						var buyer = {}; 
						buyer.id = ele.bidder.id;
						buyer.name = ele.bidder.facebook_name;
						buyer.fb = ele.bidder.facebook_id;
						buyer.img = ele.bidder.image_small;
						if(confirmList.length > 0) {
							confirmList.forEach(function(e){
								if(buyer.id !== e.id) {
									buyers.push(buyer);
								}
							});
						} else {
							buyers.push(buyer);
						}
					});

					res.render(render, {
						item: d, 
						confirmList: confirmList,
						waitList: buyers,
						line: '現有 '+line+' 人排隊中。'
					});

				} else {
					res.render(render, {
						item: d, 
						msg: '還沒有人排隊哦！',
					});
				}

			} else {

				// if the user is buyer
				var me = req.session.user;
				var inConfirm;
				var inWait;

				if(product.confirm_list.length > 0) {
					product.confirm_list.some(function(e){
						if(e.bidder_confirm) {
							inConfirm = (me === e.bidder.username) ? true : false;
							if(inConfirm) {
								return true;
							}
						}
					});
				}

				if(product.wait_list.length > 0) {
					product.wait_list.some(function(e){
						inWait = (me === e.bidder.username) ? true : false;
						if(inWait) {
							return true;
						}
					});
				}

				if(inConfirm) {
					res.render(render, {
						item: d, 
						inConfirm: true,
						line: line
					});

				} else if(inWait) {
					res.render(render, {
						item: d, 
						inWait: true,
						line: line
					});

				} else {
					res.render(render, {
						item: d,
						line: line
					});
				}
		}
	});

};

exports.getToken = function(req, res){
	apiKey = req.query.api_key;
	userName = req.query.username;
	
	if(apiKey && userName) {
		req.session = {
			key: apiKey,
			user: userName
		};
		res.redirect('/');
	} else {
		res.render('regFail');
	}
}

exports.logout = function(req, res){
	if(req.session){
		console.log('destory',req.session.user);
		req.session = null;
		console.log('Now, it\'s', req.session);
		res.redirect(logout);
	} else {
		console.log('cant remove session');
		res.redirect('/');
	}
}

exports.feedback = function(req, res) {
  db.insert(req.body, function(err, newDoc){
    if(err) {
      res.send({'msg': 'fail'});
    } else {
      db.update({_id: newDoc._id}, {
        $set: {
          user: req.session.user
        }
      }, {upsert: true});

      console.log('feedback:', req.body);
      res.send({'msg': 'ok'});
    }
  });
}

