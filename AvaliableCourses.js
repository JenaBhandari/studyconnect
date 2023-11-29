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
			 for(let i = 0;i<response.length;i++){
				var group = studyGroupData[i];
    
                // Create a new row
                var newRow = document.createElement("tr");
    
                // Add cells with data
                var courseCell = document.createElement("td");
                courseCell.textContent = group.course;
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
                joinButton.className = "btn btn-primary";
                joinButton.value = "Join!";
			 }
			 joinCell.appendChild(joinButton);
             newRow.appendChild(joinCell);
    
                // Append the new row to the table body
             tableBody.appendChild(newRow);
			 
			 
		 },
		 error: function(message){
			 console.log(message.responseText);
			 
			 
		 }
		 
		
		 
	 });
	 return false;
 }
 