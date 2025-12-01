import model.DBConnection;
import model.Event;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class EventDao {

    private Connection conn;

    public EventDao() {
        try {
            conn = DBConnection.getConnection(); // get DB connection
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
        }
    }

    public boolean createEvent(Event event) {
        String sql = "INSERT INTO events (clubId, eventName, date, venue, description) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, event.getClubId());
            ps.setString(2, event.getEventName());
            ps.setDate(3, java.sql.Date.valueOf(event.getDate())); // LocalDate to SQL Date
            ps.setString(4, event.getVenue());
            ps.setString(5, event.getDescription());
            int rows = ps.executeUpdate();
            return rows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    public List<Event> getAllEvents(int id) throws SQLException {
        List<Event> events = new ArrayList<>();
        String sql = "SELECT * FROM events where clubid=?";
       PreparedStatement ps = conn.prepareStatement(sql);

       ps.setInt(1,id);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Event event = new Event();
                event.setEventId(rs.getInt("eventid"));
                event.setClubId(rs.getInt("clubid"));
                event.setEventName(rs.getString("eventname"));
                event.setDate(String.valueOf(rs.getDate("dateofevent").toLocalDate()));
                event.setVenue(rs.getString("venue"));
                event.setDescription(rs.getString("description"));
                events.add(event);
            }

        return events;

    }
    public boolean deleteEvent(int eventId) {
        String sql = "DELETE FROM events WHERE eventId = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, eventId);
            int rows = ps.executeUpdate();
            return rows > 0;
        } catch(SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    public Event getEventById(int eventId) {
        String sql = "SELECT * FROM events WHERE eventId = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, eventId);
            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                Event event = new Event();
                event.setEventId(rs.getInt("eventId"));
                event.setClubId(rs.getInt("clubId"));
                event.setEventName(rs.getString("eventName"));
                event.setDate(String.valueOf(rs.getDate("date").toLocalDate()));
                event.setVenue(rs.getString("venue"));
                event.setDescription(rs.getString("description"));
                return event;
            }
        } catch(SQLException e) {
            e.printStackTrace();
        }
        return null;
    }


}
