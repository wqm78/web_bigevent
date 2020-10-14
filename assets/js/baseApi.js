$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        const { status, message } = res.responseJSON;
        // if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！')
        if (status === 1 && message === '身份认证失败！') {
            // console.log(res);
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})