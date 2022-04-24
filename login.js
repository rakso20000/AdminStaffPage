let tries = 3;

const checkTries = () => {
	
	if (--tries <= 0) {
		
		const submitButtons = document.querySelectorAll('.submit');
		
		submitButtons[0].disabled = true;
		submitButtons[1].disabled = true;
		
	}
	
};

const staffLogin = () => {
	
	const name = document.querySelector('#staff-name').value;
	const password = document.querySelector('#staff-password').value;
	
	if (name === 'Staff' && password === 'Staff')
		return true;
	
	alert('Login Credentials Incorrect');
	
	checkTries();
	
	return false;
	
};

const adminLogin = () => {
	
	const name = document.querySelector('#admin-name').value;
	const password = document.querySelector('#admin-password').value;
	
	if (name === 'Admin' && password === 'Admin')
		return true;
	
	alert('Login Credentials Incorrect');
	
	checkTries();
	
	return false;
	
};