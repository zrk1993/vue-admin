function urlParse(url) {
  const obj = {};
  const reg = /[?&][^?&]+=[^?&]+/g;
  const arr = url.match(reg);

  if (arr) {
    arr.forEach((item) => {
      const tempArr = item.substring(1).split('=');
      const key = decodeURIComponent(tempArr[0]);
      const val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}

function interceptAjax(callback) {
  const _XMLHttpRequest = window.XMLHttpRequest;
  window.XMLHttpRequest = function () {
    const xhr = new _XMLHttpRequest(arguments);

    const _open = xhr.open;
    xhr.open = function (method, url) {
      xhr._method = method.toLowerCase();
      xhr.requestURL = url;
      _open.apply(xhr, arguments);
    };

    const _send = xhr.send;
    xhr.send = function (d) {
      const _onload = xhr.onload || Number;
      xhr.onload = function () {
        _onload();
        callback({
          url: xhr.responseURL,
          method: xhr._method,
          reqData: xhr._method === 'get' ? urlParse(xhr.responseURL) : d,
          resData: xhr.responseText,
        });
      };
      _send.apply(xhr, arguments);
    };
    return xhr;
  };
}

const interceptList = [
  {
    url: 'user',
    type: 'login',
  },
];

interceptAjax((data) => {
  for (const i in interceptList) {
    if (data.url.indexOf(interceptList[i].url) != -1) {
      console.log(data);
    }
  }
});

