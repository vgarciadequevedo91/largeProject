var baseURL = "http://localhost:3306/API"
//var baseURL = "http://newlook.gearhostpreview.com/originalDevSetup/API";
var userID = 0;

function addProfessor() {
	var name = document.getElementById("form-name").value;
	var email = document.getElementById("form-email").value;

	var password = document.getElementById("form-password").value;
	var passwordConfirm = document.getElementById("form-password-confirm").value;
	if (password !== passwordConfirm) {
		document.getElementsByName("response")[0].innerHTML = "Your passwords must match";
		return;
	}

	// replace with appropriate varaible names
	var payload = '{"name" : "' + name + '", "email" : "' + email + '", "password" : "' + password + '"}';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", baseURL + "/AddProf.php", false);
	xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");

	try {
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				var data = JSON.parse(xhr.responseText);
				var error = data.error;

				window.location.href = "Login.html";
			}
		}

		xhr.send(payload);
	}
	catch(error) {
	}
	return false;
}
