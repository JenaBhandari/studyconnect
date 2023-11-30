/**
 * 
 */

  function LogInUser() {
	let baseURL = window.location.origin + "/studyconnect/";
	var url = new URL("LoginServlet", baseURL);
	var params = {
		email: document.getElementById("email").value,
		password: document.getElementById("password").value,
	}
	url.search = new URLSearchParams(params).toString();
	fetch(url)
		.then(data => data.text())
		.then((text) => {
			response = JSON.parse(text);
			if ('errormsg' in response) {
				document.getElementById("passwordError").innerHTML = response['errormsg'];
			}
			if ('success' in response) {
				console.log("working setting email");
				localStorage.setItem('email', document.getElementById("email").value);
				window.location.href = baseURL + 'profile.html'; // Redirects
			}
		}).catch(function(error) {
			console.log('request failed', error)
		});
}