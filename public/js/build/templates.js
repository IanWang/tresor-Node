Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                  <img src='img/icons/20.png'>\n                  我要賣東西\n                ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("<img src='img/icons/16.png'>");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n            <img src='img/logo.png'>\n          ");
  }

  data.buffer.push("    <div class='navbar small-12'>\n        <div class='large-11 small-12'>\n          <div class='search'>\n            <input type='text' placeholder='search'>\n          </div>\n          <div class='system-fn-group'> \n            <ul class='button-group radius'>\n              <li>\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("create-ts button success")
  },hashTypes:{'classNames': "STRING"},hashContexts:{'classNames': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "create", options) : helperMissing.call(depth0, "link-to", "create", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </li> \n              <li>\n                <a href='#' class='notification button secondary'>\n                  <img src='img/icons/15.png'>\n                </a>\n              </li>\n              <li> \n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("setting button secondary")
  },hashTypes:{'classNames': "STRING"},hashContexts:{'classNames': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "settings", options) : helperMissing.call(depth0, "link-to", "settings", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n              </li>\n            </ul>\n          </div>\n          ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("logo")
  },hashTypes:{'classNames': "STRING"},hashContexts:{'classNames': depth0},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "products", options) : helperMissing.call(depth0, "link-to", "products", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n          <div class='sub-navbar small-12'>\n            <div class='large-11 small-12'>\n\n            <div class='routers'>\n              <div class='route-products'>\n                <img src='img/icons/19.png'>\n                <span class='browsing'>瀏覽商品</span>\n              </div>\n              <div class='route-following'>\n                <img src='img/icons/15.png'>\n                <span>我的追蹤</span>\n              </div>\n            </div>\n            <div class='filter-group'>\n              <a href=\"#\" data-dropdown=\"filter-school\">\n                學校\n                <img src='img/icons/down-arrow.png'>\n              </a>\n              <ul id=\"filter-school\" class=\"f-dropdown\" data-dropdown-content>\n                <li><a href=\"#\">This is a link</a></li>\n                <li><a href=\"#\">This is another</a></li>\n                <li><a href=\"#\">Yet another</a></li>\n              </ul>\n              <a href=\"#\" data-dropdown=\"filter-category\">\n                商品類別\n                <img src='img/icons/down-arrow.png'>\n              </a>\n              <ul id=\"filter-category\" class=\"f-dropdown\" data-dropdown-content>\n                <li><a href=\"#\">This is a link</a></li>\n                <li><a href=\"#\">This is another</a></li>\n                <li><a href=\"#\">Yet another</a></li>\n              </ul>\n              <a href=\"#\" data-dropdown=\"filter-gender\">\n                性別\n                <img src='img/icons/down-arrow.png'>\n              </a>\n              <ul id=\"filter-gender\" class=\"f-dropdown\" data-dropdown-content>\n                <li><a href=\"#\">This is a link</a></li>\n                <li><a href=\"#\">This is another</a></li>\n                <li><a href=\"#\">Yet another</a></li>\n              </ul>\n              <a href=\"#\" data-dropdown=\"filter-sort\">\n                排序依據\n                <img src='img/icons/down-arrow.png'>\n              </a>\n              <ul id=\"filter-sort\" class=\"f-dropdown\" data-dropdown-content>\n                <li><a href=\"#\">This is a link</a></li>\n                <li><a href=\"#\">This is another</a></li>\n                <li><a href=\"#\">Yet another</a></li>\n              </ul>\n            </div>\n\n            <div class='guide'>\n              <a href='#'>\n                使用指南\n                <img src='img/icons/09.png'>\n              </a>\n            </div>\n\n            </div>\n          </div>\n        </div>\n      </div>\n  <div class='container'>    \n\n      ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n  </div>\n\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["create"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'content': ("cloth_sizes")
  },hashTypes:{'content': "ID"},hashContexts:{'content': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n      ");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n        <input type=\"number\" placeholder=\"尺寸 (必填，請輸入歐碼)\">\n        <p>\n          <a href=\"#\" data-reveal data-reveal-id=\"shoe_size_table\">鞋碼轉換表</a>\n        </p>\n      ");
  }

  data.buffer.push("<div class=\"row\">\n  <div class=\"large-12 columns text-center\">\n    <h2>新增商品</h2>\n    <p>送出以下資訊，立即刊登你的二手商品</p>\n  </div>\n</div>\n<!-- TODO: Apply ID on elements -->\n<form action=\"\">\n  <div class=\"row\">\n    <div class=\"large-6 columns\">\n      <input type=\"text\" placeholder=\"商品名稱 (必填)\">\n      <select name=\"\" id=\"\">\n        <option value=\"male\">男</option>\n        <option value=\"female\">女</option>\n      </select>\n      <!-- responsive form according to product type -->\n      ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'content': ("product_types"),
    'value': ("current_product_type"),
    'optionValuePath': ("content.value"),
    'optionLabelPath': ("content.label")
  },hashTypes:{'content': "ID",'value': "ID",'optionValuePath': "STRING",'optionLabelPath': "STRING"},hashContexts:{'content': depth0,'value': depth0,'optionValuePath': depth0,'optionLabelPath': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n      <!-- specific element for clothes -->\n      ");
  stack1 = helpers['if'].call(depth0, "typeIsClothes", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      <!-- specific elements for shoes -->\n      ");
  stack1 = helpers['if'].call(depth0, "typeIsShoes", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      <input type=\"text\" placeholder=\"商品狀態 (必填，限 15 字內)\">\n      <input type=\"number\" placeholder=\"買入價格\">\n      <input type=\"number\" placeholder=\"欲售價格 (必填)\">\n      <textarea name=\"\" id=\"\" cols=\"30\" rows=\"10\" placeholder=\"商品敘述或補充說明\"></textarea>\n    </div>\n    <div class=\"large-6 columns\">\n      <p>Image Uploader</p>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"large-6 columns\">\n      <input class=\"button\" type=\"submit\" value=\"&plus; 發佈\">\n    </div>\n  </div>\n</form>\n\n<!-- modal window: shoe size table -->\n<div id=\"shoe_size_table\" class=\"reveal-modal\" data-reveal>\n  <h1>鞋碼轉換表</h1>\n  <img src=\"http://tresor.tw/img/size-chart.jpg\" alt=\"shoe size table\">\n  <a class=\"close-reveal-modal\">&#215;</a>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["message"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h2>站內訊息</h2>\n");
  
});

