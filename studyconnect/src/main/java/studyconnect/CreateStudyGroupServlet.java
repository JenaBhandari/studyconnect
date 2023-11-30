package studyconnect;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;

/**
 * Servlet implementation class CreateStudyGroupServlet
 */
@WebServlet("/CreateStudyGroupServlet")
public class CreateStudyGroupServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CreateStudyGroupServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Hello");
		
		String courseID = request.getParameter("courseID");
		String email = request.getParameter("email");
		String day = request.getParameter("day");
		String time = request.getParameter("time");
		String location = request.getParameter("location");
		
		User user = StudyConnectDB.getUser(email);
		
		JsonObject result = new JsonObject();
		
		PrintWriter out = response.getWriter();
		
		StudyGroups studyGroup = new StudyGroups(courseID, user.getUserID(), day, time, location);
		if (StudyConnectDB.addStudyGroup(studyGroup)) {
			System.out.println("Successfully added study group");
			//TO-DO: Communicate this to the client somehow
			StudyConnectDB.addUserToStudyGroup(StudyConnectDB.getLastStudyGroupID(), user.getUserID());		
			result.addProperty("success", "Successfully added study group");
		} else {
			System.out.println("Couldn't add study group");
			//TO-DO: Communicate this to the client somehow
			result.addProperty("errormsg", "Invalid study group");
		}
		
		System.out.println("CreateStudyGroupServlet response:" + result);
		// TO-DO: Client interaction
		out.print(result.toString());
		
		
		/*String courseID = request.getParameter("courseID");
		int hostID = Integer.valueOf(request.getParameter("hostID"));
		String day = request.getParameter("day");
		String time = request.getParameter("time");
		String location = request.getParameter("location");
		
		JsonObject result = new JsonObject();
		
		StudyGroups studyGroup = new StudyGroups(courseID, 2, day, time, location);
		if (StudyConnectDB.addStudyGroup(studyGroup)) {
			System.out.println("Successfully added study group");
			//TO-DO: Communicate this to the client somehow
		} else {
			System.out.println("Couldn't add study group");
			//TO-DO: Communicate this to the client somehow
		}
		System.out.println("CreateStudyGroupServlet response:" + result);
		
		PrintWriter out = response.getWriter();
		out.print(result.toString());
		*/
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
