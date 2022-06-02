const students = new Set([
	{
		id: '0',
		firstName: 'Sara',
		lastName: 'Smith',
		dob: '2001-01-10',
		gender: 'Female',
		department: 'Multimedia',
		email: 'sara@example.com',
		joiningDate: '2015-01-10'
	},
	{
		id: '1',
		firstName: 'Peter',
		lastName: 'Long',
		dob: '2002-02-20',
		gender: 'Male',
		department: 'Mobile Applications',
		email: 'peter@example.com',
		joiningDate: '2015-02-20'
	}
]);

const init = () => {
		
	const yesterday = new Date(Date.now() - 854e5).toISOString().split('T')[0];
	
	dobInputs = document.querySelectorAll('.dob');
	
	for (let i = 0; i < dobInputs.length; ++i) {
		
		const dobInput = dobInputs[i];
		
		dobInput.setAttribute('max', yesterday);
		
	}
	
	const joiningYear = '2015';
	
	joiningDateInputs = document.querySelectorAll('.joining-date');
	
	for (let i = 0; i < joiningDateInputs.length; ++i) {
		
		const joiningDateInput = joiningDateInputs[i];
		
		joiningDateInput.setAttribute('min', `${joiningYear}-01-01`);
		joiningDateInput.setAttribute('max', `${joiningYear}-12-31`);
		
	}
	
	const template = document.querySelector('#student-template').content
	const entries = document.querySelector('#student-entries');
	
	let entry = template.cloneNode(true);
	let student = findStudent('0');
	student.html = entry.children[0];
	writeStudent(student);
	entries.appendChild(entry);
	
	entry = template.cloneNode(true);
	student = findStudent('1');
	student.html = entry.children[0];
	writeStudent(student);
	entries.appendChild(entry);
	
};

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

const readStudent = dialog => {
	
	return {
		id: dialog.querySelector('.id').value,
		firstName: dialog.querySelector('.first-name').value,
		lastName: dialog.querySelector('.last-name').value,
		dob: dialog.querySelector('.dob').value,
		gender: dialog.querySelector('.gender:checked')?.value,
		department: dialog.querySelector('.department').value,
		email: dialog.querySelector('.email').value,
		joiningDate: dialog.querySelector('.joining-date').value
	};
	
};

const findStudent = id => {
	
	return Array.from(students).find(student => student.id === id);
	
};

const writeStudent = (student) => {
	
	const container = student.html;
	
	container.querySelector('.student-id').textContent = student.id;
	container.querySelector('.student-first-name').textContent = student.firstName;
	container.querySelector('.student-last-name').textContent = student.lastName;
	container.querySelector('.student-dob').textContent = student.dob;
	container.querySelector('.student-gender').textContent = student.gender;
	container.querySelector('.student-department').textContent = student.department;
	container.querySelector('.student-email').textContent = student.email;
	container.querySelector('.student-joining-date').textContent = student.joiningDate;
	
};

const addStudent = () => {
	
	const student = readStudent(document.querySelector('#add-student-dialog'));
	
	if (!validateStudent(student))
		return;
	
	if (findStudent(student.id) !== undefined) {
		
		alert(`Student with id ${student.id} already exists`);
		return;
		
	}
	
	const entry = document.querySelector('#student-template').content.cloneNode(true);
	student.html = entry.children[0];
	writeStudent(student);
	document.querySelector('#student-entries').appendChild(entry);
	
	students.add(student);
	
	showAddStudent();
	
};

const showStudentUpdate = () => {
	
	const id = document.querySelector('#update-student-dialog .id').value;
	
	if (!validateID(id))
		return;
	
	const student = findStudent(id);
	
	if (student === undefined) {
		
		alert(`Student with id ${id} not found`)
		return;
		
	}
	
	const dialog = document.querySelector('#update-student-dialog-inner');
	dialog.querySelector('.first-name').value = student.firstName;
	dialog.querySelector('.last-name').value = student.lastName;
	dialog.querySelector('.dob').value = student.dob;
	dialog.querySelector(`#update-student-${student.gender.toLowerCase()}`).checked = true;
	dialog.querySelector('#update-student-other').checked = student.gender === 'Other';
	dialog.querySelector('.department').value = student.department;
	dialog.querySelector('.email').value = student.email;
	dialog.querySelector('.joining-date').value = student.joiningDate;
	
	document.querySelector('#update-student-dialog-inner').style.display = 'block';
	
};

const hideStudentUpdate = () => {
	
	document.querySelector('#update-student-dialog-inner').style.display = 'none';
	
};

const updateStudent = () => {
	
	const student = readStudent(document.querySelector('#update-student-dialog'));
	
	if (!validateStudent(student))
		return;
	
	const prevStudent = findStudent(student.id);
	
	if (prevStudent === undefined) {
		
		alert(`Student with id ${student.id} not found`)
		return;
		
	}
	
	student.html = prevStudent.html;
	students.delete(prevStudent);
	students.add(student);
	
	writeStudent(student);
	
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
	
	student.html.remove();
	students.delete(student);
	
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

const validateStudent = student => {
	
	const age = Math.floor((new Date() - new Date(student.dob).getTime()) / 3.15576e+10);
	
	if (age < 17 || age > 60) {
		
		alert('Invalid date of birth');
		return false;
		
	}
	
	if (student.gender === undefined) {
		
		alert('Please select a gender');
		return false;
		
	}
	
	return validateID(student.id)
		&& validateName(student.firstName)
		&& validateName(student.lastName)
		&& validateEmail(student.email);
	
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