import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;


import jakarta.servlet.http.HttpSession;
import model.User;


@WebServlet("/registerEvent")
public class RegistrationServlet extends HttpServlet {

    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        System.out.println("session is ");
        HttpSession session = req.getSession(false);

        if (session == null) {
            System.out.println("SESSION IS NULL");
            res.sendRedirect("login.jsp");
            return;
        }

        User u = (User) session.getAttribute("user");

        if (u == null) {
            System.out.println("USER is null in session");
            res.sendRedirect("login.jsp");
            return;
        }

        int eventId = Integer.parseInt(req.getParameter("eventId"));
        int clubId = Integer.parseInt(req.getParameter("clubId"));
        String clubName = req.getParameter("clubName");
        String eventName = req.getParameter("eventName");
        String venue = req.getParameter("venue");
        String date = req.getParameter("date");

        try {
            RegistrationDao dao = new RegistrationDao();
            dao.insertRegistration(u.getName(),eventId, clubId, clubName, eventName, venue, date);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        req.getRequestDispatcher("success.jsp").forward(req,res);
    }
}
