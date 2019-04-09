/*
* @Author: jing
* @Date:   2019-04-08 09:30:45
* @Last Modified by:   jing
* @Last Modified time: 2019-04-09 18:16:10
*/
;(function($){
	var $login = $('#login');
	var $register = $('#register');
	//登陆界面切换
	$('#go-register').on('click',function(){
		$login.hide();
		$register.show()
	});
	$('#go-login').on('click',function(){
		$register.hide();
		$login.show()
	});

	//2.注册验证
	//2.1获取数据
	var username = $register.find('[name="username"]').val();
	var password = $register.find('[name="password"]').val();
	var repassword = $register.find('[name="repassword"]').val();
	var $err = $register.find('.err');
	var errMsg = '';
	//2.2进行验证
	if(!/^[a-z][0-9a-z_]{2,9}$/i.test(username)){
		errMsg = '用户名以字母开头，包含数字下划线3-10位自符'
	}
	else if(!/w{3,6}^$/.test(password)){
		errMsg = '密码3-6位自符'
	}
	else if(repassword != password){
		errMsg = '两次密码不一致'
	}
	if(errMsg){
		$err.html(errMsg);
		return;
	}else{
		$err.html('');
		$.ajax({
			url:'/user/register',
			type:'post',
			dataType:'json',
			data:{
				username:username,
				password:password
			}
		})
		.done(function(res){
			console.log(res)
		})
		.fail(function(err){
			$err.html('请求失败，请稍后再试');
		})
	}
	//2.3发送ajax
})(jQuery);