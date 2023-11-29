
  document.addEventListener("DOMContentLoaded", function () {
    const classOptions = ["CSCI 102", "CSCI 103", "CSCI 104", "CSCI 356", "CSCI 201", "CSCI 270", "CSCI 170"];

    // Populate options for the class dropdown
    const classNameSelect = document.getElementById("className");
    classOptions.forEach(function (classOption) {
      const option = document.createElement("option");
      option.value = classOption;
      option.textContent = classOption;
      classNameSelect.appendChild(option);
    });

    // Function to create a new class box
    function createClassBox(className, section) {
      const classContainer = document.getElementById("class-container");

      // Create a new div for the class box
      const classBox = document.createElement("div");
      classBox.classList.add("class-box");

      // Display class name and section in the class box
      classBox.innerHTML = `<p><strong>Class Name:</strong> ${className}</p><p><strong>Section:</strong> ${section}</p>`;

      // Add a button to remove the class box
      const removeBtn = document.createElement("button");
      removeBtn.classList.add("btn", "btn-danger", "mt-2");
      removeBtn.textContent = "Remove Class";
      removeBtn.addEventListener("click", function () {
        // Remove the class box when the button is clicked
        classContainer.removeChild(classBox);
      });

      classBox.appendChild(removeBtn);

      // Append the class box to the container
      classContainer.appendChild(classBox);
    }

    // Event listener for the "Add Class" button
    document.getElementById("addClassBtn").addEventListener("click", function () {
      // Get values from input fields
      const className = document.getElementById("className").value;
      const section = document.getElementById("section").value;

      // Create a new class box with the entered values
      createClassBox(className, section);
    });
  });

  // Function to gather information and send it to the servlet
  function sendInfo() 
  {
      // Get values from input fields
      const studyPlace = document.getElementById("studyPlace").value;
      const studyTime = document.getElementById("studyTime").value;
      const phoneNumber = document.getElementById("phoneNumber").value;

      // Get the array of classes from the created class boxes
      const classBoxes = document.querySelectorAll(".class-box");
      const classes = [];
      classBoxes.forEach(function (classBox) {
        const className = classBox.querySelector("p strong:first-child").nextSibling.textContent.trim();
        const section = classBox.querySelector("p strong:nth-child(2)").nextSibling.textContent.trim();
        classes.push({ className, section });
      });

      // Create JSON object with user information and class array
      const userInfo = {
        studyPlace,
        studyTime,
        phoneNumber,
        classes,
      };

      // Convert the object to JSON
      const jsonData = JSON.stringify(userInfo);

      // Send the JSON data to the servlet (you may need to adjust the URL)
      fetch('UserCoursesServlet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data sent successfully', data);
        // Add any further handling as needed
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
    }

    // Attach the sendInfo function to the submit button click event
    document.getElementById("submit").addEventListener("click", sendInfo);


    //Example of the json sent to servlet

//   {
//   "studyPlace": "Zoom",
//   "studyTime": "Morning",
//   "phoneNumber": "1234567890",
//   "classes": [
//     {
//       "className": "CSCI 102",
//       "section": "001"
//     },
//     {
//       "className": "CSCI 201",
//       "section": "002"
//     }
//     // Add more class objects as needed
//   ]
// }




