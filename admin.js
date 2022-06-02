const showStudents = () => {
	
	document.querySelector('#staff-content').style.display = 'none';
	document.querySelector('#students-content').style.display = 'block';
	
};

const showStaff = () => {
	
	document.querySelector('#students-content').style.display = 'none';
	document.querySelector('#staff-content').style.display = 'block';
	
};

const showDialog = (shownID, hiddenID0, hiddenID1) => {
	
	const dialog = document.querySelector(shownID)
	
	if (dialog.style.display === 'block') {
		
		dialog.style.display = 'none';
		return;
		
	}
	
	document.querySelector(hiddenID0).style.display = 'none';
	document.querySelector(hiddenID1).style.display = 'none';
	dialog.style.display = 'block';
	
}

const showAddStudent = () => {
	
	showDialog('#add-student-dialog', '#update-student-dialog', '#delete-student-dialog');
	
}

const showUpdateStudent = () => {
	
	showDialog('#update-student-dialog', '#add-student-dialog', '#delete-student-dialog');
	
}

const showDeleteStudent = () => {
	
	showDialog('#delete-student-dialog', '#add-student-dialog', '#update-student-dialog');
	
}

const showAddStaff = () => {
	
	showDialog('#add-staff-dialog', '#update-staff-dialog', '#delete-staff-dialog');
	
}

const showUpdateStaff = () => {
	
	showDialog('#update-staff-dialog', '#add-staff-dialog', '#delete-staff-dialog');
	
}

const showDeleteStaff = () => {
	
	showDialog('#delete-staff-dialog', '#add-staff-dialog', '#update-staff-dialog');
	
}

const findStudent = id => {
	
	const students = document.querySelectorAll('.student-entry');
	
	for (let i = 0; i < students.length; ++i) {
		
		const student = students[i];
		
		if (student.querySelector('.student-id').textContent === id)
			return student;
		
	}
	
	return undefined;
	
};

const addStudent = () => {
	
	const id = document.querySelector('#add-student-id').value;
	const name = document.querySelector('#add-student-name').value;
	const department = document.querySelector('#add-student-department').value;
	const email = document.querySelector('#add-student-email').value;
	
	if (!validateID(id) || !validateName(name) || !validateEmail(email))
		return;
	
	if (findStudent(id) !== undefined) {
		
		alert(`Student with id ${id} already exists`);
		return;
		
	}
	
	const template = document.querySelector('#student-template');
	template.content.querySelector('.student-id').textContent = id;
	template.content.querySelector('.student-name').textContent = name;
	template.content.querySelector('.student-department').textContent = department;
	template.content.querySelector('.student-email').textContent = email;
	
	const entry = template.content.cloneNode(true);
	document.querySelector('#student-entries').appendChild(entry);
	
	showAddStudent();
	
};

const showStudentUpdate = () => {
	
	const id = document.querySelector('#update-student-id').value;
	
	if (!validateID(id))
		return;
	
	const student = findStudent(id);
	
	if (student === undefined) {
		
		alert(`Student with id ${id} not found`)
		return;
		
	}
	
	const name = student.querySelector('.student-name').textContent;
	const department = student.querySelector('.student-department').textContent;
	const email = student.querySelector('.student-email').textContent;
	
	document.querySelector('#update-student-name').value = name;
	document.querySelector('#update-student-department').value = department;
	document.querySelector('#update-student-email').value = email;
	
	document.querySelector('#update-student-dialog-inner').style.display = 'block';
	
};

const hideStudentUpdate = () => {
	
	document.querySelector('#update-student-dialog-inner').style.display = 'none';
	
};

