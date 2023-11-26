/**
 * 
 */

 function SignUpUser() {
	let baseURL = window.location.origin + "/studyconnect/";
	var url = new URL("SignupServlet", baseURL);
	var params = {
		email: document.getElementById("email").value,
		phone: document.getElementById("phone").value,
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
				window.location.href = baseURL + 'home.html'; // Redirects
			}
		}).catch(function(error) {
			console.log('request failed', error)
		});
}