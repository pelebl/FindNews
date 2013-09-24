// ==UserScript==
// @id             findchange@userscript.xiaja.com
// @name           findchangelink
// @version        1.0
// @namespace      userscript.xiaja.com
// @author         pele
// @description    Find news which you didn't read
// @include        http://www.ifeng.com/
// @include        http://www.sina.com.cn/
// @homepageURL    https://userscripts.org/scripts/show/165951
// @updateURL      https://userscripts.org/scripts/source/165951.meta.js
// @downloadURL    https://userscripts.org/scripts/source/165951.user.js
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require        https://raw.github.com/bbarakaci/fixto/master/dist/fixto.min.js
// ==/UserScript==

var arr = [];
var links = '';

$.each($('a'), function(index, obj){
    var key = $(obj).text();
    var value = $(obj).attr('href');
    
    if(jQuery.inArray(key, arr) == -1){
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

$('#FindNews').fixTo('body');