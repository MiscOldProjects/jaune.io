// if a sites/%domain%/index.htm exists substitute the html !

var url = document.location.href;
var host = document.location.host;
var domain = document.location.hostname;
var origin = document.location.origin;

var domain_no_www = domain.replace(/www\./,'');
var user = domain_no_www.replace(/\./g,'-');
var email = user+'@'+domain_no_www;

var vhost_url = url + 'sites/' + domain_no_www;
var index_url = vhost_url + '/index.htm';
console.log('url ',url);
let head = document.getElementsByTagName('head')[0];
    head.innerHTML = head.innerHTML.replace(/%title%/g,'site: '+host);
let body = document.getElementsByTagName('body')[0];
let inner = body.innerHTML.replace(/%url%/g,url);
    inner = inner.replace(/%domain%/g,domain);
    inner = inner.replace(/%origin%/g,origin);
    inner = inner.replace(/%email%/g,email);
    body.innerHTML = inner;


fetch(index_url)
.then(function(resp) {
      status = resp.status
      console.log('status: '+status);
      if (status = '200') {
      resp.text().then( (page) => update(page) );
      }
      })
.catch(function(error) { console.log('catch: '+error) })


function update(content) {
let loc = document.location.toString();
    loc = loc.replace(/#.*/,'');
let fragment = window.location.hash.substring(1);

var html = document.getElementsByTagName('html')[0];
let buf = content.replace(/%domain%/g,domain);

    buf = buf.replace(/%origin%/g,origin);
    buf = buf.replace('%host%',host);
    buf = buf.replace('%loc%',loc);
    buf = buf.replace('%fragment%',fragment);
    buf = buf.replace(/%email%/g,email);
    buf = buf.replace(/%url%/g,url);
    buf = buf.replace(/%vhost_url%/g,vhost_url);
    buf = buf.replace(/%index%/g,index_url);
    buf = buf.replace(/{{DUCK}}/g,'https://duckduckgo.com/?q');

    console.log('buf: '+buf);
    html.innerHTML = buf;
}

