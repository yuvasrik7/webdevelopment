
import model.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


    public class CertificationDao {

        private Connection conn;

        public void CertificateDao() {
            try {
                conn = DBConnection.getConnection(); // get DB connection
            } catch (NullPointerException e) {
                System.out.println(e.getMessage());
            }
        }

        // Add certificate
        public boolean addCertificate(Certificate c) throws SQLException {
            String sql = "INSERT INTO certificate(student_name, course_name, issue_date, club_id) VALUES (?, ?, ?, ?)";


                 PreparedStatement ps = conn.prepareStatement(sql);

                ps.setString(1, c.getStudentName());
                ps.setString(2, c.getCourseName());
                ps.setString(3, c.getIssueDate());
                ps.setInt(4, c.getClubId());

                return ps.executeUpdate() > 0;



        }

        // List all certificates
        public List<Certificate> getAllCertificates() throws SQLException {
            List<Certificate> list = new ArrayList<>();
            String sql = "SELECT * FROM certificate";


                 PreparedStatement ps = conn.prepareStatement(sql);
                 ResultSet rs = ps.executeQuery();

                while (rs.next()) {
                    Certificate c = new Certificate();
                    c.setId(rs.getInt("id"));
                    c.setStudentName(rs.getString("student_name"));
                    c.setCourseName(rs.getString("course_name"));
                    c.setIssueDate(rs.getString("issue_date"));
                    c.setClubId(rs.getInt("club_id"));
                    list.add(c);
                }



            return list;
        }
        public boolean save(int studentId, int eventId, String fileName) throws SQLException {
            String sql = "INSERT INTO certificates(student_id, event_id, file_name) VALUES (?, ?, ?)";


                 PreparedStatement ps = conn.prepareStatement(sql);

                ps.setInt(1, studentId);
                ps.setInt(2, eventId);
                ps.setString(3, fileName);

                return ps.executeUpdate() > 0;




        }

        // Delete certificate
        public boolean deleteCertificate(int id) throws SQLException {
            String sql = "DELETE FROM certificate WHERE id=?";
       PreparedStatement ps = conn.prepareStatement(sql);

                ps.setInt(1, id);
                return ps.executeUpdate() > 0;




        }
    }


