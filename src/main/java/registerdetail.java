import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import model.User;
import java.io.IOException;
@WebServlet("/registerdetail")
public class registerdetail extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        String name = req.getParameter("name");
        String email = req.getParameter("email");
        String pass = req.getParameter("password");
        String role = req.getParameter("role");
        UserDAO userDAO = new UserDAO();

        User u = new User(name, email, pass, role);
        try {
            boolean success = userDAO.register(u);

            System.out.println("begore das");
            HttpSession session = null;
            if (success)
                // Inside servlet
            {
                session = req.getSession();
                session.setAttribute("user", u);
                System.out.println("inside the success");
                System.out.println(u);

               res.sendRedirect("index.jsp");
                System.out.println("after");
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
