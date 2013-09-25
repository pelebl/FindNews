// ==UserScript==
// @name           新闻变更器
// @namespace      userscript.xiaja.com
// @author         pelebl@gmail.com
// @description    帮你找到最新的新闻
// @homepageURL    https://github.com/pelebl/FindNews/
// @updateURL      https://raw.github.com/pelebl/FindNews/master/findnews.user.js
// @downloadURL    https://raw.github.com/pelebl/FindNews/master/findnews.user.js
// @version        1.0.6
// @include        http://www.ifeng.com/
// @include        http://www.sina.com.cn/
// @include        http://www.163.com/
// @include        http://www.sohu.com/
// @include        http://www.donews.com/
// @include        http://www.csdn.net/
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==
var version = "1.0.6";
var arr = [];
var links = '';

var oldDate = localStorage['last_date'];
var today = (new Date()).toDateString();

if(oldDate != today){
    localStorage.clear();
}

localStorage['last_date'] = today;

$.each($('a'), function (index, obj) {
    var key = $(obj).text();
    var value = $(obj).attr('href');

    if (value != undefined && jQuery.inArray(key, arr) == -1) {
        arr.push(key);
        var tmpVal = localStorage[key];
        if (tmpVal === undefined || tmpVal != value) {
            localStorage[key] = value;
            $(obj).attr('style', 'color:green;text-decoration:line-through;');
            links = links + '<li><a target="_blank" href="' + value + '" >' + key + '</li>';
        }
    }
});

if(links === ''){
    links = '<div id="FindNews">没有更新噢:)</div>';
}
else{
    links = '<div id="FindNews"><ul>' + links + '</ul></div>';
}

$('body').append(links);




//#endregion