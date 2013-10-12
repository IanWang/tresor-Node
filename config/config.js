module.exports  = 
		{
				development:{
						api:{
								host:'pa4373.ribosome.com.tw',
								port:':8000',
								protocol:'http',
								ip: '0.0.0.0'
						},
						logs:{
								path:'../logs'
						},
						action: {
							logout:'http://pa4373.ribosome.com.tw:8000/logout',
							login:'http://pa4373.ribosome.com.tw:8000/login'
						}
				},
				production:{
						api:{
								host:'localhost',
								port:':8000',
								protocol:'http',
								ip: '127.0.0.1'
						},
						logs:{
								path:'/home/jsclient/tresor/logs'
						},
						action: {
							logout: 'http://tresor.tw/logout/',
							login: 'http://tresor.tw/login/'
						}
				}  
		}
