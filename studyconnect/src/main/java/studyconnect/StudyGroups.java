package studyconnect;

public class StudyGroups {
	private int studyGroupID;
	private String courseID;
	private int hostID;
	private String location;
	private String time;
	private String day;
	private String email;


	// Setters and getters
	public int getStudyGroupID() {
		return studyGroupID;
	}
	public void setStudyGroupID(int studyGroupID) {
		this.studyGroupID = studyGroupID;
	}
	
	public String getCourseID() {
		return courseID;
	}
	public void setCourseID(String courseID) {
		this.courseID = courseID;
	}

	public int getHostID() {
		return hostID;
	}
	public void setHostID(int hostID) {
		this.hostID = hostID;
	}
	
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	
	public String getDay() {
		return day;
	}
	public void setDay(String day) {
		this.day = day;
	}
	
	public void setEmail(String email) {
		this.email = email;	
	}
	
	public String getEmail() {
		return email;
	}

	// Default Constructor
	public StudyGroups() {
		
	}
	
	// Constructor
	public StudyGroups(String courseID, int hostID, String location, String time, String day) {
		this.courseID = courseID;
		this.hostID = hostID;
		this.location = location;
		this.time = time;
		this.day = day;
	}
	


}
