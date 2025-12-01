import java.sql.*;

import model.DBConnection;
import model.User;
public class UserDAO  {

    private Connection conn;

    public UserDAO() {
        try {
            conn = DBConnection.getConnection(); // get DB connection
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
        }
    }




    public boolean register(User u) throws Exception {

            String query = "INSERT INTO users(name,email,password,role) VALUES (?,?,?,?)";
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1, u.getName());
            ps.setString(2, u.getEmail());
            ps.setString(3, u.getPassword());
            ps.setString(4, u.getRole());
            return ps.executeUpdate() > 0;
        }

        public User login(String email, String pass) throws SQLException {

            String q = "SELECT * FROM users WHERE email=? AND password=?";
            PreparedStatement ps = conn.prepareStatement(q);
            ps.setString(1, email);
            ps.setString(2, pass);

            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                User u = new User();
                u.setemail(rs.getString("email"));
                u.setPassword(rs.getString("password"));
                u.setNameu(rs.getString("name"));
                u.setRoleu(rs.getString("role"));
                return u;
            }
            return null;
        }
    }


