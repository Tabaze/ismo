import { login,insertUser } from './service.js';
// core  Login
$(function () {
	$('#formLogin').on('submit', this, function () {
		console.log(2222)
		if(this.checkValidity()){
			let formData=$(this).serializeArray();
			let data={
				userName:formData[0].value,
				passwordUser:formData[1].value,
			}
			if(login(data)){
				window.location.href = 'ModeleDossier.aspx';
			}else{
				ittone.warning("Incorrect information");
			}
		}else{
			ittone.error("username or password is required");	  
		}
	});
	$('#formSignUp').on('submit', this, function () {
		console.log(2221)
		if(this.checkValidity()){
			let formData=$(this).serializeArray();
			let data={
				nomUser:formData[0].value,
				userName:formData[1].value,
				passwordUser:formData[2].value,
			}
			if(insertUser(data)){
				ittone.success("successfully");
			}else{
				ittone.warning("Incorrect information");
			}
		}
		else{
			ittone.error("username or password is required");	  
		}
	});
});