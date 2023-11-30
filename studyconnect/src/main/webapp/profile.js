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
  studyGroups:[dummygroup1,dummygroup1,dummygroup1,dummygroup1,dummygroup1,dummygroup1],
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

function displayUserProfile(email){
	
    
    
    $.ajax({
		 
		 type: "GET",
		 url: "ProfileServlet",
		 dataType: "json",
		 data:{
			 email: email,
			 type: "user"
		 },
		 success: function(response){
			 const profile = document.getElementById("userprofile");
			profile.innerHTML = `
    		<p>Name: ${response.firstName} ${response.lastName}</p>
    		<p>Phone Number: ${response.phone}</p>
    		<p>Email: ${response.email}</p> `;	
		},
		error:function(e){
			console.log(e);
		}
		});
}
function displayinGroups(email,type){
	const inGroups = document.getElementById("inGroups");

	displayGroups(inGroups,email,type);	
}
function displayhostingGroups(email,type){
	const inGroups = document.getElementById("hostGroups");
	
	displayGroups(inGroups,email,type);	
}

function displayGroups(inGroups,email,type){
	
	console.log("in display groups");
	// loop through all the study groups:
	
	$.ajax({
		 
		 type: "GET",
		 url: "ProfileServlet",
		 dataType: "json",
		 data:{
			 email: email,
			 type: type
		 },
		 success: function(response){
			 console.log(response);
	 		inGroups.innerHTML = '';
	const container = document.createElement("div");
	inGroups.classList.add("container", "px-4");
	container.classList.add("row");
	let groups =  response;
	for(let i = 0; i < groups.length; i++){
	  const currgroup = groups[i];
		  
	  // Create group container
	  const group = document.createElement("div");
	  group.onclick = function(){showGroupOverlay(currgroup)};
	  group.classList.add("rounded", "p-3", "bg-light", "border-5");
	  
	  // Create and append group title
	  const title = document.createElement("h3");
	  title.textContent = `Group for ${currgroup.courseID} - ${currgroup.studyGroupID}`;
	  group.appendChild(title);
	  
	  // Create delete button
	  const deletebtn = document.createElement("img");
	  deletebtn.src = "img/delete_button.png";
	  deletebtn.onclick = function(){deleteGroup(currgroup)};

	  deletebtn.classList.add("img-fluid", "float-right");
	  deletebtn.style="max-height: 30px;"

	  group.appendChild(deletebtn);
	
	  // Create and append meeting information
	  const info1 = document.createElement("p");
	  info1.textContent = `Meeting on ${currgroup.day} at ${currgroup.time}`;
	  info1.classList.add("text-start"); 
	  group.appendChild(info1);
	
	  // Create and append location information
	  const info2 = document.createElement("p");
	  info2.textContent = `Location: ${currgroup.location}`;
	  group.appendChild(info2);
	  const container2 = document.createElement("div");
	  container2.classList.add("col-md-4","mb-3");
	  container2.appendChild(group);
	
	  // Append group to the container
	  container.appendChild(container2);
	}
	inGroups.appendChild(container);
		 },
		 error: function(e){
    	console.log(JSON.stringify(e));
}
		 
		
		 
	 });
	
}
window.onload = function() 
{
	// TODO: Fetch User Data: fetchUserProfile()	
	displayUserProfile(localStorage.getItem("email"));
	displayinGroups(localStorage.getItem("email"));
	displayhostingGroups(localStorage.getItem("email"),"host"); 
	console.log("load");
};

function deleteGroup(group){
	console.log("in delete");
	//TODO: requires JDBC function for delete
	console.log(group);
	//Refresh
	// TODO: Fetch User Data: fetchUserProfile()	
	displayUserProfile(dummyUser);
	displayinGroups(dummyUser);
	displayhostingGroups(dummyUser);
}

function showGroupOverlay(group) 
{
    console.log("in show group overlay");
    const overlay = document.getElementById('group-overlay');
    const content = document.getElementById('overlay-content');
	overlay.style.display = ('flex');
    content.innerHTML = `
        <h2>${group.studyGroupID}</h2>
        <p><strong>Course:</strong> ${group.courseID}</p>
        <p><strong>Location:</strong> ${group.location}</p>
        <p><strong>Time:</strong> ${group.time}</p>
        <p><strong>Day:</strong> ${group.day}</p>
        
        <h3>Contacts:</h3>
        <ul>
    `;
    for(let i = 0;i<group.joinedUsers.length;i++){
		
      content.innerHTML += `<li>${group.joinedUsers[i].firstName} - ${group.joinedUsers[i].phone} - ${group.joinedUsers[i].email}</li>`;
        
	}
	content.innerHTML += '</ul>'
    overlay.style.display = 'flex'; 
}
function closeGroupOverlay() {
    const overlay = document.getElementById('group-overlay');
    overlay.style.display = 'none';
}
