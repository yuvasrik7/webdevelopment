import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import model.User;

import java.io.IOException;

@WebServlet("/loginnew")
public class Loginnew extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        String email = req.getParameter("email");
        String pass = req.getParameter("password");

        UserDAO dao = new UserDAO();
        try {
            User user = dao.login(email, pass);

            if (user != null) {
                HttpSession session = req.getSession();
                session.setAttribute("user", user);
                req.getRequestDispatcher("dashboard.jsp").forward(req, res);
            } else {
                req.setAttribute("error", "Invalid Login");
                req.getRequestDispatcher("/webapp/index.jsp").forward(req, res);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
