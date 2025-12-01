import model.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class RegistrationDao{
    private Connection conn;

    public RegistrationDao() {
        try {
            conn = DBConnection.getConnection(); // get DB connection
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
        }
    }
    public void insertRegistration(String name , int eventId, int clubId, String clubName,
                                   String eventName, String venue, String date)
            throws SQLException {

        String sql = "INSERT INTO registrations(name,event_id, club_id, club_name, event_name, venue, date) VALUES (?,?, ?, ?, ?, ?, ?)";

        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setString(1,name);
        ps.setInt(2, eventId);
        ps.setInt(3, clubId);
        ps.setString(4, clubName);
        ps.setString(5, eventName);
        ps.setString(6, venue);
        ps.setString(7, date);

        ps.executeUpdate();
    }


}
