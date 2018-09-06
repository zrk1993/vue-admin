function urlParse(url) {
    var obj = {};
    var reg = /[?&][^?&]+=[^?&]+/g;
    var arr = url.match(reg);

    if (arr) {
        arr.forEach(function (item) {
            var tempArr = item.substring(1).split('=');
            var key = decodeURIComponent(tempArr[0]);
            var val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
}

function interceptAjax(callback) {
    var _XMLHttpRequest = window.XMLHttpRequest;
    window.XMLHttpRequest = function () {
        var xhr = new _XMLHttpRequest(arguments);
        
        var _open = xhr.open;
        xhr.open = function (method, url) {
            xhr._method = method.toLowerCase();
            xhr.requestURL = url;
            _open.apply(xhr, arguments);
        }

        var _send = xhr.send;
        xhr.send = function (d) {
            var _onload = xhr.onload || Number;
            xhr.onload = function() {
                _onload();
                callback({
                    url: xhr.responseURL,
                    method: xhr._method,
                    reqData: xhr._method === 'get' ? urlParse(xhr.responseURL) : d,
                    resData: xhr.responseText,
                });
            }
            _send.apply(xhr, arguments);
        }
        return xhr;
    }
}

var interceptList = [
    {
        url: 'user',
        type: 'login',
    },
];

interceptAjax(function(data) {
    for (var i in interceptList) {
        if (data.url.indexOf(interceptList[i].url) != -1) {
               console.log(data);
        }
    }
});


