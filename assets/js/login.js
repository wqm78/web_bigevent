$(function () {
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    var { form, layer } = layui;
    // var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            const pwd = $('.reg-box [name=repassword]').val()
            if (pwd !== value) return ('两次密码不一致')
        }
    })
    $('#form-reg').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form-reg [name=uname]').val(),
                password: $('#form-reg [name=password]').val(),
            },
            success(res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                $('#link-login').click()
            }
        })
    })
    $('#form-login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})