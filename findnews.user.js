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
var version = "1.0.7";
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
            
            // just display length more than 4.
            if(key.length > 4){
                links = links + '<li><a target="_blank" href="' + value + '" >' + key + '</li>';
            }         
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


//#region 更新专用检测代码

//firefox 专用检测代码
GM_xmlhttpRequest({
    method: "GET",
    url: "https://raw.github.com/pelebl/FindNews/master/version.js",
    onload: function (o) {
        eval(o.responseText);

        console.log("[INFO] 更新检查：当前版本=" + version + "，新版本=" + version_helper);
        if (compareVersion(version, version_helper) < 0 && confirm("新闻更新器已发布新版 【" + version_helper + "】，为了您的正常使用，请及时更新!是否立刻更新？\n\n本次更新内容如下：\n" + version_updater.join("\n"))) {
            GM_openInTab("https://raw.github.com/pelebl/FindNews/master/findnews.user.js");
        }
    }
});

function compareVersion(v1, v2) {
    var vv1 = v1.split('.');
    var vv2 = v2.split('.');

    var length = Math.min(vv1.length, vv2.length);
    for (var i = 0; i < length; i++) {
        var s1 = parseInt(vv1[i]);
        var s2 = parseInt(vv2[i]);

        if (s1 < s2) return -1;
        if (s1 > s2) return 1;
    }

    return vv1.length > vv2.length ? 1 : vv1.length < vv2.length ? -1 : 0;
};

//#endregion