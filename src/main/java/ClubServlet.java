import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.Club;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import model.Club;
@WebServlet("/clubs")
    public class ClubServlet extends HttpServlet {

        protected void doGet(HttpServletRequest req, HttpServletResponse res)
                throws ServletException, IOException {

            String CLUB=req.getParameter("clubname");
            List<Club> clubs1 = null;
            try {
                clubs1 = new ClubDao().getAllClubs();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
            req.setAttribute("clubsList", clubs1);

            req.getRequestDispatcher("clubs.jsp").forward(req, res);
        }
    }


