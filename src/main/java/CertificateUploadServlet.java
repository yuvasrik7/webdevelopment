import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.WebServlet;

import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/uploadCertificate")
@MultipartConfig
public class CertificateUploadServlet extends HttpServlet {

    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        Part file = req.getPart("certificate");
        String fileName = file.getSubmittedFileName();

        String path = getServletContext().getRealPath("") + "certificates/" + fileName;
        file.write(path);

        int studentId = Integer.parseInt(req.getParameter("studentId"));
        int eventId = Integer.parseInt(req.getParameter("eventId"));

        try {
            new CertificationDao().save(studentId, eventId, fileName);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


    }
}
