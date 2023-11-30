package studyconnect;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class JoinStudyGroupServlet
 */
@WebServlet("/JoinStudyGroupServlet")
public class JoinStudyGroupServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public JoinStudyGroupServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int studyGroupID = Integer.valueOf(request.getParameter("studyGroupID"));
		
		String email =  request.getParameter("email");
		
		
		User user = StudyConnectDB.getUser(email);
		int userID = user.getUserID()
;			
		if (StudyConnectDB.addUserToStudyGroup(studyGroupID, userID)) {
			System.out.println("Successfully add user to study group");
			//TO-DO: Communicate this to the client somehow
		} else {
			System.out.println("Couldn't add user to study group");
			//TO-DO: Communicate this to the client somehow
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
