// ==UserScript==
// @name           新闻变更
// @version        1.0.0
// @namespace      userscript.xiaja.com
// @author         pelebl@gmail.com
// @description    帮你找到最新的新闻
// @include        http://www.ifeng.com/
// @include        http://www.sina.com.cn/
// @include        http://www.163.com/
// @include        http://www.sohu.com/
// @homepageURL    https://github.com/pelebl/FindNews/
// @updateURL      https://raw.github.com/pelebl/FindNews/master/findnews.user.js
// @downloadURL    https://raw.github.com/pelebl/FindNews/master/findnews.user.js
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==


var arr = [];
var links = '';

$.each($('a'), function(index, obj){
    var key = $(obj).text();
    var value = $(obj).attr('href');
    
    if(value != undefined && jQuery.inArray(key, arr) == -1){
        arr.push(key);
        var tmpVal = localStorage[key];
        if(tmpVal === undefined || tmpVal != value){
            localStorage[key] = value;
            $(obj).attr('style','color:green;text-decoration:line-through;');            
            links = links + '<li><a href="' +value + '" >' + key + '</li>';
        }
    }   
}
);

links = '<div id="FindNews"><ul>' + links + '</ul></div>';

$('body').append(links);

GM_addStyle( 
    ' #FindNews {             ' +
    '    background: white;     ' +
    '    border: 2px solid red; ' +
    '    padding: 4px;          ' +
    '    position: fixed;    ' +
    '    top: 150px; right: 8px;   ' +
    '    max-width: 400px;      ' +
    ' } '
);
