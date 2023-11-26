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
			} else {
				// TO-DO: Redirect to info.html
			}
		}).catch(function(error) {
			console.log('request failed', error)
		});
}