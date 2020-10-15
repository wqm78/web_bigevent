$(function () {
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            style: 'get',
            url: '/my/article/cates',
            success(res) {
                const htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });

    })
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layui.layer.msg('新增分类失败！')
                }
                initArtCateList()
                layui.layer.msg('新增分类成功！')
                layui.layer.close(indexAdd)
            }
        })
    })

    var indexEdit = null
    $('tbody').on('click', '#btn-edit', function (e) {
        e.preventDefault()
        indexEdit = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success(res) {
                layui.form.val('form-edit', res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg('更新分类数据失败！')
                }
                layui.layer.msg('更新分类数据成功！')
                layui.layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    $('body').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        layui.layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success(res) {
                    if (res.status != 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layui.layer.msg('删除分类成功！')
                    layui.layer.close(index)
                    initArtCateList()
                }
            })
        })
    })
})