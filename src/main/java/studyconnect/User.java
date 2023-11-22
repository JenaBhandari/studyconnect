package studyconnect;

import java.util.ArrayList;


public class User {
	private int userID;
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private String password;
	private ArrayList<StudyGroup> studyGroups;

	// Setters and getters
	public int getUserID() {
		return userID;
	}
	public void setUserID(int userID) {
		this.userID = userID;
	}
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}

	 public String getPassword() {
		return password;
	}
	 public void setPassword(String password) {
		this.password = password;
	}

	public ArrayList<StudyGroup> getStudyGroups(){
		return studyGroups;
	}
	 
	public void addStudyGroup(StudyGroup group) {
		// TO-DO
	}
	
	public void deleteStudyGroup(StudyGroup group) {
		// TO-DO
	}
	

	// Default Constructor
	public User() {
		
	}
	
	// Constructor
	public User(String firstName, String lastName, String email, String phone, String password) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phone = phone;
		this.password = password;
	}
	
	public boolean verifyLogIn(String email, String password) {
		return this.email.equals(email) && this.password.equals(password);
	}
}


