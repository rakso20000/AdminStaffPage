const toggle = button => {
	
	const studentsList = button.parentElement.querySelector('.students-list');
	
	if (studentsList.style.display === 'block') {
		
		button.classList.remove('course-button-active');
		studentsList.style.display = 'none';
		
	} else {
		
		button.classList.add('course-button-active');
		studentsList.style.display = 'block';
		
	}
	
};