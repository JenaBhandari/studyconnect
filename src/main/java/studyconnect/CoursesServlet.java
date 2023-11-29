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

/**
 * Servlet implementation class CoursesServlet
 */
@WebServlet("/CoursesServlet")
public class CoursesServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CoursesServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// set up response data
		String responseJson = "";
		// Set response type to JSON
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		
		ArrayList<String> courses = StudyConnectDB.getCourses();
		System.out.println("kuricna");
		ArrayList<StudyGroups> studyGroups = StudyConnectDB.getStudyGroup(1);
		if (courses != null) {
			
			// Build JSON
			//System.out.println(courses);
			for(int i = 0;i<studyGroups.size();i++) {
				
				responseJson = new Gson().toJson(studyGroups.get(i));
				out.write(responseJson.toString());
				out.flush();
				System.out.println(responseJson.toString());
			
			}
			
				
			// Output message to user
			
			
			//out.close();
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
