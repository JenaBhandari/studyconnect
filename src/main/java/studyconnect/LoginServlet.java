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
import com.google.gson.JsonObject;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String email = request.getParameter("email");
		String password = request.getParameter("password");

		JsonObject result = new JsonObject();

		System.out.println("LoginServlet respone:" + result);

		
		User user = StudyConnectDB.getUser(email);
		if (user == null) {
			result.addProperty("errormsg", "Username does not exist");
		} else if (!password.equals(user.getPassword())) {
			result.addProperty("errormsg", "Invalid password");
		} else {
			System.out.println("Successful login");
		}
		
		System.out.println("LoginServlet respone:" + result);
		PrintWriter out = response.getWriter();
		out.print(result.toString());
		//System.out.println("   email: " + email + "   password: " + password);
		
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
