package studyconnect;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
		String courseID = request.getParameter("courseID");
		int hostID = Integer.valueOf(request.getParameter("hostID"));
		String day = request.getParameter("day");
		String time = request.getParameter("time");
		String location = request.getParameter("location");
		
		
		StudyGroups studyGroup = new StudyGroups(courseID, hostID, day, time, location);
		if (StudyConnectDB.addStudyGroup(studyGroup)) {
			System.out.println("Successfully added study group");
			//TO-DO: Communicate this to the client somehow
		} else {
			System.out.println("Couldn't add study group");
			//TO-DO: Communicate this to the client somehow
		}
		
		
		// TO-DO: Client interaction
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
