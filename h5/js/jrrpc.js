/**
 * Created by asus on 2017/4/21.
 */

var file_server = 'http://47.104.24.85:8081';
var api_server = 'http://47.104.24.85:8090';

(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 21.333333333 * (clientWidth / 320) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

jQuery.extend({
    //ajax扩展
    JsonRpc: function(param, successFunc) {
        var url = api_server+'/shareContents?shareId='+param.shareId+'&type='+param.type;
        // var url = 'http://train.api.livestaring.com/v004/tests/shareContents?shareId='+param.shareId+'&type='+param.type;
        $.ajax({
            type: "get",
            url: url,
            datatype: "JSON",
            success: function (obj) {
                if (typeof(obj) == "object") {
                    successFunc(obj);
                } else {
                    try{
                        var response = $.parseJSON(obj);
                         if(response.code == 'fail'){
                            alert("服务器错误，请刷新重试");
                            return false;
                        }
                        successFunc(response);
                    }catch (err){
                        console.log(err);
                        console.log(obj);
                    }
                }
            },
            error: function () {
                console.log("error");
            }
        });

    }
});
var iService = function() {
    function getUserAgent() {
        var u = navigator.userAgent,
            isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
            isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            agent = {
                isAndroid: isAndroid,
                isiOS: isiOS
            };
        return agent;
    }

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = decodeURI(window.location.search.substr(1)).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    return {
        getUserAgent: getUserAgent,
        getQueryString: getQueryString
    }
}();