const updateStudent = () => {
	
	const id = document.querySelector('#update-student-id').value;
	const name = document.querySelector('#update-student-name').value;
	const department = document.querySelector('#update-student-department').value;
	const email = document.querySelector('#update-student-email').value;
	
	if (!validateID(id) || !validateName(name) || !validateEmail(email))
		return;
	
	const student = findStudent(id);
	
	if (student === undefined) {
		
		alert(`Student with id ${id} not found`)
		return;
		
	}
	
	student.querySelector('.student-name').textContent = name;
	student.querySelector('.student-department').textContent = department;
	student.querySelector('.student-email').textContent = email;
	
	hideStudentUpdate();
	
	showUpdateStudent();
	
};

const deleteStudent = () => {
	
	const id = document.querySelector('#delete-student-id').value;
	
	if (!validateID(id))
		return;
	
	const student = findStudent(id);
	
	if (student === undefined) {
		
		alert(`Student with id ${id} not found`)
		return;
		
	}
	
	student.remove();
	
	showDeleteStudent();
	
};

const findStaff = id => {
	
	const staffs = document.querySelectorAll('.staff-entry');
	
	for (let i = 0; i < staffs.length; ++i) {
		
		const staff = staffs[i];
		
		if (staff.querySelector('.staff-id').textContent === id)
			return staff;
		
	}
	
	return undefined;
	
};

const addStaff = () => {
	
	const id = document.querySelector('#add-staff-id').value;
	const name = document.querySelector('#add-staff-name').value;
	const email = document.querySelector('#add-staff-email').value;
	
	if (!validateID(id) || !validateName(name) || !validateEmail(email))
		return;
	
	if (findStaff(id) !== undefined) {
		
		alert(`Staff with id ${id} already exists`);
		return;
		
	}
	
	const template = document.querySelector('#staff-template');
	template.content.querySelector('.staff-id').textContent = id;
	template.content.querySelector('.staff-name').textContent = name;
	template.content.querySelector('.staff-email').textContent = email;
	
	const entry = template.content.cloneNode(true);
	document.querySelector('#staff-entries').appendChild(entry);
	
	showAddStaff();
	
};

const showStaffUpdate = () => {
	
	const id = document.querySelector('#update-staff-id').value;
	
	if (!validateID(id))
		return;
	
	const staff = findStaff(id);
	
	if (staff === undefined) {
		
		alert(`Staff with id ${id} not found`)
		return;
		
	}
	
	const name = staff.querySelector('.staff-name').textContent;
	const email = staff.querySelector('.staff-email').textContent;
	
	document.querySelector('#update-staff-name').value = name;
	document.querySelector('#update-staff-email').value = email;
	
	document.querySelector('#update-staff-dialog-inner').style.display = 'block';
	
};

const hideStaffUpdate = () => {
	
	document.querySelector('#update-staff-dialog-inner').style.display = 'none';
	
};

const updateStaff = () => {
	
	const id = document.querySelector('#update-staff-id').value;
	const name = document.querySelector('#update-staff-name').value;
	const email = document.querySelector('#update-staff-email').value;
	
	if (!validateID(id) || !validateName(name) || !validateEmail(email))
		return;
	
	const staff = findStaff(id);
	
	if (staff === undefined) {
		
		alert(`Staff with id ${id} not found`)
		return;
		
	}
	
	staff.querySelector('.staff-name').textContent = name;
	staff.querySelector('.staff-email').textContent = email;
	
	hideStaffUpdate();
	
	showUpdateStaff();
	
};

const deleteStaff = () => {
	
	const id = document.querySelector('#delete-staff-id').value;
	
	if (!validateID(id))
		return;
	
	const staff = findStaff(id);
	
	if (staff === undefined) {
		
		alert(`Staff with id ${id} not found`)
		return;
		
	}
	
	staff.remove();
	
	showDeleteStaff();
	
};

const validateID = id => {
	
	if (/^\d+$/.test(id))
		return true;
	
	alert('Id must be a number');
	return false;
	
};

const validateName = name => {
	
	if (name !== '')
		return true;
	
	alert('Name must not be empty');
	return false;
	
};

const validateEmail = email => {
	
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
		return true;
	
	alert(`${email} is not a valid email address`);
	return false;
	
};