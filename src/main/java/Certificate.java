public class Certificate {
    private int clubId;
    private String studentName;
    private String courseName;
    private String issueDate;
    private int stuId;

    String getStudentName()
    {
        return studentName;
    }
    String getCourseName()
    {
        return courseName;
    }
    String getIssueDate()
    {
        return issueDate;
    }
    int getClubId()
    {
        return clubId;
    }

    public void setStudentName(String studentName) {
        this.studentName=studentName;
    }

    public void setId(int id) {
        this.stuId=id;
    }

    public void setCourseName(String courseName) {
        this.courseName=courseName;
    }

    public void setIssueDate(String issueDate) {
        this.issueDate=issueDate;
    }

    public void setClubId(int clubId) {
        this.clubId=clubId;
    }
}
