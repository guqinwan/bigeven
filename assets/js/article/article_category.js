$(function () {
    var layer = layui.layer
    var form = layui.form
    var index_add =null
    var index_change =null
    $('#addcategory').on('click', function () {
      index_add = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            ,content: $('#tpl_add').html()
          }); 
    })    
    getTableList()
    function getTableList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取文章列表失败')
                }
                console.log(res);
                $('tbody').html(template('tpl_table',res))   
            }
        })
       
    }
    $('body').on('submit','#form_submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                   return layer.msg('新增文章分类失败')
                }
                
                
                getTableList()
                layer.msg('新增文章分类成功')
                layer.close(index_add)
            }
        })
    })

    $('tbody').on('click','#edit',function(){
      index_change = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            ,content: $('#tpl_change').html()
          }); 
          
          var id = $('#edit').attr('data_id')
          form.val("form_filter",{
               "Id":id,
               "name":$(this).parent().siblings('#name').html(),
               "alias":$(this).parent().siblings('#alias').html()
                
        })
    })
    
    
        $('body').on('submit','#form_change',function(e){
            e.preventDefault()
            //console.log($(this).serialize());
            $.ajax({
                method:'POST',
                url:'/my/article/updatecate',
                data:$(this).serialize(),
                success:function(res){
                    if(res.status!==0){
                        return layer.msg('修改文章分类失败！')
                    }
                    getTableList()
                layer.msg('修改文章分类成功')
                layer.close(index_change)
                }
            })
        })
        $('tbody').on('click','#del',function(){
            var id =$(this).attr('data_id')
            console.log(id);
            layer.confirm('确认删除',{icon:3,title:'提示'},
            function(index){
                $.ajax({
                    method:'get',
                    
                    url:'/my/article/deletecate/'+id,
            
                    success:function(res){
                        if(res.status!==0){
                            return layer.msg('删除分类失败！')
                        }
                        layer.msg('删除分类成功！')
                        layer.close(index)
                        getTableList()
                    }

                })
                
            })
        })
})
