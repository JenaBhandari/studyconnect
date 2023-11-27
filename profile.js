/**
 * 
 */
// Dummy User for testing TODO: delete after connection

const dummygroup1 = {
	studyGroupID: "0",
	course:"CSCI201",
	groupname:"ABAAA",
	location:"Zoom",
	time:"6pm",
	day:"Thursday",
}

const dummyUser = {
  firstName: "John",
  lastName: "Doe",
  phone: "1234567890",
  email: "jd@usc.edu",  
  studyGroups:[dummygroup1,dummygroup1,dummygroup1],
  hostingGroups:[dummygroup1,dummygroup1],
};
 
 function fetchUserProfile() {
    let baseURL = window.location.origin + "/studyconnect/";
    // TODO: need update with the correct backend endpoint 
    var url = new URL("user/profile", baseURL); 
    var params = {
        //userID: 123
    };
    url.search = new URLSearchParams(params).toString();

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
			displayUserProfile(data);
            // Handle the retrieved user profile data
            console.log(data); // Access data.id, data.name, data.email, etc.
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function displayUserProfile(data){
	const profile = document.getElementById("userprofile");
	profile.innerHTML = `
    <p>Name: ${data.firstName} ${data.lastName}</p>
    <p>Phone Number: ${data.phone}</p>
    <p>Email: ${data.email}</p> `;	
}
function displayinGroups(data){
	const inGroups = document.getElementById("inGroups");
	displayGroups(inGroups, data);	
}
function displayhostingGroups(data){
	const inGroups = document.getElementById("hostGroups");
	displayGroups(inGroups, data);	
}

function displayGroups(inGroups,data){
	// loop through all the study groups:
	const groups = data.hostingGroups;
	const container = document.createElement("div");
	inGroups.classList.add("container", "px-4");
	container.classList.add("row","gx-5");
	for(let i = 0; i < groups.length; i++){
	  const currgroup = groups[i];
		  
	  // Create group container
	  const group = document.createElement("div");
	  group.classList.add("rounded", "p-3", "bg-light", "border-5");
	  
	  // Create and append group title
	  const title = document.createElement("h3");
	  title.textContent = `Group for ${currgroup.course} - ${currgroup.groupname}`;
	  group.appendChild(title);
	  
	  // Create delete button
	  const deletebtn = document.createElement("input");
	  deletebtn.type = "button";
	  deletebtn.value = "---";
	  deletebtn.onclick = function(){deleteGroup(currgroup)};
	  /*// TODO: Add Minus Sign; the following does not work somehow
	  const minus = document.createElement("span");
	  minus.classList.add("bi", "bi-dash");
	  deletebtn.appendChild(minus);*/
	  deletebtn.classList.add("btn", "btn-small", "btn-primary", "float-right");
	  group.appendChild(deletebtn);
	
	  // Create and append meeting information
	  const info1 = document.createElement("p");
	  info1.textContent = `Meeting on ${currgroup.day} at ${currgroup.time}`;
	  group.appendChild(info1);
	
	  // Create and append location information
	  const info2 = document.createElement("p");
	  info2.textContent = `Location: ${currgroup.location}`;
	  group.appendChild(info2);
	  const container2 = document.createElement("div");
	  container2.classList.add("col");
	  container2.appendChild(group);
	
	  // Append group to the container
	  container.appendChild(container2);
	}
	inGroups.appendChild(container);
}
window.onload = function() {
	// TODO: Fetch User Data: fetchUserProfile()	
	displayUserProfile(dummyUser);
	displayinGroups(dummyUser);
	displayhostingGroups(dummyUser);
};

function deleteGroup(group){
	//TODO: requires JDBC function for delete
	console.log(group);
}