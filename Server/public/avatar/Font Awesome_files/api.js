(function(){var e,g="function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){a!=Array.prototype&&a!=Object.prototype&&(a[c]=b.value)},k="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,l=function(a,c){if(c){var b=k;a=a.split(".");for(var d=0;d<a.length-1;d++){var f=a[d];f in b||(b[f]={});b=b[f]}a=a[a.length-1];d=b[a];c=c(d);c!=d&&null!=c&&g(b,a,{configurable:!0,writable:!0,value:c})}},p=function(a){var c=0;return function(){return c<a.length?
{done:!1,value:a[c++]}:{done:!0}}},q=function(){q=function(){};k.Symbol||(k.Symbol=t)},u=function(a,c){this.T=a;g(this,"description",{configurable:!0,writable:!0,value:c})};u.prototype.toString=function(){return this.T};
var t=function(){function a(b){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new u("jscomp_symbol_"+(b||"")+"_"+c++,b)}var c=0;return a}(),x=function(){q();var a=k.Symbol.iterator;a||(a=k.Symbol.iterator=k.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&g(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return w(p(this))}});x=function(){}},w=function(a){x();a={next:a};a[k.Symbol.iterator]=function(){return this};return a},y=function(a,
c){x();a instanceof String&&(a+="");var b=0,d={next:function(){if(b<a.length){var f=b++;return{value:c(f,a[f]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d};l("Array.prototype.keys",function(a){return a?a:function(){return y(this,function(c){return c})}},"es6","es3");l("Array.prototype.values",function(a){return a?a:function(){return y(this,function(c,b){return b})}},"es8","es3");
var z=this||self,A=function(a,c,b){a=a.split(".");b=b||z;a[0]in b||"undefined"==typeof b.execScript||b.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===c?b=b[d]&&b[d]!==Object.prototype[d]?b[d]:b[d]={}:b[d]=c},B=Date.now||function(){return+new Date};var C=function(){this.O=""};C.prototype.toString=function(){return"SafeScript{"+this.O+"}"};C.prototype.c=function(a){this.O=a;return this};(new C).c("");var D=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};var E=function(){this.R=""};E.prototype.toString=function(){return"SafeStyle{"+this.R+"}"};E.prototype.c=function(a){this.R=a;return this};(new E).c("");var F=function(){this.P=""};F.prototype.toString=function(){return"SafeStyleSheet{"+this.P+"}"};F.prototype.c=function(a){this.P=a;return this};(new F).c("");var G=function(){this.N=""};G.prototype.toString=function(){return"SafeHtml{"+this.N+"}"};G.prototype.c=function(a){this.N=a;return this};(new G).c("<!DOCTYPE html>",0);(new G).c("",0);(new G).c("<br>",0);var I=function(a){this.F=a||{cookie:""}};e=I.prototype;e.isEnabled=function(){return navigator.cookieEnabled};e.ga=function(a){return!/[;=\s]/.test(a)};e.ha=function(a){return!/[;\r\n]/.test(a)};
e.set=function(a,c,b,d,f,h){if("object"===typeof b){var m=b.ta;h=b.secure;f=b.domain;d=b.path;b=b.sa}if(!this.ga(a))throw Error('Invalid cookie name "'+a+'"');if(!this.ha(c))throw Error('Invalid cookie value "'+c+'"');void 0===b&&(b=-1);f=f?";domain="+f:"";d=d?";path="+d:"";h=h?";secure":"";b=0>b?"":0==b?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(B()+1E3*b)).toUTCString();this.na(a+"="+c+f+d+b+h+(null!=m?";samesite="+m:""))};e.aa=function(){return this.I().keys};e.da=function(){return this.I().values};
e.na=function(a){this.F.cookie=a};e.ba=function(){return(this.F.cookie||"").split(";")};e.I=function(){for(var a=this.ba(),c=[],b=[],d,f,h=0;h<a.length;h++)f=D(a[h]),d=f.indexOf("="),-1==d?(c.push(""),b.push(f)):(c.push(f.substring(0,d)),b.push(f.substring(d+1)));return{keys:c,values:b}};var J={},K=function(a,c,b){this.b=a;this.K=c;this.D=b;this.v=Math.floor((new Date).getTime()/1E3);this.o=8035200;this.j=void 0};K.prototype.qa=function(){return this.b+"$"+this.K+":"+this.D};K.prototype.ra=function(){var a=this.b+"$"+this.K+":"+this.v+":"+this.o;"string"==typeof this.j&&(a=a.concat(":",this.j));return a};K.prototype.pa=function(a,c,b){this.v=a;this.o=c;this.j=b};K.prototype.fa=function(){return(new Date).getTime()>(new Date(1E3*(this.v+this.o))).getTime()};
var M=function(a){var c={},b=new I(document);if(!b.isEnabled())return c;var d=b.aa();b=b.da();if(null==d||null==b)return c;for(var f=0;f<d.length;f++)if("__utmx"==d[f])for(var h=L(b[f],a),m=0;m<h.length;m++){var n=/([^$]+)\$([^:]+):(.*)/.exec(h[m]);null!==n&&4==n.length&&(n=new K(n[1],n[2],n[3]),c[n.b]=n)}f={};for(h=0;h<d.length;h++)if("__utmxx"==d[h])for(m=L(b[h],a),n=0;n<m.length;n++){var r=/([^$]+)\$([^:]+):([^:]+):([^:]+):?(.*)/.exec(m[n]);if(null!==r&&5<=r.length){var H=r[1],v=c[H];"undefined"!=
typeof v&&(v.pa(parseInt(r[3],10),parseInt(r[4],10),6==r.length?r[5]:void 0),v.fa()||(f[H]=v))}}return f},L=function(a,c){a=a.split(".");return"string"==typeof c&&0<a.length&&a[0]!=c?[]:a.slice(1)};var N=function(a,c,b,d,f){this.b=f||N.DEFAULT_ID;this.a=a;this.h=c;this.i=b;this.g=d;this.M=!1};N.experiments_={};N.DEFAULT_ID="";e=N.prototype;e.u=function(a){if(!this.m()&&!this.J()){var c=new I(document);if(O(c.isEnabled(),"Unable to write cookies")){var b=this.w(a),d=this.H(),f=M(d);f[this.b]=new K(this.b,"0",b);b=d;for(var h in f){var m=f[h];b=b.concat(".",m.qa());d=d.concat(".",m.ra())}c.set("__utmx",b,this.g,this.h,this.l());c.set("__utmxx",d,this.g,this.h,this.l());-2!=a[0]&&this.S(a)}}};
e.S=function(a){window.gaData||(window.gaData={});window.gaData.expId=this.b;window.gaData.expVar=this.w(a)};e.l=function(){if("string"==typeof this.a&&""!=this.a&&"none"!=this.a&&"auto"!=this.a)return this.a;if("none"==this.a)return null;var a=""+document.domain;return 0==a.indexOf("www.")?a.substring(4):a};
e.H=function(){if(!this.i)return"1";var a=this.l();if(a){var c=1,b;if(a)for(c=0,b=a.length-1;0<=b;b--){var d=a.charCodeAt(b);c=(c<<6&268435455)+d+(d<<14);d=c&266338304;c=0!=d?c^d>>21:c}a=String(c)}else a="1";return a};e.w=function(a){for(var c=0;c<a.length;c++)if(-2==a[c])return"";return a.join("-")};e.s=function(a){if(0==a.length)return-2;a=a.split("-");for(var c=[],b=0;b<a.length;b++)c[b]=parseInt(a[b],10);return c};var O=function(a,c){!a&&c&&console&&console.error&&console.error(c);return a};
e=N.prototype;e.m=function(){var a=window._gaUserPrefs;return a&&a.ioo&&a.ioo()||document.getElementById("__gaOptOutExtension")};e.L=function(){if(!this.M){var a=N.experiments_[this.b];this.M=!0;if(!O("object"==typeof a,"Could not load experiment")||a.error)return!1;this.f=a.data}return O("object"===typeof this.f,"Could not load experiment")};e.G=function(){if(this.m())return-2;var a=this.J();if(a)return a;a=M(this.H())[this.b];if(!a)return-1;a=this.s(a.D);-2!=a&&this.S(a);return a};
e.X=function(){if(this.m()||!this.L())return 0;var a=this.G();if(-2==a||this.ea(a))return 0;if(-1!==a)return a;if(!this.ca())return this.u([-2]),0;a=this.ia();this.u(a);return a};e.ca=function(a){return("number"==typeof a?a:Math.random())<this.f.participation};
e.ia=function(a){O("undefined"===typeof _gaq,"Variations should be chosen before hit is sent to GA");a="number"==typeof a?a:Math.random();for(var c=0;c<this.f.items.length;c++){var b=this.f.items[c];if(a<b.weight)return this.s(b.id);a-=b.weight}O(!1,"The combinations weights did not add up to 1");return[0]};e.$=function(a){return this.L()&&O(0<=a&&a<this.f.items.length)?this.f.items[a]:null};
e.J=function(){var a=/#utmxid=[-_a-zA-Z0-9]{22};utmxpreview=(\d{1,2});/.exec(window.location.hash);return a?(a=this.$(parseInt(a[1],10)),this.s(a.id)):null};e.ea=function(a){if("number"===typeof a)return!1;a=this.w(a);for(var c=0;c<this.f.items.length;c++){var b=this.f.items[c];if(b.id==a)return b.disabled}O(!1,"Unable to locate combination with id "+a);return!0};J=J||{};J.W=0;A("cxApi.ORIGINAL_VARIATION",J.W,void 0);J.V=-1;A("cxApi.NO_CHOSEN_VARIATION",J.V,void 0);J.U=-2;A("cxApi.NOT_PARTICIPATING",J.U,void 0);J.B="auto";A("cxApi.DEFAULT_DOMAIN",J.B,void 0);J.C=48211200;A("cxApi.DEFAULT_EXPIRATION_SECONDS",J.C,void 0);J.A="/";A("cxApi.DEFAULT_COOKIE_PATH",J.A,void 0);J.a=J.B;J.h=J.A;J.i=!0;J.g=J.C;J.ka=function(a,c){O("string"==typeof c||"undefined"==typeof c,"Invalid experiment id: "+c)&&(new N(J.a,J.h,J.i,J.g,c)).u([a])};
A("cxApi.setChosenVariation",J.ka,void 0);J.oa=function(a){O("string"==typeof a,"Invalid domain name: "+a)&&(J.a=a)};A("cxApi.setDomainName",J.oa,void 0);J.ma=function(a){O("string"==typeof a,"Invalid cookie path: "+a)&&(J.h=a)};A("cxApi.setCookiePath",J.ma,void 0);J.ja=function(a){O("boolean"==typeof a,"Invalid value for allowHash: "+typeof a)&&(J.i=a)};A("cxApi.setAllowHash",J.ja,void 0);J.la=function(a){O("number"==typeof a,"Invalid cookieExpirationSeconds: "+a)&&(J.g=a)};
A("cxApi.setCookieExpirationSeconds",J.la,void 0);J.Y=function(a){O("string"==typeof a||"undefined"==typeof a,"Invalid experiment id: "+a);a=(new N(J.a,J.h,J.i,J.g,a)).X();return"number"===typeof a?a:a[0]};A("cxApi.chooseVariation",J.Y,void 0);J.Z=function(a){O("string"==typeof a||"undefined"==typeof a,"Invalid experiment id: "+a);a=(new N(J.a,J.h,J.i,J.g,a)).G();return"number"===typeof a?a:a[0]};A("cxApi.getChosenVariation",J.Z,void 0);}).call(this);
