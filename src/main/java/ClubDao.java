
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import model.Club;
import model.DBConnection;

public class ClubDao {

        private Connection conn;

        public ClubDao() {
            try {
                conn = DBConnection.getConnection(); // get DB connection
            } catch (NullPointerException e) {
                System.out.println(e.getMessage());
            }
        }

        // Insert club
        public boolean addClub(Club club) throws SQLException {
            String sql = "INSERT INTO clubs(name, description) VALUES (?, ?)";
            PreparedStatement ps = conn.prepareStatement(sql);

            ps.setString(1, club.getName());

            return ps.executeUpdate() > 0;


        }

        // List clubs
        public List<Club> getAllClubs() throws SQLException {
            List<Club> list = new ArrayList<>();
            String sql = "SELECT * FROM clubs";


            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Club c = new Club();
                c.setId(rs.getInt(1));
                c.setName(rs.getString(2));
                c.setCoordinatorId(rs.getInt(3));
                list.add(c);
            }


            return list;
        }

        // Delete club
        public boolean deleteClub(int id) throws SQLException {
            String sql = "DELETE FROM club WHERE id=?";


            PreparedStatement ps = conn.prepareStatement(sql);

            ps.setInt(1, id);
            return ps.executeUpdate() > 0;


        }
    }