Ember.TEMPLATES["product"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h2>個別商品</h2>\n");
  
});

Ember.TEMPLATES["products"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            <li>\n              <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":square"),
    'href': ("href"),
    'data-largesrc': ("large_path"),
    'data-title': ("title"),
    'data-description': ("description"),
    'data-smallsrc': ("small_path")
  },hashTypes:{'class': "STRING",'href': "STRING",'data-largesrc': "STRING",'data-title': "STRING",'data-description': "STRING",'data-smallsrc': "STRING"},hashContexts:{'class': depth0,'href': depth0,'data-largesrc': depth0,'data-title': depth0,'data-description': depth0,'data-smallsrc': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                <div class='ts-mini-info'>\n                  <h1 class='ts-mini-title'>");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h1>\n                  <p class='ts-mini-price'>$");
  stack1 = helpers._triageMustache.call(depth0, "price", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n                </div>\n              </a>\n            </li>\n          ");
  return buffer;
  }

  data.buffer.push("\n			<div class=\"main\">\n				<ul id=\"ts-grid\" class=\"ts-grid\">\n\n          ");
  stack1 = helpers.each.call(depth0, "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n\n        </ul>\n      </div>\n    \n\n");
  return buffer;
  
});

Ember.TEMPLATES["settings"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Profile");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Social media");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("Others");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("Sign out");
  }

  data.buffer.push("<h2>設定</h2>\n<ul>\n  <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "settings.profile", options) : helperMissing.call(depth0, "link-to", "settings.profile", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n  <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "settings.social_media", options) : helperMissing.call(depth0, "link-to", "settings.social_media", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n  <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "settings.others", options) : helperMissing.call(depth0, "link-to", "settings.others", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n  <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "settings.sign_out", options) : helperMissing.call(depth0, "link-to", "settings.sign_out", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n</ul>\n<div class='panel callout radius'>\n  ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["settings/others"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h3>others</h3>\n");
  
});

Ember.TEMPLATES["settings/profile"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h2>Profile</h2>\n");
  
});

Ember.TEMPLATES["settings/sign_out"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h2>sign out</h2>\n");
  
});

Ember.TEMPLATES["settings/social_media"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h2>socialize</h2>\n");
  
});

Ember.TEMPLATES["user"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("\n			<div class=\"main\">\n				<ul id=\"ts-grid\" class=\"ts-grid\">\n\n          <li>\n          <a class=\"square\" href=\"#52de6ab8f7500bf0fe3f3b78\" data-largesrc=\"http://media.smashingmagazine.com/wp-content/uploads/2013/09/app-sketch.png\" data-title=\"白色*高筒休閒鞋\" data-description=\"尺寸不合 忍痛售出 附上原購買網址↓ http://tw.mall.yahoo.com/item/p023941471582\" style='background-image: url(\"http://media.smashingmagazine.com/wp-content/uploads/2013/09/app-sketch.png\" alt=\"whatever\">\n              <div class='ts-mini-info'>\n                <h1 class='ts-mini-title'>title</h1>\n                <p class='ts-mini-price'>$399</p>\n              </div>\n            </a>\n          </li>\n\n        </ul>\n      </div>\n    \n\n");
  
});