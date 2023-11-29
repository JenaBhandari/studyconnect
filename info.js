
  document.addEventListener("DOMContentLoaded", function () {
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




