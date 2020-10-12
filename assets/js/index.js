$(function () {
    getUserInFo()
    const layer = layui.layer
    $('.btnClose').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })


})
function getUserInFo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success(res) {
            // console.log(res);
            if (res.status != 0) {
                return layui.layer.msg('获取用户失败！')
            }
            renderAvatar(res.data)
        },
        // complete(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // console.log(res);
        //         localStorage.removeItem('token')
        //         location.href='/login.html'
        //     }
        // }
    })
}

function renderAvatar(data) {
    const name = data.nickname || data.username
    $('.welcome').html('欢迎&nbsp&nbsp' + name)
    if (data.user_pic !== null) {
        $('.layui-nav-img').attr('src', data.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        const text = name[0].toUpperCase()
        $('.text-avatar').html(text).show()
    }
}