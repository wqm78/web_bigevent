$(function () {
    const form = layui.form
    form.verify({
        nickname: function (val) {
            if (val.length > 6) {
                return '用户昵称只能是1-6位'
            }
        }
    })

    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success(res) {
                if (res.status !== 0) {
                    layui.layer.msg(res.message || '获取用户失败！')
                    return
                }
                // console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    layui.layer.msg(res.message || '更新失败！')
                    return
                }
                // console.log(res);
                layui.layer.msg('更新成功！')
                window.parent.getUserInFo()
            }
        })
    })

})