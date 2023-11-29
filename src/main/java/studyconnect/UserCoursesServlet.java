package studyconnect;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class UserCoursesServlet
 */
@WebServlet("/UserCoursesServlet")
public class UserCoursesServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserCoursesServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TO-DO: Add user's courses to Course database table
	}


	//TO-DO THIS METHOD
	//userInfo:
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
// add classes for user in database
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
