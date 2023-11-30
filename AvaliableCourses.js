/**
 * 
 */
$(document).ready(loadReservations());
 function loadReservations(){
	 
	 $.ajax({
		 
		 type: "GET",
		 url: "CoursesServlet",
		 dataType: "json",
		 success: function(response){
			let tableBody = document.getElementById("studyGroupTableBody");
			var buttons = [];
			 for(let i = 0;i<response.length;i++){
				var group = response[i];
    
                // Create a new row
                var newRow = document.createElement("tr");
    
                // Add cells with data
                var courseCell = document.createElement("td");
                courseCell.textContent = group.courseID;
                courseCell.id = group.studyGroupID;
                newRow.appendChild(courseCell);
    
                var locationCell = document.createElement("td");
                locationCell.textContent = group.location;
                newRow.appendChild(locationCell);
    
                var dayCell = document.createElement("td");
                dayCell.textContent = group.day;
                newRow.appendChild(dayCell);
    
                var timeCell = document.createElement("td");
                timeCell.textContent = group.time;
                newRow.appendChild(timeCell);
    
                var joinCell = document.createElement("td");
                var joinButton = document.createElement("input");
                
                joinButton.type = "button";
                
                joinButton.classList.add("joinButton");
              	buttons.push(joinButton);
                joinButton.addEventListener('click',()=>joinStudyGroup(buttons[i]));
                
                joinButton.className = "btn btn-primary";
                joinButton.value = "Join!";
                
                
                joinCell.appendChild(joinButton);
             newRow.appendChild(joinCell);
    
                // Append the new row to the table body
             tableBody.appendChild(newRow);
             
			 }
			 
			 
			 
		 },
		 error: function(e){
    	console.log(e.responseText);
}
		 
		
		 
	 });
	 return false;
 }
 document.addEventListener('DOMContentLoaded', function () {
    // Find all elements with the class "joinButton" and attach a click event handler
    document.querySelectorAll('.joinButton').forEach(function(button) {
        // Pass the current button to joinStudyGroup
        const clickHandler = joinStudyGroup(button);

        // Attach the click event handler
        button.addEventListener('click', clickHandler);
    });
});
 

 const classOptions = [
   "CSCI 103",
   "CSCI 104",
   "CSCI 109",
   "CSCI 110",
   "CSCI 170",
   "CSCI 201",
   "CSCI 270",
   "CSCI 280",
   "CSCI 281",
   "CSCI 310",
   "CSCI 350",
   "CSCI 353",
   "CSCI 360",
   "CSCI 368",
   "CSCI 380",
   "CSCI 401",
   "CSCI 402",
   "CSCI 404",
   "CSCI 420",
   "CSCI 423",
   "CSCI 424",
   "CSCI 430",
   "CSCI 435",
   "CSCI 439",
   "CSCI 445L",
   "CSCI 450",
   "CSCI 452",
   "CSCI 455",
   "CSCI 457",
   "CSCI 485",
   "CSCI 487",
   "CSCI 490",
   "CSCI 491",
   "CSCI 495",
   "CSCI 499",
   "CSCI 501",
   "CSCI 502",
   "CSCI 505",
   "CSCI 520",
   "CSCI 524",
   "CSCI 526",
   "CSCI 529",
   "CSCI 531",
   "CSCI 533",
   "CSCI 536",
   "CSCI 544",
   "CSCI 545",
   "CSCI 552",
   "CSCI 554",
   "CSCI 555",
   "CSCI 557",
   "CSCI 559",
   "CSCI 561",
   "CSCI 565",
   "CSCI 568",
   "CSCI 570",
   "CSCI 571",
   "CSCI 572",
   "CSCI 576",
   "CSCI 577",
   "CSCI 578"
];


    // Function to toggle the visibility of the create study group form
    function toggleCreateForm() {
        var createForm = document.getElementById("create-form");
        createForm.style.display = (createForm.style.display === 'none' || createForm.style.display === '') ? 'block' : 'none';

    // Get the select element
    var courseDropdown = document.getElementById("course-dropdown");

    // Clear existing options
    courseDropdown.innerHTML = '';

    // Add new options based on classOptions array
    for (var i = 0; i < classOptions.length; i++) {
        var option = document.createElement("option");
        option.value = classOptions[i];
        option.text = classOptions[i];
        courseDropdown.appendChild(option);
    }
     }


    // Function to handle the creation of a study group
    function createStudyGroup() {
        var course = document.getElementById("course-dropdown").value;
        var location = document.getElementById("location").value;
        var day = document.getElementById("day").value;
        var time = document.getElementById("time").value;

        // You can use these values to send an AJAX request to your CreateStudyGroupServlet
        console.log("Creating study group with the following details:");
        console.log("Course: " + course);
        console.log("Location: " + location);
        console.log("Day: " + day);
        console.log("Time: " + time);

        // TO-DO: Add AJAX request to CreateStudyGroupServlet
        // ...
    }
  function joinStudyGroup(event){
	  
	  let StudyGroupID = event.parentElement.parentElement.childNodes[0].id;
	  let email = localStorage.getItem("email");
	  
	   $.ajax({
		 
		 type: "GET",
		 url: "JoinStudyGroupServlet",
		 dataType: "json",
		 data:{
			 studyGroupID: StudyGroupID,
			 email: email 
		 },
		 success: function(response){
	 		event.parentElement.parentElement.style.visibility = "none"
		 },
		 error: function(e){
    	console.log(e.responseText);
}
		 
		
		 
	 });
	 return false;
 }
	  
 
    
    
