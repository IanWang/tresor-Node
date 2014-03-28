
var App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_BINDINGS: true,
  LOG_VIEW_LOOKUPS: true,
  LOG_STACKTRACE_ON_DEPRECATION: true,
  LOG_VERSION: true,
  debugMode: true
});

/**
 * With `didInsertElement` event,
 * we can ensure elements drawn by Ember.JS woule be
 * initialized by Zurb Foundation
 *
 * Reference:
 * https://ferritedog.wordpress.com/2013/08/11/javascript-development-workflow-the-new-norm/
 */

App.ApplicationView = Ember.View.extend({
  didInsertElement: function() {
    $(document).foundation();
    $(function() {
      Grid.init();
    });
  }
});

App.Router.map(function() {
  this.resource('settings', function() {
    this.route('others');
    this.route('profile');
    this.route('social_media');
    this.route('sign_out');
  });
  /*
  this.resource('', function() {
  	this.resource('profile', function() {
  			this.route('upload_avatar');
  	});
  });
  */
  this.resource('create');
  this.route('message');
  this.route('products', { path: '/' });
  this.route('product', { path: '/product/:product_id' });
  this.route('user', { path: '/user/:user_name'} );
  this.route('missing', { path: '/*path' });
});

App.CreateController = Ember.Controller.extend({
  current_product_type: 'textbook',
  product_types: [
    { value: 'textbook',      label: '**教科書**' },
    { value: 'clothes',       label: '上衣' },
    { value: 'coat',          label: '外套' },
    { value: 'pantskirt',     label: '褲裙' },
    { value: 'dress',         label: '連身裝' },
    { value: 'shoes',         label: '鞋類' },
    { value: 'accessories',   label: '飾品' },
    { value: 'cosmeceutical', label: '藥妝' },
    { value: 'electronics',   label: '3C產品' },
    { value: 'book',          label: '一般書籍' },
    { value: 'others',        label: '其他' }
  ],

  // for clothes, coat, pantskirt, and dress
  typeIsClothes: function() {
    var types = 'clothes,coat,pantskirt,dress'.split(',');
    return -1 !== types.indexOf(this.get('current_product_type'));
  }.property('current_product_type'),

  // for shoes
  typeIsShoes: function() {
    return this.get('current_product_type') === 'shoes';
  }.property('current_product_type'),

  cloth_sizes: 'Free size,XS,S,M,L,XL,XXL'.split(',')
});

App.ProductsRoute = Ember.Route.extend({
  model: function() {
    if (window.location.host.split(':')[0] === 'localhost') {
      // load fake data
      return posts;
    } else {
      // load from production site
      return $.getJSON('http://pa4373.ribosome.com.tw:8000/static/js/app/api.json').then(function(data) {
        return data.objects.map(function(post) {

          post.large_path = post.image[0].w960.relative_path;
          post.small_path = post.image[0].w236.relative_path;

          console.log(post);
          return post;

        });
      });
    }
  }
});

App.MissingRoute = Em.Route.extend({
    redirect: function(){
        this.transitionTo('products');
    }
});

var posts = [{
  title: 'product1',
  href: 'http://google.com',
  image: [{
    w236: {
      path: 'http://tresor.tw/media/images/products/52fccd99f7500bf86be39921-265070213617344679693853873725059812355_w236.jpg'
    },
    w960: {
    path: 'http://tresor.tw/media/images/products/52fccd99f7500bf86be39921-264740143546338878464935538079883512835_w960.jpg'
    }
  }],
  description: 'description111111',
  price: '1111'

},{
  title: 'product2',
  href: 'http://tresor.tw',
  image: [{
    w236: {
    path: 'http://tresor.tw/media/images/products/52fccd22f7500bf864e39922-170836755275061519848860560972856609795_w236.jpg'
    },
    w960: {
    path: 'http://tresor.tw/media/images/products/52fccd22f7500bf864e39922-170493218000991543967838074727002196995_w960.jpg'
    }
  }],
  description: 'description2222',
  price: '2222'
}];

