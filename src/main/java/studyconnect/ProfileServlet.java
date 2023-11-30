package studyconnect;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import studyconnect.StudyConnectDB;
import studyconnect.StudyGroups;


@WebServlet("/ProfileServlet")
public class ProfileServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ProfileServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String email = request.getParameter("email");
		String type = request.getParameter("type");
		
		
		// set up response data
		String responseJson = "";
		// Set response type to JSON
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		
		//ArrayList<String> groups = StudyConnectDB.getStudyGroups();
		User userprofile = StudyConnectDB.getUser(email);
		ArrayList<StudyGroups> hostGroups = StudyConnectDB.getHostedGroups(StudyConnectDB.getUserID(email));
		ArrayList<StudyGroups> inGroups = StudyConnectDB.getJoinedGroups(StudyConnectDB.getUserID(email));
		
		System.out.println("moze");
		if(type.equals("joined")) {
			responseJson = new Gson().toJson(inGroups,ArrayList.class);
		}
		else if(type.equals("host")) {
			responseJson = new Gson().toJson(hostGroups,ArrayList.class);
		}
			
		
		out.write(responseJson);
		System.out.println(responseJson);
		out.flush();
			
			

		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
