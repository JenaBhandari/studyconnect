/**
 * 
 */


function validateAndSignUp() {
	console.log("in valandsign");
		// Your validation logic here
		if (validateForm()) {
			SignUpUser();
			return true; // Allow the form to be submitted
		} else {
			return false; // Prevent form submission if validation fails
		}
	}


	function validateForm() {
		// Validation logic for the form fields
		var firstNameInput = document.getElementById('firstName');
		var lastNameInput = document.getElementById('lastName');
		var emailInput = document.getElementById('email');
		var phoneInput = document.getElementById('phone');
		var passwordInput = document.getElementById('password');

		var firstNameError = document.getElementById('firstNameError');
		var lastNameError = document.getElementById('lastNameError');
		var emailError = document.getElementById('emailError');
		var phoneError = document.getElementById('phoneError');
		var passwordError = document.getElementById('passwordError');

		// Clear previous error messages
		firstNameError.textContent = '';
		lastNameError.textContent = '';
		emailError.textContent = '';
		phoneError.textContent = '';
		passwordError.textContent = '';

		// Check each field
		if (firstNameInput.value.trim() === '') {
			firstNameError.textContent = 'Please enter your first name';
			return false;
		}

		if (lastNameInput.value.trim() === '') {
			lastNameError.textContent = 'Please enter your last name';
			return false;
		}

		if (emailInput.value.trim() === '') {
			emailError.textContent = 'Please enter your email';
			return false;
		} else if (!emailInput.value.endsWith('usc.edu')) {
			emailError.textContent = 'Enter in the format youremail@usc.edu';
			return false;
		}

		// Additional validation for phone format (###-###-####)
		var phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
		if (!phoneRegex.test(phoneInput.value.trim())) {
			phoneError.textContent = 'Enter in the format ###-###-####';
			return false;
		}

		if (passwordInput.value.trim() === '') {
			passwordError.textContent = 'Please enter your password';
			return false;
		} else if (!/\d/.test(passwordInput.value.trim())) {
			passwordError.textContent = 'Please include a number in your password';
			return false;
		}

		// add to database in server side code

		// Proceed to info.html
		return true;
	}



 function SignUpUser() {
	let baseURL = window.location.origin + "/studyconnect/";
	var url = new URL("SignupServlet", baseURL);
	var params = {
		firstName: document.getElementById("firstName").value,
		lastName: document.getElementById("lastName").value,
		email: document.getElementById("email").value,
		phone: document.getElementById("phone").value,
		password: document.getElementById("password").value,
	}
	url.search = new URLSearchParams(params).toString();
	fetch(url)
		.then(data => data.text())
		.then((text) => {
			response = JSON.parse(text);
			if ('errormsg' in response) {
				document.getElementById("passwordError").innerHTML = response['errormsg'];
			} else {
				// TO-DO: add success message
				window.location.href = baseURL + 'info.html'; // Redirects
			}
		}).catch(function(error) {
			console.log('request failed', error)
		});
}
