import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.Event;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;


@WebServlet("/createEvent")
    public class EventServlet extends HttpServlet {

        protected void doGet(HttpServletRequest req, HttpServletResponse res)
                throws ServletException, IOException {

//            Event e = new Event();
            int id= Integer.parseInt(req.getParameter("clubId"));
//            e.setClubId(Integer.parseInt(req.getParameter("clubId")));
//            e.setEventName(req.getParameter("eventName"));
//            e.setDate(req.getParameter("date"));
//            e.setVenue(req.getParameter("venue"));
//            e.setDescription(req.getParameter("description"));

            try {
                List<Event> events = new EventDao().getAllEvents(id);
                req.setAttribute("events",events);
            } catch (SQLException ex) {
                throw new RuntimeException(ex);
            }

            req.getRequestDispatcher("clubEvents.jsp").forward(req,res);
        }
    }
