package studyconnect;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class StudyConnectDB {
	
	private static final String DB_URL = "jdbc:mysql://box5429.bluehost.com/gxsufkmy_201_db";
	private static final String USER = "gxsufkmy_201_user";
	private static final String PASS = "Mk!3J32S0b08xg&@";


	// Returns all the courses from the Courses database table. If there's an error, return null
	public static ArrayList<String> getCourses() {
		String query = "SELECT courseID FROM Courses";
		Connection conn = createConnection();
		ResultSet rs = executeQuery(conn, query);
		ArrayList<String> courses = null;
		
		// If null, no ResultSet due to error
		if (rs == null) {
			return null;
		}
		
		try {
			courses = new ArrayList<>();
			while (rs.next()) {
				String courseID = rs.getString("courseID");
				courses.add(courseID);
			}
			
			if (rs != null) {
				rs.close();
			}
			if (conn != null) {
				conn.close();
			}
		} catch (Exception ex) {
			System.out.println ("Exception: " + ex.getMessage());
		}
		
		return courses;
	}
	
	
	// Retrieves user information from the Users table from the database and creates a User object if a user with that email exists, otherwise returns null
	public static User getUser(String email) {
		String query = "SELECT * FROM Users WHERE Users.email = \"" + email + "\"";
		Connection conn = createConnection();
		ResultSet rs = executeQuery(conn, query);
		
		// If null, no ResultSet due to error
		if (rs == null) {
			return null;
		}
		
		User user = null;
		
		try {
			if (rs.next()) {
				// User with that email is found
				user = new User();
				user.setUserID((rs.getInt("userID")));
				user.setEmail(rs.getString("email"));
				user.setPhone(rs.getString("phone"));
				user.setPassword(rs.getString("password"));
			}
			
			if (rs != null) {
				rs.close();
			}
			if (conn != null) {
				conn.close();
			}
		} catch (Exception ex) {
			System.out.println ("Exception: " + ex.getMessage());
		}
		
		return user;
	}
	
	
	// Retrieves study group information from the StudyGroups table from the database and creates a User object if a user with that email exists, otherwise returns null
	public static ArrayList<StudyGroups> getStudyGroup(int studyGroupID) {
		String query = "SELECT * FROM StudyGroups";
		Connection conn = createConnection();
		ResultSet rs = executeQuery(conn, query);
		
		// If null, no ResultSet due to error
		if (rs == null) {
			return null;
		}
		ArrayList<StudyGroups> studyGroups = new ArrayList<StudyGroups>();
		StudyGroups studyGroup = null;
		
		try {
			while (rs.next()) {
				// Study group with that studyGroupID is found
				studyGroup = new StudyGroups();
				studyGroup.setCourseID(rs.getString("courseID"));
				studyGroup.setHostID((rs.getInt("hostID")));
				studyGroup.setLocation(rs.getString("location"));
				studyGroup.setTime(rs.getString("time"));
				studyGroup.setDay(rs.getString("day"));
				studyGroups.add(studyGroup);
			}
			
			if (rs != null) {
				rs.close();
			}
			if (conn != null) {
				conn.close();
			}
		} catch (Exception ex) {
			System.out.println ("Exception: " + ex.getMessage());
		}
		
		return studyGroups;
	}
	
	// Adds a user to a study group in the StudyGroup database table
	public static boolean addUserToStudyGroup(int studyGroupID, int userID) {
		String query = "INSERT INTO StudyGroup (studyGroupID, userID) VALUES (\"" + studyGroupID + "\", \"" + userID + "\")";
		System.out.println("executing query: " + query);
		Connection conn = createConnection();
		boolean res = executeUpdate(conn, query); // Returns true if successfully added, false otherwise

		try {
	 	 conn.close();
   	    } catch (Exception ex) {
   	    	
		}
		
		return res;
	}
	
	// Adds a course that a user is taking to the Course database table
	public static boolean addUsersCourses(int courseID, int userID) {
		String query = "INSERT INTO Course (courseID, userID) VALUES (\"" + courseID + "\", \"" + userID + "\")";
		System.out.println("executing query: " + query);
		Connection conn = createConnection();
		boolean res = executeUpdate(conn, query); // Returns true if successfully added, false otherwise
		
		try {
	 	 conn.close();
   	    } catch (Exception ex) {
   	    	
		}
		return res;
	}
	
	// Inserts a given user into the Users table in the database and returns true if successful, otherwise false
	public static boolean addUser(User user) {
		String query = "INSERT INTO Users (firstName, lastName, email, phone, password) VALUES (\"" + user.getFirstName() + "\", \""
				+ user.getLastName() + "\", \"" + user.getEmail() + "\", \"" + user.getPhone() + "\", \"" + user.getPassword() + "\")";
		System.out.println("executing query: " + query);
		Connection conn = createConnection();
		boolean res = executeUpdate(conn, query); // Returns true if successfully added, false otherwise
		try {
	 	 conn.close();
   	    } catch (Exception ex) {
   	    	
		}
		return res;
	}
	
	
	// Inserts a given study group into the StudyGroups table in the database and returns true if successful, otherwise false
	public static boolean addStudyGroup(StudyGroups studyGroup) {
		String query = "INSERT INTO StudyGroups (courseID, hostID, location, time, day) VALUES (\"" + studyGroup.getCourseID() + "\", \""
				+ studyGroup.getHostID() + "\", \"" + studyGroup.getLocation() + "\", \"" + studyGroup.getTime() + "\", \"" + studyGroup.getDay() + "\")";
		System.out.println("executing query: " + query);
		Connection conn = createConnection();
		boolean res = executeUpdate(conn, query); // Returns true if successfully added, false otherwise
		try {
	 	 conn.close();
   	    } catch (Exception ex) {
   	    	
		}
		return res;
	}
	
	
	// Executes an sql query. If successful, it returns the ResultSet otherwise it returns null.
	public static ResultSet executeQuery(Connection conn, String sqlQuery) {
		if (conn == null) return null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			ps = conn.prepareStatement(sqlQuery);
			rs = ps.executeQuery();
			return rs;
		} catch (SQLException sqle) {
			System.out.println ("SQLException: " + sqle.getMessage());
		} finally {
			/*try {
				if (st != null) {
					st.close();
				}
				if (ps != null) {
					ps.close();
				}
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException sqle) {
				System.out.println("sqle: " + sqle.getMessage());
			}*/
		}
		return null;
	}
	
	public static Connection createConnection() {
		Connection conn = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(DB_URL, USER, PASS);
			//conn = DriverManager.getConnection("jdbc:mysql://box5429.bluehost.com/gxsufkmy_201_db?user=gxsufkmy_201_user&password=Mk!3J32S0b08xg&@");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		
		return conn;
	}
	
	public static boolean executeUpdate(Connection conn, String sqlQuery) {
		if (conn == null) return false;
		PreparedStatement ps = null;
		try {
			ps = conn.prepareStatement(sqlQuery);
			ps.executeUpdate();
			return true;
		} catch (SQLException sqle) {
			System.out.println ("SQLException: " + sqle.getMessage());
		} finally {
			/*try {
				if (st != null) {
					st.close();
				}
				if (ps != null) {
					ps.close();
				}
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException sqle) {
				System.out.println("sqle: " + sqle.getMessage());
			}*/
		}
		return false;
	}
}
